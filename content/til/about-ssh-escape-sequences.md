---
title: "About SSH escape sequences"
date: 2023-03-22
tags:
- ssh
- escape
- linux
---

OpenSSH's `ssh` command supports a bunch of escape sequences while a session is running, by default triggered by the `~` character. According to [`man ssh`](https://linux.die.net/man/1/ssh) a list of available commands can be requested with `~?`. And indeed, hitting `~?` within an open SSH session prints some helpful information:

```plain
$ ~?
Supported escape sequences:
 ~.   - terminate connection (and any multiplexed sessions)
 ~B   - send a BREAK to the remote system
 ~C   - open a command line
 ~R   - request rekey
 ~V/v - decrease/increase verbosity (LogLevel)
 ~^Z  - suspend ssh
 ~#   - list forwarded connections
 ~&   - background ssh (when waiting for connections to terminate)
 ~?   - this message
 ~~   - send the escape character by typing it twice
(Note that escapes are only recognized immediately after newline.)
```

I most commonly require `~.` to disconnect from a broken SSH session (e.g. something I still had open on my laptop when I sent it to sleep).

The command line opened via `~C` is quite interesting as well, as it allows configuration of port forwards on the fly, while the session is already running:

```plain
ssh> help
Commands:
      -L[bind_address:]port:host:hostport    Request local forward
      -R[bind_address:]port:host:hostport    Request remote forward
      -D[bind_address:]port                  Request dynamic forward
      -KL[bind_address:]port                 Cancel local forward
      -KR[bind_address:]port                 Cancel remote forward
      -KD[bind_address:]port                 Cancel dynamic forward
```

This is once again a "TIL" that I didn't actually learn about only today, but I keep forgetting about it and then need to frantically google whenever I need it. I hope this way I'll finally remember this stuff 😅
