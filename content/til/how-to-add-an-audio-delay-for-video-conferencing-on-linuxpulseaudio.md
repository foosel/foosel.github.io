---
title: "How to add an audio delay for video conferencing on Linux/Pulseaudio"
date: 2023-03-11
tags:
- audio
- video conferencing
- obs
- linux
- pulseaudio
---

After recently switching to work under Linux, I needed a way to replicate [my existing solution for delaying audio under Windows](../how-to-add-an-audio-delay-for-video-conferencing-on-windows) under Linux/Pulseaudio.

To once again explain my situation, I use [OBS](https://obsproject.com/) also for video conferencing, through the virtual camera[^1]. OBS does not offer a built-in way to provide a virtual microphone with all the filters and such applied as well (in my case noise reduction and a limiter), so I need to solve this in a separate way. Additionally, my camera setup has a small delay of around 350ms that I also need to compensate by delaying my audio.

OBS offers a monitoring port that you can push your audio devices on, and that will get the filters applied, but [none of the configured offsets](https://obsproject.com/forum/threads/connecting-obs-with-zoom-without-av-syncing-issues.123960/post-469274). On Windows, I solved this [by using a combination of two Virtual Cable devices and RadioDelay between the two](../how-to-add-an-audio-delay-for-video-conferencing-on-windows).

Today I rebuild basically the same setup on Linux via a bunch of virtual [Pulseaudio](https://www.freedesktop.org/wiki/Software/PulseAudio/) devices. I have this in `~/.local/bin/obs-virtual-mic`:

```bash
#!/bin/bash

# create virtual speaker
pactl load-module module-null-sink sink_name=Virtual-Speaker sink_properties=device.description=Virtual-Speaker

# create delayed virtual speaker & associated mic
pactl load-module module-null-sink sink_name=Virtual-Speaker-Delayed sink_properties=device.description=Virtual-Speaker-Delayed
pactl load-module module-remap-source source_name=Remap-Source master=Virtual-Speaker-Delayed.monitor

# copy from virtual to delayed virtual with 350ms delay
pactl load-module module-loopback latency_msec=350 source=Virtual-Speaker.monitor sink=Virtual-Speaker-Delayed
```

Let's take a closer look at what this does:

- create two virtual sinks `Virtual-Speaker` and `Virtual-Speaker-Delayed` with `pactl load-module module-null-sink ...`
- create a virtual source for the delayed sink via `pactl load-module module-remap-source ...`
- finally mirror the sound from `Virtual-Speaker.monitor` to `Virtual-Speaker-Delayed` while adding a latency of 350ms

I run this. Then OBS gets set to use `Virtual-Speaker` as monitor. In my video conferencing software I then use `Virtual-Speaker-Delayed` as my input to get my video and audio synced up.

[^1]: I prefer the flexibility and control it gives me with regards to how I show up, how my screen shows up, etc, vs what you usually get from your run-of-the-mill video conferencing tool.
