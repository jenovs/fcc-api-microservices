const router = require('express').Router();
const fetch = require('node-fetch');
const { WEATHER_API_KEY } = process.env;

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

router.get('/:lat/:lon', (req, res) => {
  res.send([req.params.lat, req.params.lon]);
});

module.exports = router;
