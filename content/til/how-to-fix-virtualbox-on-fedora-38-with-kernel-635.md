---
title: "How to fix VirtualBox on Fedora 38 with Kernel 6.3.5 by disabling IBT"
date: 2023-06-13
tags:
- linux
- fedora
- virtualbox
---

For accounting and some windows only software (👋 Affinity Designer) I have a Windows 10 VM running in VirtualBox on my Framework running Fedora 38. Apparently I got a kernel update recently and as of this morning the VM refused to start. It just hung, and a look into `journalctl` showed something like this:

```
Jun 13 10:23:50 draper kernel: traps: Missing ENDBR: 0xffff9b688c308f30
```

After some searching I came across [this thread on the VirtualBox forums](https://forums.virtualbox.org/viewtopic.php?p=536761#p536761) which explained the issue and also includes the solution. Apparently the VirtualBox kernel driver [triggers Intel's IBT (indirect branch tracking)](https://www.virtualbox.org/ticket/21435). The solution is to disable that[^1] by passing `ibt=off` as a kernel parameter:

```
sudo grubby --update-kernel=ALL --args="ibt=off"
```

After a reboot I could rebuild the vbox kernel driver via `/sbin/vboxconfig`, which ran through without issues, and after that the VM started up just fine.

[^1]: Honestly, I'd prefer to keep [IBT](https://lwn.net/Articles/889475/) enabled for security reasons, but I need the VM to work. Let's hope VirtualBox fixes this soon, though given how long this seems to have gone on I'm a bit skeptical.
