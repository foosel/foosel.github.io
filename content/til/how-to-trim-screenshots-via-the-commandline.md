---
title: "How to trim screenshots via the commandline"
date: 2023-02-09
tags:
- command line
- imagemagick
---

I just had to trim a bunch of screenshots that had some black borders around them. I didn't want to do this manually or via a GUI, but ideally batch-able via the commandline. Thankfully, that's one of the many things that [ImageMagick](https://imagemagick.org/) can do for you.

I put all my screenshot PNGs into a folder, and then in that folder ran this [`mogrify`](https://imagemagick.org/script/mogrify.php) command:

```bash
magick mogrify -trim -define trim:percent-background=0% -background black -path output/ *.png
```

I found that I had to add the `-define trim:percent-background=0%` option to get rid of *all* black borders, as otherwise on some of the images a very slim one ended up remaining. I also specified the background color with `-background black` to make sure that it really only trimmed the black borders.

I then could combine the resulting images into a PDF with [img2pdf](https://pypi.org/project/img2pdf/)[^1]:

```bash
img2pdf --output output.pdf *.png
```

[^1]: Look, a hidden bonus TIL!
