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

  if command -v check-jsonschema >/dev/null 2>&1; then
    echo
    echo "Validating human.json against JSON schema..."
    check-jsonschema --schemafile https://codeberg.org/robida/human.json/raw/branch/main/schema/0.1.1.json human.json
  fi

popd
