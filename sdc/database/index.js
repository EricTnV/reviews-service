const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'erictnv',
  user: 'ubuntu',
  password: 'ubuntu',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
