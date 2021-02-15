#!/bin/bash
psql -U postgres -d erictnv -c "COPY users.user FROM '/var/lib/postgresql/erictnvData/users.csv' USING DELIMITERS ',' CSV HEADER"
echo "$x inserted"
for x in $(ls | grep listings)
do
  psql -U postgres -d erictnv -c "COPY listings.listing FROM '/var/lib/postgresql/erictnvData/$x' USING DELIMITERS ',' CSV HEADER"
  echo "$x inserted"
done
for x in $(ls | grep categories)
do
  psql -U postgres -d erictnv -c "COPY listings.categories FROM '/var/lib/postgresql/erictnvData/$x' USING DELIMITERS ',' CSV HEADER"
  echo "$x inserted"
done
for x in $(ls | grep ratings)
do
  psql -U postgres -d erictnv -c "COPY listings.ratings FROM '/var/lib/postgresql/erictnvData/$x' USING DELIMITERS ',' CSV HEADER"
  echo "$x inserted"
done
for x in $(ls | grep reviews)
do
  psql -U postgres -d erictnv -c "COPY users.review FROM '/var/lib/postgresql/erictnvData/$x' USING DELIMITERS ',' CSV HEADER"
  echo "$x inserted"
done
