---
title: "How to add JSON Feed support to Hugo"
date: 2023-01-29
tags:
- jsonfeed
- hugo
---

In order to add [JSON Feed 1.1 support](https://www.jsonfeed.org/) to [Hugo](https://gohugo.io) you need to first add a new `jsonfeed` output format in `config.yaml`:

```yaml
mediaTypes:
  application/feed+json:
    suffixes:
      - json

outputFormats:
  jsonfeed:
    mediaType: application/feed+json
    baseName: feed
    rel: alternate
    isPlainText: true
```

This adds a new media type `application/feed+json` with the extension `json` and creates a new output format `jsonfeed` rendering into that media type with a base name of `feed` (so `feed.json` as [recommended by the JSON Feed spec](https://www.jsonfeed.org/version/1.1/#discovery)). 

This then needs to be added to the outputs it should be generated for - on this page I've only added it to `section`s. Again, in `config.yaml`:

```yaml
outputs:
  home:
    - HTML
    - JSON
  section:
    - HTML
    - RSS
    - jsonfeed
```

Finally, a template needs to be created so that Hugo can actually render something. I've put this into `layouts/_default/list.jsonfeed.json` (following the expected naming scheme of `list.<outputFormat>.<extension>`):

```go-text-template
{{- $pctx := . -}}
{{- if .IsHome -}}{{ $pctx = site }}{{- end -}}
{{- $pages := slice -}}
{{- if or $.IsHome $.IsSection -}}
{{- $pages = $pctx.RegularPages -}}
{{- else -}}
{{- $pages = $pctx.Pages -}}
{{- end -}}
{{- $limit := site.Config.Services.RSS.Limit -}}
{{- if ge $limit 1 -}}
{{- $pages = $pages | first $limit -}}
{{- end -}}
{{- $title := "" }}
{{- if eq .Title .Site.Title }}
{{- $title = .Site.Title }}
{{- else }}
{{- with .Title }}
{{- $title = print . " on "}}
{{- end }}
{{- $title = print $title .Site.Title }}
{{- end }}
{
    "version": "https://jsonfeed.org/version/1.1",
    "title": {{ $title | jsonify }},
    "home_page_url": {{ .Permalink | jsonify }},
    {{- with  .OutputFormats.Get "jsonfeed" }}
    "feed_url": {{ .Permalink | jsonify  }},
    {{- end }}
    {{- if (or .Site.Params.author .Site.Params.author_url) }}
    "authors": [{
      {{- if .Site.Params.author }}
        "name": {{ .Site.Params.author | jsonify }},
      {{- end }}
      {{- if .Site.Params.author_url }}
        "url": {{ .Site.Params.author_url | jsonify }}
      {{- end }}
    }],
    {{- end }}
    {{- if $pages }}
    "items": [
        {{- range $index, $element := $pages }}
        {{- with $element }}
        {{- if $index }},{{end}} {
            "title": {{ .Title | jsonify }},
            "id": {{ .Permalink | jsonify }},
            "url": {{ .Permalink | jsonify }},
            {{- if .Site.Params.showFullTextinJSONFeed }}
            "summary": {{ with .Description }}{{ . | jsonify }}{{ else }}{{ .Summary | jsonify }}{{ end -}},
            "content_html": {{ .Content | jsonify }},
            {{- else }}
            "content_text": {{ with .Description }}{{ . | jsonify }}{{ else }}{{ .Summary | jsonify }}{{ end -}},
            {{- end }}
            {{- if .Params.cover.image }}
            {{- $cover := (.Resources.ByType "image").GetMatch (printf "*%s*" (.Params.cover.image)) }}
            {{- if $cover }}
            "image": {{ (path.Join .RelPermalink $cover) | absURL | jsonify }},
            {{- end }}
            {{- end }}
            "date_published": {{ .Date.Format "2006-01-02T15:04:05Z07:00" | jsonify }}
        }
        {{- end }}
        {{- end }}
    ]
    {{ end }}
}
```

By default, this generates a feed with summaries only. If you want a full content feed, set `params.showFullTextinJSONFeed` to `true` in `config.yaml`.

The relevant docs for custom media types, output formats and template locations can be found [here](https://gohugo.io/templates/output-formats/).

On [the Papermod theme](https://github.com/adityatelange/hugo-PaperMod) the above will automatically cause something like

```html
<link rel="alternate" type="application/feed+json" href="https://foosel.net/til/feed.json">
```

to be added to the `head` of the page, as needed for [discovery](https://www.jsonfeed.org/version/1.1/#discovery). In other themes you might have to do it yourself.

The result of all of this is something like [this](https://foosel.net/til/feed.json).