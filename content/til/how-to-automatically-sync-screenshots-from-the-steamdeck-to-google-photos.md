---
title: "How to automatically sync screenshots from the Steamdeck to Google Photos"
date: 2023-02-19
tags:
- steamdeck
- google photos
- rclone
- bash
---

As a follow-up to [my earlier post about how to sync screenshots to Google Drive](/til/how-to-automatically-sync-screenshots-from-the-steamdeck-to-google-drive/) here's how to achieve the same but with a dedicated "Steamdeck" album on Google Photos instead.

Once again we are using `rclone` for syncing.

First I created a new target `gphoto` by running `~/bin/rclone config` again and then following [these steps](https://rclone.org/googlephotos/). Quick summary:

1. `New remote`
2. `gphoto`
3. Empty application ID and secret
4. Full access
5. No advanced config
6. Use web browser to authenticate

I then created a new album:

```bash
rclone mkdir gphoto:album/Steamdeck
```

and adjusted `~/bin/sync_screenshots` to use the new remote and remote path:

```bash
REMOTE_NAME='gphoto'
REMOTE_DIR='album/Steamdeck'
```

That was all.

Obviously the same can be done with any of the other sync targets that `rclone` supports, of which [there are many](https://rclone.org/overview/). For ownCloud or NextCloud it looks like [WebDAV](https://rclone.org/webdav/) is the right option to choose.