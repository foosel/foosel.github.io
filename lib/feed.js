import { Feed } from "feed";
import { parseISO } from "date-fns";
import fs from "fs";

import markdown2html from "@lib/markdown";

import config from "@data/config.yml";

async function generateFeedItem(base, post) {
    const url = base + post.slug;
    const html = await markdown2html(post.content || "");
    const date = parseISO(post.published);
    const item = {
        title: post.title,
        id: post.slug,
        link: url,
        content: html,
        date: date,
    };

    if (post.excerpt) {
        item.description = post.except;
    }

    if (post.externalImage) {
        item.image = post.externalImage;
    }

    return item;
}

export async function generateFeed(f, posts) {
    const meta = config.feeds[f];
    const items = await Promise.all(
        posts.map((post) => generateFeedItem(meta.link, post))
    );
    const feed = new Feed({
        title: meta.title,
        description: meta.description,
        id: meta.link,
        link: meta.link,
        language: "en",
        image: meta.image,
        favicon: meta.favicon,
        copyright: "All rights reserved 2021, Gina Häußge",
        author: {
            name: "Gina Häußge",
            email: "gina@foosel.net",
            link: config.external,
        },
        feedLinks: {
            json: config.external + "/feed/" + f + ".json",
            atom: config.external + "/feed/" + f + ".atom",
        },
    });
    items.forEach((item) => {
        feed.addItem(item);
    });
    return feed;
}

export default async function exportFeed(f, posts) {
    const feed = await generateFeed(f, posts);

    const meta = config.feeds[f];
    fs.writeFileSync(meta.output + ".rss", feed.rss2());
    fs.writeFileSync(meta.output + ".atom", feed.atom1());
    fs.writeFileSync(meta.output + ".json", feed.json1());
    console.log("Generated rss, atom and json feed for " + f);
}
