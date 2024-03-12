---
title: "How to quickly create a header modifying reverse proxy with mitmproxy"
date: 2024-03-12
tags:
- mitmproxy
- command line
- octoprint
---

I'm currently in the process of testing some changes on OctoPrint involving its automatic user login via request headers, and
for that needed to quickly set up a reverse proxy that would modify the headers of the requests going to the development server
for some quick testing. 

Specifically, I wanted a quick CLI tool that would allow me to set up a reverse proxy listening on port 5000, forwarding to 
`http://localhost:5000` while also setting the headers `X-Remote-User` to `remote` and `X-Remote-Host` to `localhost:5555`.

Enter [`mitmproxy`](https://mitmproxy.org/), or more specifically its `mitmdump` tool, which turned out to be a great tool for this job.

All I needed was to run the following command:

```bash
mitmdump --mode reverse:http://localhost:5000@5555 --modify-headers "/X-Remote-User/remote" --modify-headers "/X-Forwarded-Host/localhost:5555"
```

This does the following:

- `--mode reverse:http://localhost:5000@5555` sets up a reverse proxy listening on port 5555, forwarding to `http://localhost:5000`
- `--modify-headers "/X-Remote-User/remote"` sets the `X-Remote-User` header to `remote`
- `--modify-headers "/X-Forwarded-Host/localhost:5555"` sets the `X-Forwarded-Host` header to `localhost:5555`

With that the [reverse proxy test page in OctoPrint](https://community.octoprint.org/t/reverse-proxy-configuration-examples/1107) 
turned all green and I could test my changes without having to set up an actual reverse proxy in front of the development server.
