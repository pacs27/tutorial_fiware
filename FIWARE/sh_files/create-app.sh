curl --location --request POST 'http://localhost:3005/v1/auth/tokens' \
--header 'Content-Type: application/json' \
--header 'Cookie: session=eyJyZWRpciI6Ii8ifQ==; session.sig=zmEn6Plpavppt0UFlORax8D_EYM' \
--data-raw '{
  "name": "fiwareadmin@test.com",
  "password": "test"
}'