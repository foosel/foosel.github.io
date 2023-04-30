---
title: "How to make the Home Assistant app sync properly under iOS"
date: 2023-04-30
tags:
- home assistant
- ios
---

While I'm strongly rooted in the Android camp, my partner has an iPhone, and on what seems to be every iOS update, the Home Assistant app installed on his phone stops syncing in the background.

That wouldn't be so bad if a lot of the home automations didn't factor in presence status which gets synced through that, so this has been a source of minor annoyance whenever his status refused to mirror his presence or absence. It just happened again and because every single time now we've had to try to remember how to fix it, here's a quick TIL to encourage my memory 😅

And it's simple really. Open the iOS settings, scroll down to the Home Assistant settings and make sure that location sharing is set to "Always".
