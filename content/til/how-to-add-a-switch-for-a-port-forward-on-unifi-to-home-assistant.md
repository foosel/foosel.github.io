---
title: "How to add a switch for a port forward on Unifi to Home Assistant"
date: 2023-02-17
tags:
- home assistant
- unifi
- port forwarding
- bash
---

This is admittedly something I did not learn today but rather learned and adapted a couple years ago [from this post on the Home Assistant forum](https://community.home-assistant.io/t/automating-unifi-port-forwarding-based-upon-presence-detection/168185), but I just had to use it again today and so I figured I'd write it down with all the bells and whistles just in case I ever need this information again - or anyone else does.

First of all, in your unifi controller you should create a new user that Home Assistant will act as to manage your port forward(s) for you. So, log into the controller, go into Settings > Administrators and add a new Administrator user[^1].

Then create your port forward in Settings > Routing & Firewall > Port Forwarding. Take note of the id of the port forward you have created - you can find it by clicking edit on it again, it will be the number at the end of the URL of the edit page. E.g. if the URL looks like this: `https://my.unifi.controller/manage/site/default/settings/portforward/edit/1234567890` then this is the id of the port forward: `1234567890`.

Next, copy this shell script to `/config/scripts/unifi.sh` in your Home Assistant. Make sure to adjust `https://my.unifi.controller` (and, if necessary, the site `default`) to your own values.

```bash
#!/bin/sh

set -e

# based on https://community.home-assistant.io/t/automating-unifi-port-forwarding-based-upon-presence-detection/168185

cookie=$(mktemp)
headers=$(mktemp)
curl_cmd="curl --silent --cookie ${cookie} --cookie-jar ${cookie} -D ${headers} --insecure"

BASEURL="https://my.unifi.controller"
SITE="default"

auth() {
  USERNAME=$1
  PASSWORD=$2

  # authenticate against unifi controller
  ${curl_cmd} --output /dev/null -d "{\"username\":\"$USERNAME\", \"password\":\"$PASSWORD\"}" $BASEURL/api/login

  # grab the `x-csrf-token` and strip the newline (added when upgraded to controller 6.1.26)
  csrf="$(awk -v FS=': ' '/^x-csrf-token/{print $2}' "${headers}" | tr -d '\r')"
  echo $csrf
}

portfwd() {
  USERNAME=$1
  PASSWORD=$2
  FORWARD_ID=$3
  FORWARD_ENABLED=$4

  # authenticate against unifi controller
  csrf=$(auth $USERNAME $PASSWORD)

  # enable/disable firewall rule
  body=$(${curl_cmd} -X GET $BASEURL/api/s/default/rest/portforward/$FORWARD_ID | jq '.data[0] | .enabled='$FORWARD_ENABLED'')
  ${curl_cmd} -X PUT $BASEURL/api/s/default/rest/portforward/$FORWARD_ID -H "Content-Type: application/json" -H "x-csrf-token: ${csrf}" -d @<(echo "$body")
}

isportfwd() {
  USERNAME=$1
  PASSWORD=$2
  FORWARD_ID=$3

  # authenticate against unifi controller
  csrf=$(auth $USERNAME $PASSWORD)

  ${curl_cmd} -X GET $BASEURL/api/s/default/rest/portforward/$FORWARD_ID | jq '.data[0].enabled'
}

"$@"
```

Now, let's imagine you want to add a switch for an SFTP port forward that you've just created. Then, in your `secrets.yaml` file, add the following:

```yaml
unifi_forward_sftp_check: '/bin/bash /config/scripts/unifi.sh isportfwd <user> <password> <forward_id>'
unifi_forward_sftp_enable: '/bin/bash /config/scripts/unifi.sh portfwd <user> <password> <forward_id> true'
unifi_forward_sftp_disable: '/bin/bash /config/scripts/unifi.sh portfwd <user> <password> <forward_id> false'
```

Replace `<user>`, `<password>` and `<forward_id>` with the login credentials and id of the forward you just created.

Next, add a command line switch definition to your `configuration.yaml` (or in my case to my `packages/network.yaml` file):

```yaml
switch:
  - platform: command_line
    switches: 
      sftp_port_forward:
        friendly_name: "SFTP Port Forward"
        command_state: !secret unifi_forward_sftp_check
        command_on: !secret unifi_forward_sftp_enable
        command_off: !secret unifi_forward_sftp_disable
        value_template: '{{ bool(value, false) }}'
```

Throw that somewhere on your dashboard, or alternatively tie it into some automation, and you're good to go!

[^1]: Maybe a regular user suffices as well, I honestly can't remember, but I'm using an admin user here.
