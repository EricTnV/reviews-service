#!/bin/bash
psql -U postgres -d erictnv -c "COPY reviews.users FROM '/var/lib/postgresql/erictnvData/users.csv' USING DELIMITERS ',' CSV HEADER"
echo "users inserted"
for x in $(ls | grep listings)
do
  psql -U postgres -d erictnv -c "COPY reviews.listings FROM '/var/lib/postgresql/erictnvData/$x' USING DELIMITERS ',' CSV HEADER"
  echo "$x inserted"
done
for x in $(ls | grep ratings)
do
  psql -U postgres -d erictnv -c "COPY reviews.ratings FROM '/var/lib/postgresql/erictnvData/$x' USING DELIMITERS ',' CSV HEADER"
  echo "$x inserted"
done
for x in $(ls | grep categories)
do
  psql -U postgres -d erictnv -c "COPY reviews.categories FROM '/var/lib/postgresql/erictnvData/$x' USING DELIMITERS ',' CSV HEADER"
  echo "$x inserted"
done
for x in $(ls | grep reviews)
do
  psql -U postgres -d erictnv -c "COPY reviews.reviews FROM '/var/lib/postgresql/erictnvData/$x' USING DELIMITERS ',' CSV HEADER"
  echo "$x inserted"
  sleep 20s
done
