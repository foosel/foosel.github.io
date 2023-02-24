---
title: "How to add itch.io games to the Steamdeck"
date: 2023-02-24
tags:
- steamdeck
- itch.io
- srm
---

I'm currently setting up some alternative game stores on my Steamdeck, specifically [Emudeck](https://www.emudeck.com/) for my retro collection, [Heroic Launcher](https://heroicgameslauncher.com/)[^1] for GOG and Epic, and also [itch.io](https://itch.io). 

I stumbled across [this Reddit post](https://www.reddit.com/r/SteamDeck/comments/vwili3/better_way_to_itchio_on_steam_deck/) that recommended to use the itch.io Windows launcher instead of the native Linux one:

> Itch.io has an app, that even has linux version. But it has issues - it can only use one wine version, if you have it installed globally, it can't even handle linux games well. It pretends to install them, and when you launch them it opens a directory with the zip file... Or it just doesn't work after installation. Then you need to add all the games to steam, setup their images, and other stuff. There's boilr for that, but it doesn't find everything, and most of the indies are not in the database anyway.

Sounds reasonable to go with the Windows version then, so I followed the post and got everything working. Quick summary in case the link goes stale:

- In desktop mode, download the Windows installer from https://itch.io/app, add it as a non steam game, configure stable Proton for it, launch it, complete the installer and log in.
- Open Dolphin, navigate to `home/deck/.steam/steam/steamapps/compatdata`
- Click on the search icon, check "From here", search for `itch` and enter the first found folder of that name. Look at the address bar, you'll be in a subfolder of something like `/home/deck/.steam/steam/steamapps/compatdata/<number>` for a random `number`, this parent folder is what to use for `<basefolder>` in any following steps.
- In desktop Steam, open the preferences of your non-steam itch.io installer "game". Replace "Target" with `<basefolder>/pfx/drive_c/users/steamuser/Desktop/itch.lnk` and "Start in" with `<basefolder>/pfx/drive_c/users/steamuser/AppData/Local/Itch`. Rename it to "itch.io" or whatever else you want it to be called[^2].

I then followed the steps to also allow [Steam Rom Manager](https://steamgriddb.github.io/steam-rom-manager/) to detect my itch.io games, and created a custom itch.io parser. Here I had to slightly deviate from the suggested steps. Again, summarised here for reference:

- Parser type: glob
- Title: `itch.io`
- Steam category: `${itch.io}`
- Steam directory: `${steamdirglobal}`
- ROMs directory: `<basefolder>/pfx/drive_c/users/steamuser/AppData/Roaming/itch/apps`
- Executable modifier: `"${exePath}"` (with quotes!)
- User's glob: `${title}/{*/,}!(Unity*).exe` **(this one is different than on the Reddit post, see below for why!)**
- Leave anything else as is.

I changed the glob pattern as the original setting of `${title}/{*/*,*}.exe` was happily detecting the Unity crash handler executable contained in some games as additional entry, obviously not what I wanted. 

After some trial and error I thankfully was able to solve this with the slightly different glob pattern of `${title}/{*/,}!(Unity*).exe`. It now matches any `exe` right in the game folder or one folder deep that *doesn't* start with the string `Unity`. And if push comes to shove I can add additional forbidden patterns as well. 

Even Unity games now only generate one entry, and seem to work fine once I've figured out the right Proton version 👍

[^1]: Basically a one click install from the "Discover" app in desktop mode.
[^2]: My SteamGridDB [Decky](https://deckbrew.xyz/) plugin seemed happy with that name as I was able to quickly download matching artwork once back in Game mode.