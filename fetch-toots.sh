#!/bin/bash

BASE="assets/toots"

while read -r url; do
  host=$(echo $url | cut -d"/" -f3)
  status=$(echo $url | cut -d"/" -f5)

  mkdir -p "$BASE/$host"
  statusfile="$BASE/$host/$status.json"
  if [ ! -f "$statusfile" ]; then
    echo "Status $status@$host not fetched yet, fetching..."
    curl -s "https://$host/api/v1/statuses/$status" > "$statusfile"
  fi
done < <(grep -r -oh "{{< toot \"[^\"]*\" >}}" content/ | cut -d" " -f 3 | cut -d'"' -f 2)
