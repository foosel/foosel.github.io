---
title: "How to do monitor network traffic on my USG via Wireshark"
date: 2023-08-28
tags:
- ssh
- linux
- unifi
- networking
---

I'm currently trying to figure out some internal network issues[^1] and for that need to monitor the traffic of a specific device on my network. I'm using a Unifi USG as my router (behind the ISP's Fritzbox that I consider hostile since it's not mine). I found [this post on reddit](https://www.reddit.com/r/Ubiquiti/comments/ar444z/what_is_the_best_way_to_monitor_traffic_of_a/egkv91p/) that explains how to capture traffic on the USG via `tcpdump` and send it through the SSH session to Wireshark on my laptop:

```bash
ssh admin@192.168.1.1 'sudo tcpdump -f -i eth1 -w - src 192.168.1.12' | wireshark -k -i - 
```

I could confirm that this works and created a small script to make it easier to use by throwing this into `~/.local/bin/gatedump`[^2]:

```bash
#!/bin/bash

ARGS="$@"
TCPDUMP="sudo tcpdump -f -w - $ARGS"

ssh usg "$TCPDUMP" | wireshark -k -i -
```

This now allows me to easily run `tcpdump` remotely with custom arguments, e.g. `gatedump -i eth1 host 192.168.1.123`, and have it fire up Wireshark automatically. Wish me luck I'll now be able to figure out what's going on on my network, because it's driving me up the wall.

[^1]: The iPhone of my partner seems to do something that makes my ISP's router freak out and drop packets every couple of minutes. No issue when he's not here or doesn't have it connected to the WiFi, immediate packet loss when it's on the WiFi. It started at the start of this month and we are both currently out of explanations.
[^2]: `ssh usg` does automatically use the correct host, port and user thanks to an entry in `~/.ssh/config`.
