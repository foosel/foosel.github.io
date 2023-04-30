---
title: "How to reduce the titlebar size of Gnome 43"
date: 2023-04-11
tags:
- linux
- gnome
- gnome 43
- framework laptop
---

A few weeks ago I switched back to Linux as my primary OS, on a newly acquired refurbished [Framework Laptop 11](https://frame.work), and one thing that's since been bothering me on my chosen desktop environment Gnome[^1] has been the HUGE titlebars:

![Before: A quite tall title bar with a lot of padding, wasting space](before.png)

So I finally dug into solving this quickly, and came across [this post on Reddit](https://www.reddit.com/r/gnome/comments/y61xhm/comment/ivay6db/) with a quite nice solution. I modified `~/.config/gtk-3.0/gtk.css` and added the following contents:

``` css
window.ssd headerbar.titlebar {
    padding-top: 2px;
    padding-bottom: 2px;
    min-height: 0;
}
window.ssd headerbar.titlebar button.titlebutton {
    padding: 1px;
    min-height: 0;
    min-width: 0;
}
```

That resulted in this:

![After: The title bar reduced to the bare minimum in height, with only a minimal amount of padding, no more wasting space](after.png)

And now I'm happy, at least with non-Gnome apps, my chosen development environment VSCode included.

*Update 2023-04-30: Alas, that no longer works under Gnome 44, so for now I'm stuck with oversized titlebars again.*

[^1]: Currently Gnome 43.3 running under Wayland on Fedora Workstation 37
