---
title: "How to fix VirtualBox on Fedora 38 with Kernel 6.4.10+ by adding a missing include"
date: 2023-09-07
tags:
- linux
- fedora
- virtualbox
aliases:
- how-to-fix-virtualbox-on-fedora38-with-kernel-6410
---

I recently did a software update on my laptop running Fedora 38, and that also brought in a kernel update. Starting my Win10 VirtualBox VM afterwards no longer worked as it needed the kernel module to be recompiled. However, that failed:

```
$ sudo /sbin/vboxconfig 
[sudo] password for gina: 
vboxdrv.sh: Stopping VirtualBox services.
depmod: WARNING: could not open modules.order at /lib/modules/6.3.8-200.fc38.x86_64: No such file or directory
depmod: WARNING: could not open modules.builtin at /lib/modules/6.3.8-200.fc38.x86_64: No such file or directory
depmod: WARNING: could not open modules.builtin.modinfo at /lib/modules/6.3.8-200.fc38.x86_64: No such file or directory
vboxdrv.sh: Starting VirtualBox services.
vboxdrv.sh: Building VirtualBox kernel modules.
egrep: warning: egrep is obsolescent; using grep -E
vboxdrv.sh: failed: Look at /var/log/vbox-setup.log to find out what went wrong.

There were problems setting up VirtualBox.  To re-start the set-up process, run
  /sbin/vboxconfig
as root.  If your system is using EFI Secure Boot you may need to sign the
kernel modules (vboxdrv, vboxnetflt, vboxnetadp, vboxpci) before you can load
them. Please see your Linux system's documentation for more information.
```

A look into `/var/log/vbox-setup.log` revealed an error along the lines of this one[^1]:

```
/tmp/akmodsbuild.bPlgZsDR/BUILD/VirtualBox-kmod-7.0.10/_kmod_build_6.4.10-200.fc38.x86_64/vboxnetflt/linux/VBoxNetFlt-linux.c: In function 'vboxNetFltLinuxForwardToIntNetInner':
/tmp/akmodsbuild.bPlgZsDR/BUILD/VirtualBox-kmod-7.0.10/_kmod_build_6.4.10-200.fc38.x86_64/vboxnetflt/linux/VBoxNetFlt-linux.c:1570:40: error: implicit declaration of function 'skb_gso_segment'; did you mean 'skb_gso_reset'? [-Werror=implicit-function-declaration]
 1570 |             struct sk_buff *pSegment = skb_gso_segment(pBuf, 0 /*supported features*/);
      |                                        ^~~~~~~~~~~~~~~
      |                                        skb_gso_reset
/tmp/akmodsbuild.bPlgZsDR/BUILD/VirtualBox-kmod-7.0.10/_kmod_build_6.4.10-200.fc38.x86_64/vboxnetflt/linux/VBoxNetFlt-linux.c:1570:40: warning: initialization of 'struct sk_buff *' from 'int' makes pointer from integer without a cast [-Wint-conversion]
cc1: some warnings being treated as errors
```

I did some web searching and came across [this post on the Fedora forums](https://discussion.fedoraproject.org/t/87492) with someone having the exact same issue, and found [a solution in the comments courtesy of Peter Francis](https://discussion.fedoraproject.org/t/6-4-10-200-fc38-x86-64-created-problems-with-virtual-box/87492/12):

> Adding
>
>     #include <net/gso.h>
>
> below the line
>
>     #include <linux/inetdevice.h>
>
> in `/usr/share/virtualbox/src/vboxhost/vboxnetflt/linux/VBoxNetFlt-linux.c` fixed it for me.
>
> Hopefully when the file gets overwritten on next VirtualBox update the fix will be already added by VirtualBox’s programmers.

And what can I say, it also fixed it for me! And should this not get fixed in the next update, now I'll know where to find the solution again - my own TIL post 😉

PS: Something tells me this won't be the last VirtualBox related TIL post I'll write...

[^1]: This is copy-pasted from someone else, as my log file got overwritten by the successful compile later. However it looked very much like this error, apart from my Kernel already being at 6.4.13.