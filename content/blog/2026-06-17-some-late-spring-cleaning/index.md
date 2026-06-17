---
title: "Meta: Some late spring cleaning"
#description:
date: 2026-06-17
cover:
  image: cover.jpg
  alt: Some small white flowers on a green plant
  relative: true
tags:
- hugo
- meta
---

It was annoying me for a while now that my chosen theme [PaperMod](https://github.com/adityatelange/hugo-PaperMod/) didn't also support some kind of all-in-one RSS feed with all main sections. And also that the feeds were called `index.xml` instead of `feed.xml`, confusing me every time I wanted to check something on them manually. Also, the feed link title just being `rss` didn't exactly help in a feed reader either.

So just now I've done some long overdue spring cleaning on this page:

1. I updated PaperMod[^1] & adjusted my overwrites as necessary
2. I implemented my custom rss feed template with some more logic to render it with all main sections on home
3. I disabled the automatic inclusion of the section feeds and created my own with proper `title` attributes ("(All|Blog|TIL) posts on foosel.net"), put into the head of all pages
4. I overrode the default name of the generated feeds to be `feed.xml` & added the necessary redirects (hopefully...)
5. I also added links to the main RSS feed at two prominent places: in the social icons on the home page as well as in the main navigation next to the search button. While the feeds were always discoverable through the related `link` tags in the HTML page itself, and there were also specific links on the section main pages, I still got some questions here and there on whether there was a feed, so I hope this makes things easier to discover now.

If you want a look behind the scenes on how I did that, [this page's source is on a public repo](https://github.com/foosel/foosel.github.io), so feel free to take a look 😊

All that's left to say is: I'm sorry should I have broken something there or caused your RSS reader to push all old posts into your face 😬

[^1]: ... and discovered that it's now apparently also a victim of vibe coding 😕
