/* eslint-disable no-console */
const express = require('express');
/* const compression = require('compression'); */
const path = require('path');

const app = express();
const port = process.env.PORT || 3002;
const PUBLIC_DIR = path.resolve(__dirname, '..', '..', 'client', 'dist');
const router = require('./router.js');

/* app.use(compression()); */
app.use(express.json());
app.use(express.static(PUBLIC_DIR));
/* app.use((req, res, next) => {
  console.log(`${req.method} on locahost:${port} for ${req.path}`);
  next();
}); */
app.use('/api/rooms/', router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
