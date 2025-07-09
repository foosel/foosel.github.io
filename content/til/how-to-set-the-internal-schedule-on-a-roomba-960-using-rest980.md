---
title: "How to set the internal schedule on a Roomba 960 using rest980"
date: 2025-07-09
tags:
- home automation
- rest980
- curl
- jq
---

For some reason my Roomba 960 decided to fall off the cloud, or at least the official app refuses to see it.

I thankfully already have an instance of [rest980](https://github.com/koalazak/rest980) running in my homelab anyhow, and it is still happily chatting with
the bot. And tbh, I might just block cloud access again as having everything local is better anyhow.

In any case, I wanted to disable the schedule currently set on it internally to switch to scheduling stuff from my home automation, 
but without the app working I wasn't sure on how. So I went hunting through rest980's source - as the README didn't tell me what
I was looking for - and found that I could program the weekly schedule with some easy `curl` magic via the `/api/local/config/week`
endpoint.

Firing off a `GET` against that, this is the data structure I received:

``` json
{
  "cycle": [
    "none",
    "start",
    "start",
    "start",
    "start",
    "start",
    "none"
  ],
  "h": [
    9,
    15,
    15,
    15,
    15,
    15,
    9
  ],
  "m": [
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]
}
```

`cycle` seems to be the on/off button from Sunday at index 0 to Saturday on index 6. `start` schedules a cleaning run, `none` disables it.
`h` is the hours on which to start each day, and `m` the minute.

What I wanted to do was to set all of the days to off, and this I achieved with this combined `GET`/`POST` call with some `jq` manipulation in the middle:

``` bash
curl $REST980_URL/api/local/config/week | \
    jq '.cycle[] = "none"' | \
    curl --json @- $REST980_URL/api/local/config/week
```

Another problem - hopefully - solved! I'll see tomorrow if this *really* disabled the schedule 😅 but I'm optimistic!
