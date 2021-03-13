import React from "react";

import { NextSeo } from "next-seo";

import Page from "@components/Page";
import Posts from "@components/Posts";
import PreviousAndNext from "@components/PreviousAndNext";

import { getPosts, rewritePost } from "@lib/content";

import config from "@data/config.yml";

export default function BlogIndex({ posts, previous, next }) {
    const title = "Blog";
    const subtitle = "Thoughts on coding, tinkering and life in general";
    return (
        <>
            <NextSeo title={title} description={subtitle} />
            <Page title={title} subtitle={subtitle}>
                <Posts posts={posts} />
                <PreviousAndNext previous={previous} next={next} />
            </Page>
        </>
    );
}

export async function getStaticProps() {
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
        0,
        config.blog.count
    );

    posts.forEach((post) => {
        rewritePost(post, `/blog/${post.slug}`);
    });

    const previous =
        pageCount > 1
            ? { link: "/blog/archive/2", title: "Older posts" }
            : null;

    return {
        props: {
            posts,
            previous,
        },
    };
}
