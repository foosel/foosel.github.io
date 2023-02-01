---
title: "How to grep a log for multiline errors"
date: 2023-02-01
tags:
- linux
- grep
- regex
- python
- octoprint
---

I just found myself in the position to have to `grep` an OctoPrint log file for error log entries with attached Python stack traces. I wanted to not only get the starting line where the exception log output starts, but the full stack trace up until the next regular log line. 

The format of the lines in `octoprint.log` is a simple `%(asctime)s - %(name)s - %(levelname)s - %(message)s`, so a log with an error and attached exception looks like this:

```plain
2023-01-30 17:50:45,704 - octoprint.events.fire - DEBUG - Firing event: Disconnecting (Payload: None)
2023-01-30 17:50:45,704 - octoprint.events - DEBUG - Sending action to <bound method PrinterStateConnection._onEvent of <octoprint.server.util.sockjs.PrinterStateConnection object at 0x000001635CB6EE50>>
2023-01-30 17:50:45,705 - octoprint.plugin - DEBUG - Calling on_event on action_command_notification
2023-01-30 17:50:45,705 - octoprint.plugin - DEBUG - Calling on_event on action_command_prompt
2023-01-30 17:50:45,705 - octoprint.plugin - DEBUG - Calling on_event on announcements
2023-01-30 17:50:45,705 - octoprint.plugin - DEBUG - Calling on_event on file_check
2023-01-30 17:50:45,706 - octoprint.plugin - DEBUG - Calling on_event on firmware_check
2023-01-30 17:50:45,706 - octoprint.plugin - DEBUG - Calling on_event on pluginmanager
2023-01-30 17:50:45,706 - octoprint.plugin - DEBUG - Calling on_event on softwareupdate
2023-01-30 17:50:45,706 - octoprint.plugin - DEBUG - Calling on_event on tracking
2023-01-30 17:50:45,711 - octoprint.plugin - DEBUG - Calling on_event on mqtt
2023-01-30 17:50:45,732 - octoprint.events.fire - DEBUG - Firing event: Disconnected (Payload: None)
2023-01-30 17:50:45,735 - octoprint.events - DEBUG - Sending action to <function Server.run.<locals>.<lambda> at 0x000001635BDB2CA0>
2023-01-30 17:50:45,750 - octoprint.events - ERROR - Got an exception while sending event Disconnected (Payload: None) to <function Server.run.<locals>.<lambda> at 0x000001635BDB2CA0>
Traceback (most recent call last):
  File "C:\Devel\OctoPrint\OctoPrint\src\octoprint\events.py", line 197, in _work
    listener(event, payload)
  File "C:\Devel\OctoPrint\OctoPrint\src\octoprint\server\__init__.py", line 1212, in <lambda>
    octoprint.events.Events.DISCONNECTED, lambda e, p: run_autorefresh()
                                                       ^^^^^^^^^^^^^^^^^
  File "C:\Devel\OctoPrint\OctoPrint\src\octoprint\server\__init__.py", line 1195, in run_autorefresh
    autorefresh.stop()
    ^^^^^^^^^^^^^^^^
AttributeError: 'RepeatedTimer' object has no attribute 'stop'
2023-01-30 17:50:45,753 - octoprint.events - DEBUG - Sending action to <bound method PrinterStateConnection._onEvent of <octoprint.server.util.sockjs.PrinterStateConnection object at 0x000001635CB6EE50>>
2023-01-30 17:50:45,755 - octoprint.plugin - DEBUG - Calling on_event on action_command_notification
2023-01-30 17:50:45,756 - octoprint.server.util.sockjs - DEBUG - Socket message held back until permissions cleared, added to backlog: plugin
2023-01-30 17:50:45,758 - octoprint.plugins.action_command_notification - INFO - Notifications cleared
2023-01-30 17:50:45,758 - octoprint.plugin - DEBUG - Calling on_event on action_command_prompt
2023-01-30 17:50:45,758 - octoprint.plugin - DEBUG - Calling on_event on announcements
2023-01-30 17:50:45,759 - octoprint.plugin - DEBUG - Calling on_event on file_check
2023-01-30 17:50:45,759 - octoprint.plugin - DEBUG - Calling on_event on firmware_check
2023-01-30 17:50:45,759 - octoprint.server.util.sockjs - DEBUG - Socket message held back until permissions cleared, added to backlog: plugin
2023-01-30 17:50:45,763 - octoprint.plugin - DEBUG - Calling on_event on pluginmanager
2023-01-30 17:50:45,764 - octoprint.plugin - DEBUG - Calling on_event on softwareupdate
2023-01-30 17:50:45,764 - octoprint.plugin - DEBUG - Calling on_event on tracking
```

