import React from "react";

import Link from "next/link";
import ClockIcon from "mdi-react/ClockOutlineIcon";

import DateFormatter from "@components/DateFormatter";

export default function Posts({ posts }) {
    return (
        <ul className="space-y-8">
            {posts.map((post, idx) => (
                <li key={idx}>
                    <div className="italic">
                        <DateFormatter dateString={post.published} />
                    </div>
                    <h1 className="text-4xl hover:underline">
                        <Link as={`/blog/${post.slug}`} href="/blog/[slug]">
                            {post.title}
                        </Link>
                    </h1>
                    {post.subtitle && (
                        <h2 className="text-xl font-thin">{post.subtitle}</h2>
                    )}
                    {post.excerpt && (
                        <div className="clamp-2">{post.excerpt}</div>
                    )}
                    {post.readingtime && (
                        <p className="mt-2 text-xs">
                            <ClockIcon className="inline" size={12} />{" "}
                            {post.readingtime.text}
                        </p>
                    )}
                </li>
            ))}
        </ul>
    );
}
