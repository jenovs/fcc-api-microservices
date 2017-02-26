const express = require('express');

const timestamp = require('./timestamp/router');

const app = express();

app.use('/api/timestamp', timestamp);

app.get('*', (req, res) => {
  res.send('Hello from aws!')
});

app.listen(3001, () => {
  console.log('Server started on port 3001...');
});
