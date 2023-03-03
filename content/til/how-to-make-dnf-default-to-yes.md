---
title: "How to make dnf default to yes"
date: 2023-03-02
tags:
- fedora
- linux
- dnf
- framework laptop
---

I'm currently in the process of setting up my new [Frame.work laptop](https://frame.work), and since I've been using Debian-derivatives for the past two decades now, I decided to use the opportunity, try something new for once and installed [Fedora](https://fedoraproject.org)[^1].

Something that got annoying quickly is that the package manager command `dnf` defaults to "no" when asking if you really want to install a package plus its dependencies. I'm very used to `apt`'s behaviour here that allows me to type `sudo apt install <package>` and then just hit `Enter` on the sanity check. I wanted the same for `dnf`, but without bypassing the sanity check altogether. I did some digging together with my buddy [Ben](https://ben.sycha.uk/) and we found the answer.

Edit the file `/etc/dnf/dnf.conf` and add the following line to the `[main]` section:

```bash
defaultyes=True
```

And once that's done, the sanity check now is `Y/n` instead of `y/N` and you can just hit `Enter` to install the package.

(This is btw the first post written on the new laptop and I'm really enjoying it so far!)

[^1]: To all my Debian friends: It's really just curiousity and expanding my horizon, no need to try to convert me back or anything like that 😉
