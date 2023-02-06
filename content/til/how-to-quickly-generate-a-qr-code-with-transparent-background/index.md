---
title: "How to quickly generate a QR Code with transparent background"
date: 2023-02-06
tags:
- qrcode
- nodejs
- command line
---

For an upcoming presentation I wanted to quickly generate a QR Code of my web site's URL to include on the final slide. Since my slide theme has a green gradient background with white text, I wanted the QR Code to be white on a transparent background, as a PNG.

Enter [node-qrcode](https://github.com/soldair/node-qrcode) which runs easily via `npx`[^1]:

```bash
npx qrcode -o output.png -d FFFF -l 0000 -w 500  "https://foosel.net"
```

- `-o output.png` sets the output file
- `-d FFFF` sets the dark color (usually black) to white with 100% opacity
- `-l 0000` sets the light color (usually white) to black with 0% opacity - fully transparent
- `-w 500` sets the size to 500px

For further options like error correction or QR code version, or how to use it as a library or in the browser, see node-qrcode's repo linked above.

I for one am happy with the result of this little exercise: 

![The final slide of a presentation. It says "Thank you for you attention!". Below that I've listed my Mastodon account @foosel@chaos.social, my GitHub account @foosel and my website's address foosel.net. A big white QR Code is placed right underneath, a handdrawn arrow points from website to code.](slide.png)

[^1]: Yes, there are also online services that can do this for you, no, I didn't want to look through dozens of them trying to find one that didn't attempt to make me subscribe to something just to change the color of the generated QR code. Local CLI ftw.