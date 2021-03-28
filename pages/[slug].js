import React from "react";

import ErrorPage from "next/error";
import { NextSeo } from "next-seo";

import Post from "@components/Post";
import { getContent, mdPath, rewritePost } from "@lib/content";
import mdxRenderToString from "@lib/mdxRenderToString";
import mdxHydrate from "@lib/mdxHydrate";

import config from "@data/config.yml";

export default function Article({ post, seo }) {
    if (!post?.slug) {
        return <ErrorPage statusCode={404} />;
    }
    return (
        <>
            <NextSeo {...seo} />
            <Post {...post}>{mdxHydrate(post.mdx)}</Post>
        </>
    );
}

export async function getStaticProps({ params }) {
    const slug = params.slug;
    const post = getContent(slug, mdPath(slug), [
        "title",
        "subtitle",
        "image",
        "content",
        "descripton",
    ]);
    const pathname = `/${post.slug}`;

    rewritePost(post, pathname);
    const mdx = await mdxRenderToString(post.content || "");

    const images = [];
    if (post.image) {
        images.push({
            ...post.image,
            url: post.image.external,
        });
    }
    const description = post.description || post.excerpt || post.subtitle || "";

    return {
        props: {
            post: {
                ...post,
                slug,
                mdx,
            },
            seo: {
                title: post.title,
                description: description,
                openGraph: {
                    title: post.title,
                    url: config.external + "/" + post.slug,
                    description: description,
                    images: images,
                },
            },
        },
    };
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: "legal" } },
            { params: { slug: "privacy" } },
            { params: { slug: "about" } },
        ],
        fallback: false,
    };
}
