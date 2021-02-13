#!/bin/bash
for x in $(ls | grep listings)
do
  psql -U postgres -d erictnv -c "COPY listings.reviews FROM '/var/lib/postgresql/erictnvData/$x' USING DELIMITERS '|' CSV HEADER"
  echo "$x inserted"
done
