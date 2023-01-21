---
title: How to determine an RPi kernel version and build without booting it
date: 2022-06-16
tags:
- kernel
- bash
- rpi
---

To figure out the kernel version and build without booting it, e.g. to install matching device drivers during an automated image build in something like [CustoPiZer](https://github.com/OctoPrint/CustoPiZer), use something like this:

``` bash
function version_and_build_for_kernelimg() {
    kernelimg=$1

    # uncompressed kernel?
    output=$(strings $kernelimg | grep 'Linux version' || echo)

    if [ -z "$output" ]; then
        # compressed kernel, needs more work, see https://raspberrypi.stackexchange.com/a/108107
        pos=$(LC_ALL=C grep -P -a -b -m 1 --only-matching '\x1f\x8b\x08' $kernelimg | cut -f 1 -d :)
        dd if=$kernelimg of=kernel.gz skip=$pos iflag=skip_bytes
        output=$(gzip --decompress --stdout kernel.gz | strings | grep 'Linux version' || echo)
    fi

    version=$(echo $output | awk '{print $3}' | tr -d '+')
    build=$(echo $output | awk -F"#" '{print $NF}' | awk '{print $1}')

    if [[ -n "$version" && -n "$build" ]]; then
        echo "Version: $kernel"
        echo "Build: $build"
    else
        echo
        echo "Cannot determine kernel version and build number for $kernelimg"
    fi
}
```

Note that this has only been tested with kernels on RaspberryPi OS images, YMMV.
