import React from "react";

import { NextSeo } from "next-seo";

import Post from "@components/Post";
import YouTubeEmbed from "@components/YouTubeEmbed";
import media from "@data/media.yml";

function ArticlesAndInterviews(props) {
    const items = props.items;
    return (
        <>
            <h2>Articles &amp; Interviews</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <div>
                            <a href={item.link}>{item.title}</a>
                        </div>
                        {item.description && <div>{item.description}</div>}
                    </li>
                ))}
            </ul>
        </>
    );
}

function Podcasts(props) {
    const items = props.items;
    return (
        <>
            <h2>Podcasts</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <div>
                            <a href={item.link}>{item.title}</a>
                        </div>
                        {item.description && <div>{item.description}</div>}
                    </li>
                ))}
            </ul>
        </>
    );
}

function Talks(props) {
    const items = props.items;
    return (
        <>
            <h2>Talks</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <div>
                            <a href={item.link}>{item.title}</a>
                        </div>
                        {item.description && <div>{item.description}</div>}
                    </li>
                ))}
            </ul>
        </>
    );
}

function Videos(props) {
    const items = props.items;
    return (
        <>
            <h2>Videos</h2>
            {items.map((item, index) => (
                <div key={index}>
                    <h3>
                        "{item.title}" ({item.description})
                    </h3>
                    <YouTubeEmbed
                        noCookie
                        vid={item.youtube}
                        preview={item.preview}
                        start={item.start}
                        end={item.end}
                    />
                </div>
            ))}
        </>
    );
}

export default function MediaPage() {
    return (
        <>
            <NextSeo
                title="Media"
                description="A collection of articles, podcasts, talks and videos by and with me."
            />
            <Post title="Media">
                <ArticlesAndInterviews items={media.articles} />
                <Podcasts items={media.podcasts} />
                <Talks items={media.talks} />
                <Videos items={media.videos} />
            </Post>
        </>
    );
}
