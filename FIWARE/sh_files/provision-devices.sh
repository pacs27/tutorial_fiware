#!/bin/bash
#
#  curl commands to reload the data from the previous tutorial
#
#

set -e



if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
    # For instance, will be example_kaggle_key
    echo ''${API_KEY}' ${APP_EUI} ${APP_ID} ${TTN_PASSWORD}'
printf "⏳ Provisioning IoT devices "


# Provisioning a service Group IoT-Lora

curl --location --request POST 'http://localhost:4041/iot/services' \
--header 'Content-Type: application/json' \
--header 'fiware-service: rabanales' \
--header 'fiware-servicepath: /parcelaOlivar' \
--data-raw '{
      "services": [
     {
      "entity_type": "LoraDeviceGroup",
      "apikey": '${API_KEY}',
      "resource": '${APP_EUI}',
      "attributes": [
        {
          "object_id": "t1",
          "name": "temperature_1",
          "type": "Number"
        }
      ],
       "static_attributes": [
          {"name": "refParcel", "type": "Relationship","value": "urn:ngsi-ld:Parcel:001"}
       ],
      "internal_attributes": {
          "lorawan": {
            "application_server": {
              "host": "eu.thethings.network",
              "username": '${APP_ID}',
              "password": '${TTN_PASSWORD}',
              "provider": "TTN"
            },
            "app_eui": '${APP_EUI}',
            "application_id": '${APP_ID}',
            "application_key": '${APP_KEY}',
            "data_model": "application_server"
          }
      },
      "protocol": "LORAJSON"
    }
  ]
}'

echo -e " \033[1;32mdone\033[0m"

else
printf "Cant found .env file in IoT devices "

fi
# Provisioning a service group (Iot-ul)


# curl --location --request POST 'http://localhost:4041/iot/services' \
# --header 'Content-Type: application/json' \
# --header 'fiware-service: rabanales' \
# --header 'fiware-servicepath: /parcelaOlivar' \
# --data-raw '{
#  "services": [
#    {
#      "apikey":      "dcbjcdschdsbchjdsbcjs",
#      "cbroker":     "http://orion:1026",
#      "entity_type": "Pump",
#      "resource":    "/iot/d",
#      "protocol":    "PDI-IoTA-UltraLight",
#      "transport":   "HTTP",
#      "timezone":    "Europe/Madrid",
#      "commands": [ 
#         {"name": "start","type": "command"},
#         {"name": "stop","type": "command"}
#       ],
#       "attributes": [
#        { "object_id": "s", "name":"state", "type":"Text"}
#       ],
#       "static_attributes": [
#           {"name": "category", "type":"Text", "value": ["actuator","sensor"]},
#           {"name": "controlledProperty", "type": "Text", "value": "state"},
#           {"name": "function", "type": "Text", "value":["openClose", "eventNotification"]},
#           {"name": "supportedProtocol", "type": "Text", "value": ["ul20"]}
#       ]
#    },
#    {
#      "apikey":      "93i93iendjedjwke",
#      "cbroker":     "http://orion:1026",
#      "entity_type": "SoilHumidity",
#      "resource":    "/iot/d",
#      "protocol":    "PDI-IoTA-UltraLight",
#      "transport":   "HTTP",
#      "timezone":    "Europe/Madrid",
#       "attributes": [
#        { "object_id": "h", "name":"humidity", "type":"Number"}
#       ],
#       "static_attributes": [
#           {"name": "category", "type":"Text", "value": ["sensor"]},
#           {"name": "controlledProperty", "type": "Text", "value": "humidity"},
#           {"name": "supportedProtocol", "type": "Text", "value": ["ul20"]}
#       ]
#    }
#  ]
# }'

# # Provisioning the devices
# # echo -e " \033[1;32mdone\033[0m"

# curl --location --request POST 'http://localhost:4041/iot/devices' \
# --header 'Content-Type: application/json' \
# --header 'fiware-service: rabanales' \
# --header 'fiware-servicepath: /parcelaOlivar' \
# --data-raw '{
#  "devices": [
#     {
#       "device_id": "pump001",
#       "entity_name": "Pump:001",
#       "entity_type": "Pump",
#       "endpoint": "http://192.168.1.67:3090/pump001",
#       "static_attributes": [
#           {"name": "refParcel", "type": "Relationship","value": "urn:ngsi-ld:Parcel:001"}
#        ]
#     },
#     {
#       "device_id": "soilHumidity001",
#       "entity_name": "SoilHumidity:001",
#       "entity_type": "SoilHumidity",
#       "static_attributes": [
#           {"name": "refParcel", "type": "Relationship","value": "urn:ngsi-ld:Parcel:001"}
#        ]
#     }
#   ]
# }
# '

