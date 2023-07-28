---
title: "How to make MkDocs support site_url relative URLs"
date: 2023-07-27
lastmod: 2023-07-28
tags:
- python
- mkdocs
---

I'm currently *finally* back on converting the [OctoPrint](https://octoprint.org) docs to using Markdown and [MkDocs](https://mkdocs.org).

Since I have some images in the docs that I want to be able to reference without having to use relative URLs (`../../../../images/`), 
especially since that would tie things in OctoPrint's source tree structure too close to things in its documentation tree structure that
might or might not end up being in a different repository in the future, I needed a way to use absolute URLs here (`/images/`). But 
since the docs will most likely also end up being hosted on a version specific subpath of `docs.octoprint.org`, just using
(host) absolute URLs would not work either and break.

There's [several](https://github.com/mkdocs/mkdocs/issues/1592) [issues](https://github.com/mkdocs/mkdocs/issues/192) on the MkDocs issue
tracker about workflow problems caused by this, but the suggested workarounds like using [macros](https://mkdocs-macros-plugin.readthedocs.io/) 
to prefix a variable's contents to related URLs didn't work for me due to me also heavily relying on [mkdocstrings](mkdocstrings.github.io/), 
and anything contained in docstrings is not processed by macros[^1].

So I got the idea to implement a minimal MkDocs plugin that would just turn all URLs contained in `href` and `src` attributes
that are prefixed with a custom schema `site:` schema into *site relative* URLs, with this effect. Example:

| URL | site_url | resulting URL |
| --- | --- | --- |
| `site:images/foo.png` | `https://docs.octoprint.org/` | `/images/foo.png` |
| `site:images/foo.png` | `https://docs.octoprint.org/1.9.x/` | `/1.9.x/images/foo.png` |

Using a [hook](https://www.mkdocs.org/user-guide/configuration/#hooks) I could register a callback for the 
[`on_page_content`](https://www.mkdocs.org/dev-guide/plugins/#on_page_content) event that would then replace all URLs as needed
in the generated page HTML.

And this is the resulting `site_urls.py`:

```python
import logging
import urllib.parse
import re

import mkdocs.plugins

log = logging.getLogger("mkdocs")

SITE_URLS_REGEX = re.compile(r'(href|src)="site:([^"]+)"', re.IGNORECASE)

@mkdocs.plugins.event_priority(50)
def on_page_content(html, page, config, files):
    site_url = config["site_url"]
    path = urllib.parse.urlparse(site_url).path

    if not path:
        path = "/"
    if not path.endswith("/"):
        path += "/"

    def _replace(match):
        param = match.group(1)
        url = match.group(2)
        if url.startswith("/"):
            url = url[1:]

        log.info(f"Replacing site:{match.group(2)} with {path}{url}...")
        return f'{param}="{path}{url}"'

    return SITE_URLS_REGEX.sub(_replace, html)
```

that I've registered as a hook in my `mkdocs.yaml` like this:

```yaml
hooks:
  - site_urls.py
```

Seems to work just fine, both for images and links! 😄

**Update 2023-07-28**: I've now published this as a proper plugin on PyPI, see [mkdocs-site-urls](https://pypi.org/project/mkdocs-site-urls/).
With that, all you need to do - given you are already on MkDocs 1.5 or newer - is installing the plugin via `pip install mkdocs-site-urls` and 
then adding this to your `mkdocs.yaml`:

```yaml
plugins:
  - site-urls
```

[^1]: As I found out when I wanted to add a `version_added` macro, which simply didn't render.