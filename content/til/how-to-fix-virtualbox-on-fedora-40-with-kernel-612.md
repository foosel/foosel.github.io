---
title: "How to fix VirtualBox on Fedora 40 with Kernel 6.12+"
date: 2025-02-27
tags:
- linux
- fedora
- virtualbox
---

I (accidentally[^1]) did a software update on my laptop last night, and this morning when I needed my Win10 VM for something, VirtualBox threw an error like this at me:

> VirtualBox can't operate in VMX root mode. Please disable the KVM kernel extension, recompile your kernel and reboot (VERR_VMX_IN_VMX_ROOT_MODE).

A quick web search for "fedora update virtualbox vboxisomaker" gave me [this forum post](https://discussion.fedoraproject.org/t/139896) and consequently 
[this bug report](https://www.virtualbox.org/ticket/22248), in which I found the solution: I just had to add the kernel parameter `kvm.enable_virt_at_load=0` to disable KVM - 
which comes enabled by default since Kernel 6.12. I accomplished that with grubby:

``` bash
sudo grubby --update-kernel=ALL --args="kvm.enable_virt_at_load=0"
```

After a reboot, VirtualBox started again.

Given how often VirtualBox breaks for me on updates, long term I think I really need to find a different solution... And yes, I also really need to upgrade to Fedora 41, I know 😉

[^1]: I needed to a quick reboot before an online call and promptly forgot to uncheck "install updates" on the reboot dialog. Which made me be late on the call. Meh.
