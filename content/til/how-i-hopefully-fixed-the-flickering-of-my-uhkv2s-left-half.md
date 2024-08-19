---
title: "How I (hopefully) fixed the flickering of my UHKv2's left half"
date: 2024-08-19
tags:
- uhk
- keyboard
- hardware
- i2c
---

I've been a long time user of the [Ultimate Hacking Keyboard (UHK)](https://ultimatehackingkeyboard.com/). It started with acquiring version 1 in 2020 and upgrading to version 2 in 2022. The UHK is a split keyboard with two halves connected by a bridge cable. While the first version was rock solid for me, with the second one I sadly started to experience intermitten flickering of the left half, during which the left side became unresponsive. Sometimes the half would then even outright disconnect completely. Unplugging and repluggin it would usually fix the issue, but was annoying.

I reached out to UHK support, they confirmed they had gotten reports about this from other customers as well and were still investigating. They even created [an FAQ page](https://ultimatehackingkeyboard.com/repair/fixing-misbehaving-keys). In the end, after much troubleshooting I got a replacement, and for a while it looked like things were fixed. But then the flickering returned, just less frequent. For the longest time I've now just lived with having to occasionally replug my keyboard. But on Friday I found myself on speaker phone with my mom, helping her debug an issue with her PC through screen sharing, with my mobile located between the two halves of the keyboard, and the flickering started with a vengeance! I had to replug the keyboard three or four times during the call, which was super annoying. 

So I decided investigate once more, to see if maybe some new information had come up. And indeed it had, I found [this thread on the UHK forums](https://forum.ultimatehackingkeyboard.com/t/left-module-flickering-with-mobile-phone/152): 

> Thought I’d start a topic about an issue which I’m aware at least a few people have experienced. Which is that the left module’s connection can flicker on/off if your mobile phone is placed to the left of it.
> 
> I realised this initially when I tried to capture a video of it happening and couldn’t do it, realising that the act of picking up my phone resolved it. These days I keep the phone away from that side of desk. It’s not a particular problem for me, but I’m sure it’ll be a confusing issue for people when they first encounter it.
> 
> My suspicion is that the I2C connection between the two halves has less protection against interference than USB. But it might be interesting to hear from actual engineers about this. And also if people have found a way to mitigate it.

And that got immediately confirmed by UHK:

> Admittedly, the UHK is rather sensitive to electromagnetic interference, and we send [this troubleshooting guide](https://ultimatehackingkeyboard.com/repair/fixing-misbehaving-keys) to our customers when they encounter such issues. We couldn’t catch this issue in the design phase, but fortunately, people can almost always work around it.
> 
> I2C is a likely reason; the bus is too long and has too many ICs on it. Future UHK versions will use UART between the halves. Another possible cause is insufficient ground pour on the PCBs, which will be much increased in future versions as well.

and matches my experiences perfectly! When it got really bad on Friday, the phone was actively being used and right next to the left half. And I usually keep my phone in my right pocket, and only occassionally put it on the desk, which could explain why the flickering is so intermittent for me. I checked the (adjusted) FAQ entry and found this advice at the end of it:

> If [the issue persists], no matter what, then you can reduce the communication speed of the internal I2C bus of the UHK, making it more stable. The default value is 100000. You can half the communication speed by running the following smart macro commands, preferably in the `$onInit` macro:
>
> ```
> set macroEngine.extendedCommands 1
> set i2cBaudRate 500000
> ```
> 
> which should make communication more stable, but the smaller the value, the less responsive your UHK will get, which you will notice below a certain value

I've now applied that through the UHK Agent software, and so far (after a test call to my phone located in the same position as on Friday), things seem stable. Time will tell if this is a permanent fix, but I'm hopeful. And I'm glad I found this information, as it explains the issue and gives me a way to mitigate it (I might add some aluminum foil to the bottom of the left half too, as suggested). 

I'm also glad that UHK is aware of the issue and working on a fix for future versions. I'm looking forward to that, as I really like the UHK otherwise. 
