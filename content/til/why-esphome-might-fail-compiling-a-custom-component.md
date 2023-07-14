---
title: "Why ESPHome might fail compiling a custom component with 'fatal error: string: No such file or directory'"
date: 2023-07-14
tags:
- esphome
- datenzwerg
---

I just spent several hours trying to figure out why ESPHome refused to compile a custom component I was working on. The error message I got was

```
Compiling .pioenvs/datenzwerg-sleepy/src/esphome/components/sound_pressure/sound_pressure_sensor.c.o
In file included from src/esphome/components/sound_pressure/sound_pressure_sensor.h:3,
                 from src/esphome/components/sound_pressure/sound_pressure_sensor.c:1:
src/esphome/core/component.h:3:10: fatal error: string: No such file or directory
    3 | #include <string>
      |          ^~~~~~~~
compilation terminated.
Compiling .pioenvs/datenzwerg-sleepy/src/main.cpp.o
*** [.pioenvs/datenzwerg-sleepy/src/esphome/components/sound_pressure/sound_pressure_sensor.c.o] Error 1
```

Other external and internal components compiled just fine, so that was quite a head scratcher, until I just *finally* noticed something in my source tree: my custom component's source file had the file ending `.c` instead of `.cpp`. And that caused all of this, a quick rename from `sound_pressure_sensor.c` to `sound_pressure_sensor.cpp` resolved the compilation error 🤦‍♀️

And since it was utterly impossible for me to find anything about this particular problem online, I decided to share my mishap with all of you here, so that in the future someone else doing an internet search for this will have more luck than me today and not waste hours on this 😅