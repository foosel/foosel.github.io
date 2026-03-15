---
title: "human.json"
date: 2026-03-15
tags:
- meta
- genAI
- human.json
- slashpage
---

Thanks to [a toot by Seth Larson](https://mastodon.social/@sethmlarson/116229292847984092) yesterday I learned about the [still in draft `human.json` spec](https://codeberg.org/robida/human.json) by Beto Dealmeida:

> `human.json` is a lightweight protocol for humans to assert authorship of their site content and vouch for the humanity of others. It uses URL ownership as identity, and trust propagates through a crawlable web of vouches between sites.

Basically, a web of trust to confirm that pages are written by actual human beings vs just LLM generated slop.

That idea certainly clicked with me and so I quickly threw together a basic [`human.json`](/human.json) in this page's `static` folder and linked to it from the `layouts/partials/extend_head.html` override file. That will get filled more over time 😊

And as reading through the spec of `human.json` also made me learn about the [`/ai` slashpage](/ai) I added that as well and linked it from the footer.

Those [slashpages](https://slashpages.net/) are a fun idea I'll have to investigate further too!