#!/bin/bash

set -e

printf "⏳ Loading context data "

# Create a Parcel entitie
curl --location --request POST 'http://localhost:1026/v2/entities' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "id": "urn:ngsi-ld:Parcel:001",
    "type": "Parcel",
    "crop": {
        "type": "text",
        "value": "olivar superintensivo",
        "metadata":{
            "verified":{
                "value": true,
                "type": "Boolean"
            }
        }
    },
    "location": {
        "type": "geo:json",
        "value": {
             "type": "Point",
             "coordinates": [37.9350782898407, -4.716517363374405]
        }
    },
    "name": {
        "type": "Text",
        "value": "Parcela Rabanales Olivar"
    }
}'

echo -e " \033[1;32mdone\033[0m"