import React from "react";

import ErrorPage from "next/error";
import { NextSeo } from "next-seo";

import Post from "@components/Post";
import {
    getPost,
    getPosts,
    getPreviousAndNext,
    rewritePost,
} from "@lib/content";
import { assetComponents } from "@lib/mdx";
import mdxRenderToString from "@lib/mdxRenderToString";
import mdxHydrate from "@lib/mdxHydrate";
import config from "@data/config.yml";

export default function BlogPost({ post, seo, previous, next }) {
    if (!post?.slug) {
        return <ErrorPage statusCode={404} />;
    }
    return (
        <>
            <NextSeo {...seo} />
            <Post {...post} previous={previous} next={next}>
                {mdxHydrate(post.mdx, assetComponents(`/blog/${post.slug}`))}
            </Post>
        </>
    );
}

export async function getStaticProps({ params }) {
    const post = getPost(params.slug, [
        "slug",
        "published",
        "updated",
        "title",
        "subtitle",
        "image",
        "content",
        "readingtime",
        "assets",
    ]);
    const pathname = `/blog/${post.slug}`;

    rewritePost(post, pathname);
    const mdx = await mdxRenderToString(
        post.content || "",
        assetComponents(pathname)
    );

    const { previous, next } = getPreviousAndNext(params.slug, [
        "slug",
        "title",
    ]);

    const images = [];
    if (post.ogimage) {
        images.push({
            ...post.ogimage,
            url: post.ogimage.external,
        });
    } else if (post.image) {
        images.push({
            ...post.image,
            url: post.image.external,
        });
    }

    return {
        props: {
            post: {
                ...post,
                mdx,
            },
            seo: {
                title: post.title,
                description: post.description || post.excerpt || "",
                openGraph: {
                    title: post.title,
                    url: config.external + pathname,
                    description: post.description || post.excerpt || "",
                    images: images,
                    type: "article",
                    article: {
                        publishedTime: post.published || "",
                        modifiedTime: post.updated || post.published || "",
                    },
                },
            },
            previous: previous
                ? { link: "/blog/" + previous.slug, title: previous.title }
                : null,
            next: next
                ? { link: "/blog/" + next.slug, title: next.title }
                : null,
        },
    };
}

export async function getStaticPaths() {
    const posts = getPosts(["slug"]);

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            };
        }),
        fallback: false,
    };
}
