#!/bin/bash
set -e

BASE="public"

[ -d "$BASE" ] || (echo "Page build is missing, please create that first through 'task build'" && exit -1)

pushd $BASE

  # Validate json files
  echo "Validating json files"
  for json in $(find . -iname "*.json" -type f); do
    echo "$json..."
    jq . "$json" 1> /dev/null
  done

  if command -v check-jsonschema >/dev/null 2>&1; then
    echo

    echo "Validating json files against known JSON schemata..."

    echo "./human.json..."
    check-jsonschema --schemafile https://codeberg.org/robida/human.json/raw/branch/main/schema/0.1.1.json human.json

    # jsonfeed
    for feed in $(find . -iname "feed.json" -type f); do
        echo "$feed..."
        check-jsonschema --schemafile https://raw.githubusercontent.com/sonicdoe/jsonfeed-schema/refs/heads/master/schema-v1.1.json "$feed"
    done
  fi

popd
