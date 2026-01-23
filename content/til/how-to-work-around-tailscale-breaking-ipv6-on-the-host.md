---
title: "How to work around tailscale breaking IPv6 on the host"
date: 2026-01-23
tags:
- linux
- tailscale
- administration
- networking
- routing
- ipv6
---

Yesterday I ran into an incredibly weird issue. I installed the [Tailscale](https://tailscale.com/) client on two of my virtual servers hosted in the Hetzner Cloud (running Ubuntu) and suddenly the websites they offered stopped working. I suspected Tailscale and indeed, `tailscale down` immediately restored functionality. 

The websites in question are actually on GitHub Pages and my servers are just acting as reverse proxy to resolve domain and TLS, and a look into the web server's `error.log` showed that the issue in serving was that the server could no longer reach its upstream at `github.io` when Tailscale was active. It wasn't a general loss of external connectivity though - IPv4 addresses still worked great, the webserver however was trying to connect to the upstream via IPv6 and this is where things failed.

I did some quick tests, pinging Google's DNS on both IPv4 (`8.8.8.8`) and IPv6 (`2001:4860:4860::8888`) with Tailscale running, and that showed that while Tailscale was running, IPv6 connectivity just broke down completely while IPv4 continued to work:

```
$ sudo tailscale up && ping -c 3 8.8.8.8 && sudo tailscale down
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=3.98 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=3.69 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=117 time=3.63 ms

--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2002ms
rtt min/avg/max/mdev = 3.631/3.771/3.986/0.162 ms

$ sudo tailscale up && ping -c 3 2001:4860:4860::8888 && sudo tailscale down
PING 2001:4860:4860::8888(2001:4860:4860::8888) 56 data bytes

--- 2001:4860:4860::8888 ping statistics ---
3 packets transmitted, 0 received, 100% packet loss, time 2051ms
```

As a next step, I checked the route that would be taken for resolving `2001:4860:4860::8888` with and without Tailscale:

```
$ ip route get 2001:4860:4860::8888
2001:4860:4860::8888 from :: via fe80::1 dev eth0 src aaaa:bbbb:cccc:dddd::1 metric 1024 pref medium

$ sudo tailscale up && ip route get 2001:4860:4860::8888 && sudo tailscale down
2001:4860:4860::8888 from :: via fe80::1 dev eth0 src fd7a:115c:a1e0::aaaa:bbbb metric 1024 pref medium
```

So, the issue was that for some reason, while Tailscale was running the system decided to use Tailscale's internal IPv6 `fd7a:115c:a1e0::aaaa:bbbb` set on `tailscale0` as the source IP but send the packet through the default route and `eth0`, and that didn't work. It basically hijacked the IPv6 traffic, even when the Tailnet wasn't even involved.

The routes looked fine to me and some buddies I asked also didn't spot anything amiss:

```
$ ip -6 rule show
0:      from all lookup local
5210:   from all fwmark 0x80000/0xff0000 lookup main
5230:   from all fwmark 0x80000/0xff0000 lookup default
5250:   from all fwmark 0x80000/0xff0000 unreachable
5270:   from all lookup 52
32766:  from all lookup main

$ ip -6 route show table local
local ::1 dev lo proto kernel metric 0 pref medium
local aaaa:bbbb:cccc:dddd::1 dev eth0 proto kernel metric 0 pref medium
local fd7a:115c:a1e0::aaaa:bbbb dev tailscale0 proto kernel metric 0 pref medium
local fe80::5fdc:58a7:1a93:da5a dev tailscale0 proto kernel metric 0 pref medium
local fe80::9400:ff:fe0d:61a1 dev eth0 proto kernel metric 0 pref medium
multicast ff00::/8 dev eth0 proto kernel metric 256 pref medium
multicast ff00::/8 dev tailscale0 proto kernel metric 256 pref medium

$ ip -6 route show table 52
fd7a:115c:a1e0::53 dev tailscale0 metric 1024 pref medium
fd7a:115c:a1e0::/48 dev tailscale0 metric 1024 pref medium

$ ip -6 route show table main
aaaa:bbbb:cccc:dddd::/64 dev eth0 proto kernel metric 256 pref medium
fd7a:115c:a1e0::aaaa:bbbb dev tailscale0 proto kernel metric 256 pref medium
fe80::/64 dev eth0 proto kernel metric 256 pref medium
default via fe80::1 dev eth0 metric 1024 pref medium
```

From what I could see, firing up Tailscale would add the following new rules to the routing table:

```
$ ip route show table all > ts-off.txt
$ sudo tailscale up && ip route show table all > ts-on.txt && sudo tailscale down
$ diff ts-off.txt ts-on.txt
0a1,2
> 100.a.b.c dev tailscale0 table 52
> 100.100.100.100 dev tailscale0 table 52
3a6
> local 100.x.y.z dev tailscale0 table local proto kernel scope host src 100.x.y.z
12a16,17
> fd7a:115c:a1e0::53 dev tailscale0 table 52 metric 1024 pref medium
> fd7a:115c:a1e0::/48 dev tailscale0 table 52 metric 1024 pref medium
13a19
> fd7a:115c:a1e0::aaaa:bbbb dev tailscale0 proto kernel metric 256 pref medium
17a24
> local fd7a:115c:a1e0::aaaa:bbbb dev tailscale0 table local proto kernel metric 0 pref medium
```

I still have not figured out what is actually going on there, and a reproduction on a fresh server so far also wasn't successful. The problem is that packets are being sent with the wrong source IPv6, but that's just a symptom of the underlying cause. 

Thankfully, my buddy Jub came up with the workaround to change the default route to use a fixed IPv6 source address - the correct one - and that solved the issue (by fixing the symptom):

```
ip -6 route replace default via fe80::1 dev eth0 src aaaa:bbbb:cccc:dddd::1
```

I put that on a new `post-up` line into the network setup in `/etc/network/interface.d/50-cloud-init.cfg`

```
auto eth0:0
iface eth0:0 inet6 static
    address aaaa:bbbb:cccc:dddd::/64
    gateway fe80::1
    post-up route add -net :: netmask 0 gw fe80::1%eth0 || true
    post-up ip -6 route replace default via fe80::1 dev eth0 src aaaa:bbbb:cccc:dddd::1 || true
    pre-down route del -net :: netmask 0 gw fe80::1%eth0 || true
```

A reboot confirmed that this works as a **workaround**.

But as I mentioned, I still can't make any sense of the underlying issue. I found [one open bug report in Tailscale's bug tracker](https://github.com/tailscale/tailscale/issues/17936) that sounded familiar, but it didn't fully match my situation. I also have to admit that my administration skills kinda get a bit fuzzy when it comes to full blown route analysis & debugging - so should you have any ideas at all what is actually causing this behaviour here, please get in touch [on Mastodon](https://chaos.social/@foosel) - I'd love to see this mystery solved, but am out of my depth here 😅