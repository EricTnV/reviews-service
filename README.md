# reviews-service

Everything I've worked on is inside the sdc file; and the rest is legacy. The following are the basic setup steps (assuming you've already installed the required dependecies).

On my machine, this looks like:

`~SERVICE_ROOT_DIR: node sdc/generation.js`

This will take some time; unless you modify it, you are going to generate roughly 131 million records in 401 csv files. Feel free to edit the variables at the top of generation.js for a quicker seed.

While the above is running, go ahead and run the following command to create the review component's schema and associated tables:

psql

With my postgres configuration skills still green, I found it easiest to move the files to the postgres directory to sidestep any permissions issues. For me, that's three instructions with root privileges:

`sudo mv sdc/sampleData/*.csv /var/lib/postgresql/<project_name>`
`sudo chmod +x insertion.sh`
and
`sudo cp sdc/insertion.sh /var/lib/postgresql/<project_name>`

The second and third lines make `insertion.sh` executable and relocate `insertion.sh` to co-locate with the csv files, respectively; once again this approach sidesteps some directory access issues with a default user access postgres configuration.

Now you're ready to run:

`./insertion.sh`

CSV imports should self-report their progress.
