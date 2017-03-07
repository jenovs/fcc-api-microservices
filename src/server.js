require('./config/config');

const path = require('path');
const express = require('express');

const mongoose = require('./mongoose');

const fileUpload = require('./file-upload/router');
const imagesearch = require('./image-search/router');
const timestamp = require('./timestamp/router');
const whoami = require('./header-parser/router');
const shorturl = require('./url-shortener/router');
const lipsum = require('./lipsum/router');

const app = express();

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname + '/public')));

const { PORT } = process.env;

app.use('/api/filedata', fileUpload);

app.use('/api/timestamp', timestamp);

app.use('/api/whoami', whoami);

app.use('/api/shorturl', shorturl);

app.use('/api/imagesearch', imagesearch);

app.use('/api/lipsum', lipsum);

app.get('*', (req, res) => {
  res.send('Hello!')
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
