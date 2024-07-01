---
title: "How to check for cloud IPs in nginx"
date: 2024-07-01
tags:
- nginx
- bash
---

I'm currently busy mitigating a [stats manipulation on OctoPrint](https://octoprint.org/blog/2024/06/28/stats-manipulation/), and one of the steps I'm taking is blocking off several cloud options from accessing the tracking endpoint - and *only* that.

Since we are talking about several thousand of IPs here in at least 1.5k of CIDR ranges, I was looking for the best way to do that that wouldn't cause a lot of performance impact - the tracking server needs to be fast. 

A list of all CIDR ranges with `deny` turned out to not work thanks to my endpoint definition in nginx using `return` statements, and those are apparently evaluated before `allow` and `deny` statements. But then I got the hint to look at the [`geo` module](https://nginx.org/en/docs/http/ngx_http_geo_module.html) and with that it was easy to build a map of IP ranges that should be matched and just combining that with an `if`. 

For a first test I created a converter for [this list of IP ranges](https://github.com/PodderApps/ipcat), filtering for the really big players: 

``` bash
#!/bin/bash

URL=https://raw.githubusercontent.com/PodderApps/ipcat/main/datacenters.csv

if [ $1 != "" ]; then
	DATA=$(curl -s $URL | grep -E "$1")
else
	DATA=$(curl -s $URL)
fi


echo 'geo $is_cloud {'
echo '    default 0;'

while IFS= read -r line; do
	start_ip=$(echo $line | cut -d, -f1)
	end_ip=$(echo $line | cut -d, -f2)
	comment=$(echo $line | cut -d, -f3)

	script="import ipaddress; start_ip=ipaddress.IPv4Address(\"$start_ip\"); end_ip=ipaddress.IPv4Address(\"$end_ip\"); print(next(ipaddress.summarize_address_range(start_ip, end_ip)))"
	cidr=$(python3 -c "$script")

	echo "    $cidr 1; # $comment"
done <<< "$DATA"

echo '}'

```

Calling this like this then created a `conf` file:

``` prompt
$ sudo ./generate_is_cloud_map "AWS|DigitalOcean|Google" > /etc/nginx/snippets/is-cloud.conf
$ cat /etc/nginx/snippets/ip-cloud.conf
geo $is_cloud {
    default 0;
    3.0.0.0/15; # Amazon AWS
    # ...
}
```

which I then could use in my nginx `location` config through an include and an `if` statement: 

``` nginx
include snippets/is-cloud.conf;

# ...

server {
    location /mylocation {
        if ($is_cloud = 1) {
            return 403;
        }
        # ...
    }
}
```

For now this seems to work. I'm going to give this a day or so and then look into further IP sources and also blocking off the IPv6 ranges.
