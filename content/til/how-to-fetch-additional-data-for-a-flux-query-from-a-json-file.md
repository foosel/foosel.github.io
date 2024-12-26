---
title: "How to fetch additional data for a flux query from a json file"
date: 2024-12-26
tags:
- influx
- grafana
- datenzwerg
---

My buddy Romses is currently taking care of the [Datenzwerg deployment](https://datagnome.de) at 38c3, and like at every event where we deploy them I'm updating our page and [Grafana dashboard](https://grafana.datagnome.de) with the locations of the gnomes.

So far the latter was always quite annoying: We have only the names of the gnomes in our influx data, and adding the location/deployment status to the graph thus meant having something like this for every single graph:

```flux
import "strings"
import "dict"

locations = [
    "Bashful": "Uptime Bar",
    "Dopey": "c3cat",
    "Grumpy": "Späti",
    "Happy": "Kidspace",
    "Hefty": "HASS Assembly",
    "Moopsy": "Chaospost",
    "Kinky": "Eventphone",
    "Nerdy": "House of Tea",
    "Sleepy": "DDOS Bar",
    "Sneezy": "Wohnzimmer"
]

from(bucket: "datagnome")
  [...]
  |> map(fn: (r) => ({r with device: r.device + " (" + dict.get(dict: locations, key: r.device, default: "?") + ")"}))
```

Which of course means that I had to update this `locations` dict for every single panel, on every single deployment, at least twice (start and end of the event).

I finally decided I had to solve this differently and just now figured out how to keep the deployment info in [a JSON file on our git repo](https://github.com/romses/Datenzwerg/blob/main/docs/deployment.json) and then querying *that* from the graphs, instead of manually keeping the lookup data updated in more than one place:

```flux
import "strings"
import "dict"
import "http/requests"
import "experimental/json"

response = requests.get(url: "https://raw.githubusercontent.com/romses/Datenzwerg/refs/heads/main/docs/deployment.json")
data = json.parse(data: response.body)
locations = dict.fromList(pairs: data)

from(bucket: "datagnome")
  [...]
  |> map(fn: (r) => ({r with device: r.device + " (" + dict.get(dict: locations, key: r.device, default: "?") + ")"}))
```

So far seems to work well, and I'm very happy to be able to do this faster now (and also more easily from my phone, should I need to).

Next step: Figuring out how to use that JSON file to also keep the event box on the home page updated. But that's for another day :)
