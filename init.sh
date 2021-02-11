#!/bin/bash
sudo -s
node sdc/generation.js
mv sdc/sampleData/*.csv /var/lib/postgresql/precopy/
chmod +x sdc/database/insertion.sh
cp sdc/database/insertion.sh /var/lib/postgresql/precopy/
cd /var/lib/postgresql/precopy/
./insertion.sh
