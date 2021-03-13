import fs from "fs";
import { join, dirname, parse } from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { rewriteAssetUrl, externalize } from "@lib/util";
import config from "@data/config.yml";

const DATE_PATTERN = /^(\d{4}-\d{2}-\d{2})/;

export function contentPath(...path) {
    return join(process.cwd(), "content", ...path);
}

export function mdPath(...path) {
    const cp = contentPath(...path);
    if (fs.existsSync(cp + ".md")) {
        return cp + ".md";
    } else {
        return join(cp, "index.md");
    }
}

export function getContent(slug, path, fields = []) {
    const fileContents = fs.readFileSync(path, "utf8");
    const { data, content, excerpt } = matter(fileContents, {
        excerpt: true,
        excerpt_separator: "<!-- more -->",
    });

    const post = {
        slug: slug,
    };

    fields.forEach((field) => {
        if (field === "content") {
            post[field] = content;
        } else if (field === "excerpt") {
            post[field] = data[field] || excerpt || "";
        } else if (field === "assets") {
            if (path.endsWith("index.md")) {
                post[field] = fs
                    .readdirSync(dirname(path))
                    .filter((fn) => fn !== "index.md")
                    .map((fn) => ({
                        slug: slug,
                        asset: fn,
                        path: join(dirname(path), fn),
                    }));
            } else {
                post[field] = [];
            }
        } else if (data[field]) {
            post[field] = data[field];
        }
    });

    return post;
}

export function getAssetData(slug, asset) {
    return {
        slug: slug,
        filename: asset,
        path: join(contentPath(content), slug, asset),
    };
}

export function getPostSlugs() {
    const path = contentPath("posts");
    return fs
        .readdirSync(path)
        .filter((fn) => {
            return (
                fn.endsWith(".md") ||
                fs.existsSync(path + "/" + fn + "/index.md")
            );
        })
        .map((fn) => fn.replace(/\.md$/, ""));
}

export function getPost(slug, fields = []) {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = mdPath("posts", realSlug);
    const post = getContent(slug, fullPath, fields);

    if (fields.includes("published") && !post.published) {
        const match = realSlug.match(DATE_PATTERN);
        if (match) {
            post["published"] = `${match[1]}T00:00:00Z`;
        }
    }

    if (fields.includes("readingtime")) {
        post["readingtime"] = readingTime(post["content"] || "");
    }

    return post;
}

export function getPosts(fields = [], start = 0, count = 0) {
    const slugs = getPostSlugs();
    const result = slugs
        .map((slug) => getPost(slug, fields))
        .sort((post1, post2) => (post1.published < post2.published ? 1 : -1));
    if (count > 0) {
        return result.slice(start, start + count);
    } else {
        return result;
    }
}

export function getPreviousAndNext(slug, fields = []) {
    const posts = getPosts(fields);
    const index = posts.findIndex((post) => post.slug === slug);
    if (index >= 0) {
        return {
            next: index > 0 ? posts[index - 1] : null,
            previous: index < posts.length - 1 ? posts[index + 1] : null,
        };
    }
}

export function copyAssets(assets, target) {
    assets.forEach((asset) => {
        if (!fs.existsSync(target)) {
            fs.mkdirSync(target, { recursive: true });
        }
        const t = join(target, asset.asset);
        console.log("cp", asset.path, t);
        fs.copyFileSync(asset.path, t);
    });
}

export function rewritePost(post, pathname) {
    if (post.image) {
        post.image.url = rewriteAssetUrl(post.image.url, pathname);
        post.image.external = externalize(post.image.url);
    }

    if (post.ogimage) {
        post.ogimage.url = rewriteAssetUrl(post.ogimage.url, pathname);
        post.ogimage.external = externalize(post.ogimage.url);
    } else if (post.image) {
        if (post.image.url.startsWith("/")) {
            const parts = post.image.url.split("/");
            const path = join(config.assets, ...parts.slice(3));
            const parsed = parse(path);
            const ogname = `${parsed.name}.og${parsed.ext}`;
            if (fs.existsSync(join(dirname(path), ogname))) {
                post.ogimage = {
                    url:
                        parts.slice(0, parts.length - 1).join("/") +
                        "/" +
                        ogname,
                    alt: post.image.alt || "",
                };
                post.ogimage.external = externalize(post.ogimage.url);
            }
        }
    }
}
