# README

## OAUTH2 TOKEN
1. GET OAUTH2 TOKEN = ```echo -n 243f223b-7c0e-4e8f-af4a-bb079e54ec76:61a05eda-022a-4310-8866-cf0cec0698ff| base64```
2. Get the token in this URL: [base64](https://v2.cryptii.com/text/base64)

2. TOKEN: ```MjQzZjIyM2ItN2MwZS00ZThmLWFmNGEtYmIwNzllNTRlYzc2OjYxYTA1ZWRhLTAyMmEtNDMxMC04ODY2LWNmMGNlYzA2OThmZg==```

## PRELOAD MYSQL DATABASE

### Inside Docker

1. MYSQL_BACKUP = `mysqldump -u root -psecret idm > backup.sql`

### Outside Docker

2. SEND_FROM_MYSQL_CONTAINER = `docker cp db-mysql:/backup.sql /Users/pacopuig/Desktop/PLATFORMS/IRRIGATION_APP/FIWARE/mysql-data`

### Inside Database File

3. INSERT IN THE TOP OF THE DOCUMENT: `CREATE DATABASE idm; USE idm`



curl -iX POST \
  'http://localhost:3005/oauth2/token' \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic LW4gMjQzZjIyM2ItN2MwZS00ZThmLWFmNGEtYmIwNzllNTRlYzc2OjYxYTA1ZWRhLTAyMmEtNDMxMC04ODY2LWNmMGNlYzA2OThmZgo=' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data "username=fiwareadmin@test.com&password=test&grant_type=password"