# README

## OAUTH2 TOKEN
1. GET OAUTH2 TOKEN = ```echo -n e6365d07-e666-4f09-b053-7a73e63ac5f3:83587e8c-4f4b-4255-b791-a4888c03156a | base64```

2. TOKEN: ```ZTYzNjVkMDctZTY2Ni00ZjA5LWIwNTMtN2E3M2U2M2FjNWYzOjgzNTg3ZThjLTRmNGItNDI1NS1iNzkxLWE0ODg4YzAzMTU2YQ==```

## PRELOAD MYSQL DATABASE

### Inside Docker

1. MYSQL_BACKUP = `mysqldump -u root -psecret idm > backup.sql`

### Outside Docker

2. SEND_FROM_MYSQL_CONTAINER = `docker cp db-mysql:/backup.sql /Users/pacopuig/Desktop/PLATFORMS/IRRIGATION_APP/FIWARE/mysql-data`

### Inside Database File

3. INSERT IN THE TOP OF THE DOCUMENT: `CREATE DATABASE idm; USE idm`
