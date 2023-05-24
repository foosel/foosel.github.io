---
title: "How to override the EDID data of a monitor under Linux"
date: 2023-04-11
updated: 2023-05-24
tags:
- linux
- wayland
---

I'm slowly but surely fixing all the issues I had after switching back to Linux as my main OS, so here's another TIL 😉

My secondary monitor is a 24" DELL with a resolution of 1920x1200, so 16:10, instead of the more common 1080p and 16:9. In order to be able to connect all my three monitors to my laptop, I make use of both the laptop's HDMI port as well as a USB-C dock that has 2 HDMI ports. The 4k main display is connected directly to the laptop's HDMI port, secondary and tertiary display are connected to the dock. 

The problem now was that as long as I had both secondary and tertiary connected, I could only select up to 1080p for the secondary. That would not have been that big of an issue if that wouldn't have caused the monitor to try to scale the 16:9 output to 16:10, stretching it. With only the secondary display attached however, it would detect the 16:10 resolution just fine.

On Windows, with the same hardware setup (albeit a different laptop), this was quickly solved with [a third party tool](https://www.monitortests.com/forum/Thread-Custom-Resolution-Utility-CRU) and ran just fine for months. On Linux I was stumped for the past few weeks since switching. Adding `video=` lines to the kernel parameters - as suggested by various guides - didn't seem to do the trick, and that appears to be the only option these days with Wayland in the mix to do something like this.

Today however I fell over [this helpful section](https://wiki.archlinux.org/title/kernel_mode_setting#Forcing_modes_and_EDID) on the ArchLinux wiki, and that gave me an idea. Apparently the EDID information of the secondary is correct when it is connected alone, or I wouldn't be able to select 1920x1200 then. So I should be able to just grab the EDID data from it when working and force that to be used all the time via a kernel parameter.

I disconnected my tertiary display and verified the secondary was now again being detected as supporting 1920x1200. Then I first figured out its port by checking which of the available devices showed as connected (and wasn't the internal laptop screen or the 4k primary):

```
$ for p in /sys/class/drm/*/status; do con=${p%/status}; echo -n "${con#*/card?-}: "; cat $p; done
DP-1: disconnected
DP-2: connected
DP-3: disconnected
DP-4: disconnected
DP-5: disconnected
DP-6: connected
DP-7: disconnected
eDP-1: connected
```

In my case that turned out to be `DP-6`[^1]. Next I quickly dumped the EDID information to a new file `/usr/lib/firmware/edid/dell-24-1200p.bin`:

```
sudo mkdir -p /usr/lib/firmware/edid
sudo cp /sys/class/drm/card1-DP-6/edid /usr/lib/firmware/edid/dell-24-1200p.bin
```

Then I used `grubby` to add a `drm.edid_firmware` kernel mode setting to all kernel entries for `DP-6` that tells the kernel to use this EDID file:

```
sudo grubby --update-kernel=ALL --args="drm.edid_firmware=DP-6:edid/dell-24-1200p.bin"
```

And one reboot later I could finally select 1920x1200 for my display! 🥳

*Addendum from 2023-05-24**: Recently the display's identifier's started switching between `DP-6` and `DP-8`, sometimes even when waking up from sleep. I'm not sure why, and I so far did not have time to investigate, but just so I or anyone else stumbling over this knows how to do this in the future, it's easy to set custom edid data on multiple devices as well, in my case:

```
sudo grubby --update-kernel=ALL --args="drm.edid_firmware=DP-6:edid/dell-24-1200p.bin,DP-8:edid/dell-24-1200p.bin"
```

[^1]: `DP-2` is the primary and `eDP-1` the laptop's internal display
