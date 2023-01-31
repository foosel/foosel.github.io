---
title: "How to run Playwright on GitHub Actions"
date: 2023-01-31
tags:
- playwright
- github actions
- ci
---

Running Playwright on GitHub Actions is fairly straightforward at first glance, however it becomes a bit more tricky when you don't want to download the whole browser binary zoo on every single CI build. 

Looking around a bit on how to go about caching these, I came across various approaches listed in [this GitHub issue on the Playwright repo](https://github.com/microsoft/playwright/issues/7249). Below is the result of reading through most of them and figuring out what works best for me and my use case (OctoPrint's E2E tests, `npm` based test project).

These steps make sure to install Playwright, fetching the browser binaries from cache if possible, in any case installing the OS depencies, running the tests (replace `./path/to/tests` accordingly for your setup) and finally upload the generated report as artifact, regardless of whether the tests succeeded or not:

```yaml
# Run npm ci and get Playwright version
- name: 🏗 Prepare Playwright env
  working-directory: ./path/to/tests
  run: |
    npm ci
    PLAYWRIGHT_VERSION=$(npm ls --json @playwright/test | jq --raw-output '.dependencies["@playwright/test"].version')
    echo "PLAYWRIGHT_VERSION=$PLAYWRIGHT_VERSION" >> $GITHUB_ENV

# Cache browser binaries, cache key is based on Playwright version and OS
- name: 🧰 Cache Playwright browser binaries
  uses: actions/cache@v3
  id: playwright-cache
  with:
    path: "~/.cache/ms-playwright"
    key: "${{ runner.os }}-playwright-${{ env.PLAYWRIGHT_VERSION }}"
    restore-keys: |
      ${{ runner.os }}-playwright-

# Install browser binaries & OS dependencies if cache missed
- name: 🏗 Install Playwright browser binaries & OS dependencies
  if: steps.playwright-cache.outputs.cache-hit != 'true'
  working-directory: ./path/to/tests
  run: |
    npx playwright install --with-deps

# Install only the OS dependencies if cache hit
- name: 🏗 Install Playwright OS dependencies
  if: steps.playwright-cache.outputs.cache-hit == 'true'
  working-directory: ./path/to/tests
  run: |
    npx playwright install-deps

- name: 🚀 Run Playwright
  working-directory: ./path/to/tests
  run: |
    npx playwright test

- name: ⬆ Upload report
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: playwright-report
    path: tests/playwright/playwright-report
```
