---
title: How to open a file from Tasker in Markor
tags: 
- android
- tasker
- markor
date: 2023-01-21
---

In order to open a file from Tasker in Markor (e.g. to edit a [newly created blog post](/blog/2023-01-21-hugo-meet-android/)), create a "Send Intent" step with:

- Action: `android.intent.action.SEND`
- Cat: `None`
- Mime Type: `text/plain`
- Data: `content://net.dinglisch.android.taskerm.fileprovider/external_files/path/to/the/file` (be sure to replace `/path/to/the/file` with the absolute path to the file you want to open)
- Package: `net.gsantner.markor`
- Class: `net.gsantner.markor.activity.DocumentActivity`



