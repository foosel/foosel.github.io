import { join, parse } from "path";
import {
    getPosts,
    getContent,
    mdPath,
    rewritePost,
    copyAssets,
} from "@lib/content";
import generateFeed from "@lib/feed";
import config from "@data/config.yml";
import sharp from "sharp";
import { externalize, rewriteAssetUrl } from "./util";

async function createOgImage(post, pathname, path) {
    if (post.ogimage) return;
    if (!post.image) return;
    if (!post.image.url.startsWith("/assets/content/")) return;

    const parts = post.image.url.split("/");
    const fn = parts[parts.length - 1];
    const p = parse(fn);
    const imagePath = join(path, fn);

    const ogfn = `${p.name}.og${p.ext}`;
    const ogimagePath = join(path, ogfn);

    let image = sharp(imagePath);
    const metadata = await image.metadata();

    const { width, height } = metadata;
    let targetWidth, targetHeight;
    if (width > 1.9 * height) {
        targetWidth = Math.round(1.9 * height);
        targetHeight = height;
    } else if (width < 1.9 * height) {
        targetWidth = width;
        targetHeight = Math.round(width / 1.9);
    } else if (width <= 1200) {
        // right aspect ratio and size, let's bail
        return;
    }

    if (targetWidth > 1200) {
        targetWidth = 1200;
        targetHeight = 632;
    }

    console.log(
        `Resizing ${imagePath} from ${width}x${height} to ${targetWidth}x${targetHeight} and saving as ${ogimagePath}`
    );
    await image
        .resize({
            width: targetWidth,
            height: targetHeight,
            fit: sharp.fit.cover,
        })
        .toFile(ogimagePath);

    const ogurl = rewriteAssetUrl("./" + ogfn, pathname);
    post.ogimage = {
        url: ogurl,
        alt: post.image.alt,
        external: externalize(ogurl),
    };
}

async function processPost(post, loc = "") {
    const pathname = loc ? `/${loc}/${post.slug}` : `/${post.slug}`;
    const path = loc
        ? join(config.assets, loc, post.slug)
        : join(config.assets, post.slug);
    copyAssets(post.assets, path);
    rewritePost(post, pathname);
    await createOgImage(post, pathname, path);
}

export default async function generate() {
    // Blog
    const posts = getPosts(
        [
            "slug",
            "published",
            "title",
            "subtitle",
            "image",
            "ogimage",
            "content",
            "excerpt",
            "readingtime",
            "assets",
        ],
        0,
        10
    );
    await Promise.all(posts.map((post) => processPost(post, "blog")));
    await generateFeed("blog", posts);

    // pages
    const pages = ["about", "legal", "privacy"].map((slug) =>
        getContent(slug, mdPath(slug), [
            "title",
            "subtitle",
            "image",
            "ogimage",
            "content",
            "descripton",
            "assets",
        ])
    );
    await Promise.all(pages.map((page) => processPost(page)));
}
