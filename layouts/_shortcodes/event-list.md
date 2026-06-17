{{- if .Page.Params.events }}
{{- $currentYear := "" -}}
{{- range sort .Page.Params.events "date" "desc" -}}
{{- $year := dateFormat "2006" .date }}
{{- $day := dateFormat "2" .date }}
{{- $type := "🤷‍♀️" }}
{{- with (eq .type "talk")}}{{- $type = "👩‍🏫 " }}{{- end }}
{{- with (eq .type "article")}}{{- $type = "📰 " }}{{- end }}
{{- with (eq .type "podcast")}}{{- $type = "🎤 " }}{{- end }}
{{- with (eq .type "video")}}{{- $type = "📺 " }}{{- end }}
{{- $suffix := "th" }}
{{- if or (eq $day "1") (eq $day "21") (eq $day "31")}}{{- $suffix = "st" }}
{{- else if or (eq $day "2") (eq $day "22") }}{{- $suffix = "nd" }}
{{- else if or (eq $day "3") (eq $day "23") }}{{- $suffix = "rd" }}
{{- end }}
{{- if ne $year $currentYear }}

{{$year}}

{{- $currentYear = $year }}
:  - {{$type}}{{- if .link }}[{{.title}}]({{.link}}){{- else }}{{.title}}{{- end }}
{{- else }}
   - {{$type}}{{- if .link }}[{{.title}}]({{.link}}){{- else }}{{.title}}{{- end }}
{{- end }}

     ({{dateFormat "January" .date}} {{$day}}{{$suffix}} {{$year}})
     {{- if .content }}

     {{.content}}
     {{- end }}
{{- end }}
{{- end }}
