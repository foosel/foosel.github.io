---
title: "How to automatically build a human.json file in Hugo"
date: 2026-03-20
tags:
- human.json
- hugo
---

As I mentioned the other day, I recently added a [human.json file](/til/humanjson/) to this site.

However, it became a bit annoying adding new vouches to the json manually.

So today I sat down and made it get created automatically during my page build powered by [Hugo](https://gohugo.io), based on a list of vouches stored in a `vouches.yaml` data file[^1].

For this I first created said data file in `data/vouches.yaml`:

``` yaml
- url: https://food.foosel.net
  date: "2026-03-14"
- url: https://chaos.social/@foosel
  date: "2026-03-14"
- url: https://octoprint.org
  date: "2026-03-14"
# ...
```

Then I created a new output format `humanjson` in my `config.yaml`, making sure to also add it to the home page:

``` yaml
outputs:
  home:
    - HTML
    - JSON
    - humanjson
  # ...

outputFormats:
  # ...
  humanjson:
    mediaType: application/json
    baseName: human
    isPlainText: true
    notAlternative: true
  # ...
```

Finally I created a template for that in  `_layout/home.humanjson.json`:

``` go-text-template
{
    "version": "0.1.1",
    "url": {{ .Site.BaseURL | jsonify }},
    "vouches": [
    {{- range $index, $vouch := hugo.Data.vouches }}
    {{- with $vouch }}
        {{- if $index }},{{end}}
        {
            "url": {{ .url | jsonify }},
            "vouched_at": {{ .date | jsonify }}
        }
    {{- end }}
    {{- end }}
    ]
}
```

I kept the required `<link rel="/human.json">` in my `layouts/partials/extend_head.html` file that gets included on *all* pages by my theme (contrary to how the linking of output formats work, which is why I went with `notAlternative: true` for that).

And to make it even easier to quickly add a new vouch, I also added a new task to my [Taskfile](https://taskfile.dev):

``` yaml
  add-vouch:
    desc: Adds a new vouch to human.json.
    vars:
      PAGE: '{{.CLI_ARGS}}'
      FILE: 'data/vouches.yaml'
      TODAY: '{{now | date "2006-01-02"}}'
    cmds:
      - |
        cat >> {{.FILE}} <<EOF
        - url: {{.PAGE}}
          date: "{{.TODAY}}"
        EOF
```

Now, vouching for a page[^2] is as easy as

```
task add-vouch -- https://example.com
```

[^1]: Targeting Hugo 0.156.0+
[^2]: Even from my phone thanks to [Termux](https://termux.dev/)
