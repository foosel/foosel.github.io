---
title: "How to make transparent GIFs more easily sharable by adding a checkerboard background"
date: 2024-10-15
tags:
- imagemagick
- gifsicle
- bash
- aseprite
---

I'm currently taking part in the ["#hARToween" daily art challenge](https://social.horrorhub.club/@stina_marie/113220760493893634), as I want to
work on my pixelart skills and drawing a 128x128px pixel drawing each day[^1] for a month seemed
like a good idea. You can follow my posts [in this thread](https://chaos.social/@foosel/113233763230193057).

I'm using [Aseprite](https://aseprite.org/), and recently came across [the "record for aseprite" script for it](https://sprngr.itch.io/aseprite-record)
that allows taking regular snapshots of what I'm currently drawing so a timelapse can be created from 
that. And that works nicely, but I had to realize that the timelapse would come with transparency until
I came to the background during my drawing, which looked really weird when sharing the resulting GIF.

So I looked into adding the usual transparency checkerboard background to the GIF with a quick script, 
and of course, [ImageMagick](https://imagemagick.org/) once more to the rescue. Alas, the resulting GIF was quite large and ImageMagick's
optimization options caused glitches in the GIF. So I looked for another option to optimize the GIF and 
came across [gifsicle](https://www.lcdf.org/gifsicle/).

The result is this bash script which will take a GIF and an optional background image to set,
add the background (or a freshly generated checkerboard pattern of the right size) to the GIF, then compress
the GIF:

``` bash
#!/bin/bash

GIF=$1
BG=$2

BASE=$(basename "${GIF%.*}")
OUTPUT="$BASE.bg.gif"

if [ -f "$BG" ]; then
    echo "Adding background image $BG to all frames of $GIF..."
    magick "$GIF" -coalesce null: "$BG" -compose dstOver -layers composite "$OUTPUT"
else
    size=$(gifsicle --sinfo "$GIF" | grep "logical screen" | xargs echo -n | cut -d" " -f 3)

    echo "Generating a $size checkerboard pattern and adding it as background to all frames of $GIF..."
    magick "$GIF" -coalesce null: \( -size $size tile:pattern:checkerboard \) -compose dstOver -layers composite "$OUTPUT"
fi

echo "Optimizing $OUTPUT..."
gifsicle --batch -O3 --lossy=35 "$OUTPUT"

echo "...done!"
```

Example call:

``` plain
$ gif_bg 14.gif 
Generating a 256x256 checkerboard pattern and adding it as background to all frames of 14.gif...
Optimizing 14.bg.gif...
...done!
```

I'm quite happy with the result:

{{< toot "https://chaos.social/@foosel/113306303596486838" >}}

[^1]: Well, almost, I was at MRMCD and then a bit under the weather after and thus missed some days that I'm now trying to catch up on again.