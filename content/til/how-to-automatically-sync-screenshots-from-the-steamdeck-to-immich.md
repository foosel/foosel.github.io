---
title: "How to automatically sync screenshots from the Steamdeck to Immich"
date: 2025-03-25
tags:
- steamdeck
- immich
- bash
- linux
---

As part of [my ongoing effort to reduce my dependency on US services](https://chaos.social/@foosel/114105591362840338), I just moved my photos
from Google Photos to a self-hosted [immich](https://immich.app/) instance (which I btw can only recommend so far).

You might remember from [a previous TIL](/til/how-to-automatically-sync-screenshots-from-the-steamdeck-to-google-photos/) 
that I had my Steamdeck configured to push my screenshots into a custom album on Google Photos. Obviously I had to change that now as well, 
but sadly couldn't use the existing [rclone](https://rclone.org/)-based setup for it. 

My first idea was to utilize [immich-go](https://github.com/simulot/immich-go), as I have just successfully used that for the
three day long import of over 50000 pictures from my Google Photos takeout into immich. But that turned out to not be the right tool here: in order to not even try to
upload already existing files it will fetch an asset list from immich first, and while that really improves performance for large batch imports,
it takes way too long for uploading a single new screenshot.

So instead I went with something self-built which utilizes [immich's API](https://immich.app/docs/api/).

## A custom upload script

The first part is this little bash script that will take a file as input, upload it to a pre-configured immich instance and also add it to a
pre-defined album (which already has to exist). This lives in `~/.local/bin/immich-upload.sh`:

``` bash
#!/bin/bash
set -e

IMMICH_SERVER="https://immich.example.com"
IMMICH_KEY="your api key goes here"
IMMICH_ALBUM="your album id goes here"

INPUT="$1"
if [ "$INPUT" == "" ]; then
    echo "immich-upload.sh <file>"
    exit 0
fi

file_modified=$(stat -c %Y "$INPUT" | date --iso-8601=seconds)
name=$(basename "$INPUT")

# ---

echo "Uploading $INPUT to immich..."

upload=$(curl -sL --request POST "$IMMICH_SERVER/api/assets" \
    -H "Content-Type: multipart/form-data" \
    -H "Accept: application/json" \
    -H "X-API-Key: $IMMICH_KEY" \
    -F "deviceId=\"curl/steamdeck\"" \
    -F "deviceAssetId=\"$name-$file_modified\"" \
    -F "fileCreatedAt=\"$file_modified\"" \
    -F "fileModifiedAt=\"$file_modified\"" \
    -F "assetData=@\"$INPUT\"")

id=$(echo "$upload" | jq -r .id)

echo "Uploaded file, asset id is $id"

# ---

echo "Adding file to album $IMMICH_ALBUM..."

payload=$(jq -n --arg id $id '{ids:[$ARGS.named.id]}')
album=$(curl -sL --request PUT "$IMMICH_SERVER/api/albums/$IMMICH_ALBUM/assets" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "X-API-Key: $IMMICH_KEY" \
    -d "$payload")

echo "... done"
```

## Reacting to new screenshots

I use [watchexec](https://github.com/watchexec/watchexec) to listen for changes in my custom screenshot folder 
([see this TIL post on how to set that up](/til/how-to-automatically-sync-screenshots-from-the-steamdeck-to-google-photos/))
and calling the upload script with the correct file name. I downloaded a release build of `watchexec` and threw it into `~/.local/bin`, then created another 
script `~/.local/bin/sync-screenshots` that takes care of setting all of the correct parameters[^1]:

``` bash
#!/usr/bin/env bash

WATCHEXEC="${HOME}/.local/bin/watchexec"
FOLDER="${HOME}/.steam_screenshots"

${WATCHEXEC} --exts jpg,png,mp4 --fs-events create --emit-events-to environment -w $FOLDER -o queue -p -v -- '/home/deck/.local/bin/immich-upload.sh "$WATCHEXEC_COMMON_PATH/$WATCHEXEC_CREATED_PATH"'
```

## Putting it all together

Finally, a new systemd unit in `~/.config/systemd/user/sync-screenshots.service` takes care of starting this bash script and keeping it running:

```
[Unit]
Description=Sync Steam Screenshots

[Service]
ExecStart=%h/.local/bin/sync-screenshots
Restart=on-failure
RestartSec=5

[Install]
WantedBy=default.target
```

I enabled and started that:

``` bash
systemctl --user enable sync-screenshots
systemctl --user start sync-screenshots
```

Then I took a screenshot and confirmed that the script had run:

```
Mar 25 15:17:03 steamdeck sync_screenshots[77135]: [Running: /home/deck/.local/bin/immich-upload.sh "$WATCHEXEC_COMMON_PATH/$WATCHEXEC_CREATED_PATH"]
Mar 25 15:17:03 steamdeck sync_screenshots[77188]: Uploading /home/deck/.steam_screenshots/7_20250325151703_1.png to immich...
Mar 25 15:17:04 steamdeck sync_screenshots[77188]: Uploaded file, asset id is 141dc605-edef-48f1-83b5-00bd9d72b13e
Mar 25 15:17:04 steamdeck sync_screenshots[77188]: Adding file to album 0ce35e68-a564-4e26-921e-c486cd9e4725...
Mar 25 15:17:05 steamdeck sync_screenshots[77188]: ... done
Mar 25 15:17:05 steamdeck sync_screenshots[77135]: [Command was successful]
```

And indeed, upon checking my immich instance, I was also looking at the freshly uploaded screenshot. Mission accomplished!

[^1]: It's currently reacting to newly added `jpg`, `png` or `mp4` files. The latter is in preparation of hopefully another toolchain to automatically convert clips from 
[Steam's game recorder](https://store.steampowered.com/gamerecording) that will automatically push its results into the screenshot folder as well, but that's only an idea for now.
