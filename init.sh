#!/bin/bash
sudo -s
node sdc/generation.js
mv sdc/sampleData/*.csv /var/lib/postgresql/precopy/
chmod +x sdc/insertion.sh
cp sdc/insertion.sh /var/lib/postgresql/precopy/
cd /var/lib/postgresql/precopy/
./insertion.sh
