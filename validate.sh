#!/bin/bash
set -e

BASE="public"

[ -d "$BASE" ] || (echo "Page build is missing, please create that first through 'task build'" && exit -1)

pushd $BASE

  # Validate json files
  for json in $(find . -iname "*.json" -type f); do
    echo "Validating $json..."
    jq . "$json" 1> /dev/null
  done

popd
