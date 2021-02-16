#!/bin/bash
#
#  curl commands to reload the data from the previous tutorial
#
#

set -e





printf "⏳ Creating quantumleap subcription "

# Subcription to sensor entitie

curl --location --request POST 'http://localhost:1026/v2/subscriptions/' \
--header 'Content-Type: application/json' \
--header 'fiware-service: rabanales' \
--header 'fiware-servicepath: /parcelaOlivar' \
--data-raw '{
  "description": "Notify QuantumLeap of count changes of any Humidity change in  Sensor",
  "subject": {
    "entities": [
      {
        "idPattern": "SoilHumidity.*"
      }
    ],
    "condition": {
      "attrs": [
        "humidity"
      ]
    }
  },
  "notification": {
    "http": {
      "url": "http://quantumleap:8668/v2/notify"
    },
    "attrs": [
      "humidity"
    ],
    "metadata": ["dateCreated", "dateModified"]
  },
  "throttling": 1
}'


echo -e " \033[1;32mdone\033[0m"