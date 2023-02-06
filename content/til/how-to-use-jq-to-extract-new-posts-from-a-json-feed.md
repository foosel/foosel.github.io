---
title: "How to use jq to extract new posts from a JSON Feed"
date: 2023-02-02
tags:
- bash
- jq
- jsonfeed
- command line
---

I'm currently looking into ways to automate some stuff around new posts on this page (be it blog or TIL post) directly during the page build on GitHub Actions. For this, I first need to be able to reliably *detect* new posts, from a bash run step. So here's how to do that with [`jq`](https://stedolan.github.io/jq/).

The idea is to get the current [`feed.json`](/til/how-to-add-json-feed-support-to-hugo/) prior to publishing the page, and then compare it to the one that was just generated during the build. If there are any differences, we know that there are new posts and can trigger further actions from there.

```bash
# Get current feed.json
curl -s https://foosel.net/til/feed.json > feed.current.json

# Get new feed.json
cp public/til/feed.json feed.next.json

# Compare the two, this is where the magic happens
jq --slurpfile current til.current.json --slurpfile next til.next.json -n '$next[0].items - $current[0].items' > til.json
```

Let's go through this `jq` command there:

- `--slurpfile <variable> <file>` reads in the given files and makes it accessible as an array contained in the given variable. In this case we read in `til.current.json` and make it accessible as `$current`, and also read in `til.next.json` and make it accessible as `$next`.
- `-n` doesn't wait for input on stdin.
- `'$next[0].items - $current[0].items'` subtracts the items from the new feed from the items in the current feed[^1].
- `> til.json` writes the output to `til.json`.

`til.json` will then contain all new items (as long as there weren't more than the feed's item size), can be uploaded as an artifact and then used in further jobs[^2].

[^1]: The indexing (e.g. `$new[0]`) here is needed due to `--slurpfile` creating an array from the read file. I admittedly need to experiment more with this option to fully understand it, but for the purpose here it works.
[^2]: My current goal is to move my announcements on Mastodon for new posts from my NodeRED install got the page build, and also send any webmentions for links contained in new posts as well.
