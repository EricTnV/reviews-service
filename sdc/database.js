/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client();
client.connect();

const res = client.query('SELECT $1::text as message', ['Hello world!']);

res.then((results) => console.log(results.rows[0].message)) // Hello world!
  .catch((err) => console.log(err));

client.end();
