require('./config/config');

const express = require('express');

const mongoose = require('./mongoose');

const timestamp = require('./timestamp/router');
const whoami = require('./header-parser/router');
const shorturl = require('./url-shortener/router');

const app = express();

const { PORT } = process.env;

app.use('/api/timestamp', timestamp);

app.use('/api/whoami', whoami);

app.use('/api/shorturl', shorturl);

app.get('*', (req, res) => {
  res.send('Hello!')
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
