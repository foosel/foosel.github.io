---
title: "How to add an audio delay for video conferencing on Windows"
date: 2022-09-29
tags: 
- audio
- video conferencing
- obs
- windows
---

# Situation

[OBS](https://obsproject.com/) used for video conferences through the virtual camera. Audio virtualized and with active OBS filters applied (limiter, noise suppression) through means of setting the monitor device to a sink created with [VirtualCable](https://vac.muzychenko.net/en/) and using its source in the video conferences tools.

# Problem

The camera feed has a slight delay of 300-400ms. The audio is thus ahead.

Adding a delay through OBS doesn't get applied to the monitor device ([Source](https://obsproject.com/forum/threads/connecting-obs-with-zoom-without-av-syncing-issues.123960/post-469274)):

> The sync offset that you apply in OBS only applies to either the recording from OBS or the output stream from OBS. It does not apply to the monitor. When you use a virtual cable, and you set it up as a monitor in OBS, you will hear the inputs without any sync delay. As far as I know there is no way to apply your delays to the audio monitor output.

# Solution

Install [RadioDelay](https://www.daansystems.com/radiodelay/). 

Create a second virtual cable device. Use its sink as the monitoring device in OBS, its source as source in RadioDelay, and set the sink of the first virtual cable as sink in RadioDelay. Apply the delay in RadioDelay. 

The first cable now outputs delayed audio and can be used as audio source in the video conferencing tools.

You can also create a shortcut to fire up RadioDelay with the right devices selected, the delay applied and the output active with something like this: 

```
"C:\Program Files\Radiodelay\radiodelay.exe" -delay 0.3 -in 5 -out 3
```

`in` and `out` are the positions of the audio device in the drop-down list. `delay` is the delay in seconds.

Can of course also be used without OBS.