What I now wanted is for `grep` to spit out just the `ERROR` line and the attached stack trace:

```plain
2023-01-30 17:50:45,750 - octoprint.events - ERROR - Got an exception while sending event Disconnected (Payload: None) to <function Server.run.<locals>.<lambda> at 0x000001635BDB2CA0>
Traceback (most recent call last):
  File "C:\Devel\OctoPrint\OctoPrint\src\octoprint\events.py", line 197, in _work
    listener(event, payload)
  File "C:\Devel\OctoPrint\OctoPrint\src\octoprint\server\__init__.py", line 1212, in <lambda>
    octoprint.events.Events.DISCONNECTED, lambda e, p: run_autorefresh()
                                                       ^^^^^^^^^^^^^^^^^
  File "C:\Devel\OctoPrint\OctoPrint\src\octoprint\server\__init__.py", line 1195, in run_autorefresh
    autorefresh.stop()
    ^^^^^^^^^^^^^^^^
AttributeError: 'RepeatedTimer' object has no attribute 'stop'
```

For this I needed a way to set `grep` to match multiple lines and do a (non-matching) look ahead for the end. It turns out that the secret to success here is to treat the whole input as one line, use Perl compatible regex mode, and make sure to set the multiline flag. After some fiddling around on [regex101.com](https://regex101.com/r/qYOrnT/1) and reading up on [Perl's regex options](https://perldoc.perl.org/perlre#Extended-Patterns)[^1], I came up with the following:

```plain
grep -Pazo '(?m)^\N+\- ERROR \-\N*\n(^\N*?\n)*?(?=\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3} \- )' octoprint.log
```

Let's walk through this:

- `-P` enables Perl compatible regex mode
- `-a` enables text mode
- `-z` turns all newlines into null bytes and thus treats the whole input as a single line for finding matches[^2]
- `-o` only outputs the matched part of the line (otherwise we'd get the whole file printed out)
- `(?m)` enables multiline mode
- `^\N+\- ERROR \-\N*\n` matches the first line of the error, which is the one that starts with the timestamp and package and contains the word `ERROR`
- `(^\N*?\n)*?` non-greedily matches all following lines of the error, which are indented by a single space and end with a newline
- `(?=\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3} \- )` is a positive look-ahead that matches a line starting with a timestamp again, which signifies the end of the error's lines

Hooray, it works 🥳:

```plain
❯ grep -Pazo '(?m)^\N+\- ERROR \-\N*\n(^\N*?\n)*?(?=\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3} \- )' octoprint.log
2023-01-30 17:50:45,750 - octoprint.events - ERROR - Got an exception while sending event Disconnected (Payload: None) to <function Server.run.<locals>.<lambda> at 0x000001635BDB2CA0>
Traceback (most recent call last):
  File "C:\Devel\OctoPrint\OctoPrint\src\octoprint\events.py", line 197, in _work
    listener(event, payload)
  File "C:\Devel\OctoPrint\OctoPrint\src\octoprint\server\__init__.py", line 1212, in <lambda>
    octoprint.events.Events.DISCONNECTED, lambda e, p: run_autorefresh()
                                                       ^^^^^^^^^^^^^^^^^
  File "C:\Devel\OctoPrint\OctoPrint\src\octoprint\server\__init__.py", line 1195, in run_autorefresh
    autorefresh.stop()
    ^^^^^^^^^^^^^^^^
AttributeError: 'RepeatedTimer' object has no attribute 'stop'
```

(And yes, I've fixed the error that lead to this stack trace as well 😉)

[^1]: I don't know about you, but I always forget about positive/negative look-ahead/behind and pattern-match modifiers.
[^2]: The downside of this is that now `-n` (print line number of match) will not work anymore and just happily report line 1 for every single match.
