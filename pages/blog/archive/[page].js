import React from "react";

import BlogIndex from "../index";

import { getPosts } from "@lib/content";

import config from "@data/config.yml";

export default function BlogArchive({ posts, previous, next }) {
    return <BlogIndex posts={posts} previous={previous} next={next} />;
}

export function getStaticProps({ params }) {
    const page = parseInt(params.page);
    const pageCount = Math.ceil(getPosts(["slug"]).length / config.blog.count);
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
        ],
        (page - 1) * config.blog.count,
        config.blog.count
    );

    const next =
        page > 1
            ? { link: "/blog/archive/" + (page - 1), title: "Newer posts" }
            : null;
    const previous =
        page < pageCount
            ? { link: "/blog/archive/" + (page + 1), title: "Older posts" }
            : null;

    return {
        props: {
            posts,
            previous,
            next,
        },
    };
}

export async function getStaticPaths() {
    const posts = getPosts(["slug"]);
    const pageCount = Math.ceil(posts.length / config.blog.count);

    return {
        paths: [...Array(pageCount).keys()].map((idx) => {
            return {
                params: {
                    page: "" + (idx + 1),
                },
            };
        }),
        fallback: false,
    };
}
