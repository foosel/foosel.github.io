---
title: "How to force paperless-ngx to consume signed PDFs"
date: 2023-12-06
tags: 
- paperless
- paperless-ngx
- docker
---

I use [paperless-ngx]() to manage my documents, together with some rules that automaticaly
ingest PDFs from my mail boxes. However, I noticed that a recently received invoice from AWS
was not ingested as expected. Looking at the logs I found this error message for it:

``` text
invoice.pdf: Error occurred while consuming document invoice.pdf: DigitalSignatureError: Input PDF has a digital signature. OCR would alter the document,
invalidating the signature.
```

I don't know if a software update brought this refusal to run OCR on signed PDFs, or if AWS
simply so long didn't send me signed PDFs, but I needed to find a way to force paperless to
ingest signed things as well as having all of that stuff stored in paperless is a vital part 
of my accounting workflow.

A quick search for the error message brought me to 
[this discussion on the paperless-ngx GitHub repository](https://github.com/paperless-ngx/paperless-ngx/discussions/4047) 
and therein I also found the [solution](https://github.com/paperless-ngx/paperless-ngx/discussions/4047#discussioncomment-7019544), 
which is to set the `PAPERLESS_OCR_USER_ARGS` config option to 
`{"invalidate_digital_signatures": true}`.

As I run paperless via Docker I needed to add the following to the `environment` section in my paperless 
`docker-compose.yml`:

``` yaml
services:
  # ...
  paperless:
    # ...
    environment:
      # ...
      PAPERLESS_OCR_USER_ARGS: '{"invalidate_digital_signatures": true}'
      # ...
```

And after adding this and a quick `docker compose up -d` things seem to now work as expected 
again. Yay!

