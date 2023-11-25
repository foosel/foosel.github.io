---
title: "How to fix GRUB after a SteamOS update"
date: 2023-11-25
tags:
- steamos
- steamdeck
- linux
- grub
- refind
---

My partner just ran into an issue after updating his SteamDeck to the latest SteamOS version (3.4.x to 3.5.7). 

He has a dual boot setup running using [rEFInd](https://github.com/jlobue10/SteamDeck_rEFInd), and while that survived the OS update just fine, when he wanted to return to SteamOS after a quick stint in Windows today, he was greeted by a GRUB boot menu. 

Detective foosel to the rescue.

Attempting to boot the SteamOS entry in grub resulted in an error like this (with another device UUID):

```
error: no such device: aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
error: file `/boot/vmlinuz-linux-neptune` not found.
error: you need to load the kernel first.

Press any key to continue...
```

So it couldn't find it's boot device and due to that also not the kernel stored thereon.

Entering the Deck's boot manager and manually booting `\efi\steamos\steamoscl.efi` also led to the same situation.

I was able to still boot into SteamOS via the fallback entry however (which also had a different boot device UUID).

And it took me way too long[^1] to simply just get the idea to let Linux update its GRUB entries:

```
sudo update-grub
```

That fixed it.

No idea if the dual boot setup played a roll in this mess or if it was just some random hiccup, my Deck's update went without a hitch 🤷‍♀️ But if it happens again I now have this entry to check 😁

[^1]: I reinstalled rEFInd, rebuilt the EFI entries (`sudo efibootmgr -c -d /dev/nvme0n1 -p 1 -L "SteamOS" -l \\efi\\steamos\\steamcl.efi`) and the initramfs files (`mkinitcpio -P`) before getting the idea to maybe start at the bottom instead of the top.