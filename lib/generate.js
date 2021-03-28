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

async function processPost(post, loc = "") {
    const pathname = loc ? `/${loc}/${post.slug}` : `/${post.slug}`;
    const path = loc
        ? join(config.assets, loc, post.slug)
        : join(config.assets, post.slug);
    copyAssets(post.assets, path);
    rewritePost(post, pathname);
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
            "content",
            "descripton",
            "assets",
        ])
    );
    await Promise.all(pages.map((page) => processPost(page)));
}
