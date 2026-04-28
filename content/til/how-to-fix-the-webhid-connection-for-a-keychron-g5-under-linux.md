---
title: "How to fix the Chromium WebHID connection for a Keychron G5 under Linux"
date: 2026-04-28
tags:
- fedora
- udev
- keychron
---

Today my new mouse arrived, a [Keychron G5](https://www.keychron.com/products/keychron-g5-ultra-light-wireless-mouse). I had read that it was supposedly configurable through (Chromium based) browsers via [WebHID](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API), OS agnostic, so no need to install any weird (bloated) drivers or keep a Windows VM ready. However, when I went to `https://launcher.keychron.com` in my ungoogled Chromium running under Fedora Linux, I had to realize that while it could see the mouse, it would not actually connect to it.

A quick web search later I fell over [this repository](https://github.com/StefanMarAntonsson/keychron-launcher-arch-guide) with a guide on how to get Chromium's WebHID connection to work to a Keychron Q5 HE under ArchLinux, and I figured that was close enough (and the steps outlined therein logical enough) to adapt. And just so I can easily find this again, I'm replicating the crucial bits here...

Apparently all I needed were some additional `udev` rules for both the mouse itself (when connected via the USB-C cable) as well as the 2.4GHz dongle (when connected wirelessly). So, first I figured out the relevant vendor and product IDs:

```
$ lsusb | grep -i keychron
Bus 005 Device 042: ID 3434:d028 Keychron Keychron Ultra-Link 8K
Bus 005 Device 062: ID 3434:d06f Keychron Keychron G5
```

Those turned out to be vendor `0x3434` and products `0xd06f` (wired mouse) and `0xd028` (dongle). So based on the repo linked above I created `/etc/udev/rules.d/50-keychron-g5.rules` as follows:

```
# Keychron G5 (WebHID)
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTR{idVendor}="3434", ATTRS{idProduct}=="d06f", MODE="0666", TAG+="uaccess", TAG+="udev-acl"
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTR{idVendor}="3434", ATTRS{idProduct}=="d028", MODE="0666", TAG+="uaccess", TAG+="udev-acl"
```

then refreshed `udev`:

```
sudo udevadm control --reload-rules
sudo udevadm trigger
```

and replugged the mouse and restarted Chromium.

After that, the launcher page could finally connect! 🥳
