---
title: "How to detect Termux in a script"
date: 2023-01-23
tags:
- bash
- termux
- taskfile
---

If you need to detect whether you are running in Termux from a bash script, check if `$PREFIX` contains the string `com.termux`:

```
echo $PREFIX | grep -o "com.termux"

```

This can also be used to set a variable in a [Taskfile](https://taskfile.dev):

```yaml
vars:
  TERMUX: '{{and .PREFIX (contains "com.termux" .PREFIX)}}'
```

[Source](https://www.reddit.com/r/termux/comments/co46qw/how_to_detect_in_a_bash_script_that_im_in_termux/)
