const router = require('express').Router();
const bodyParser = require('body-parser');

const { getWeather } = require('./api');

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

router.use(bodyParser.json());

router.post('/', (req, res) => {
  const { lat, lon, lang } = req.body;

  getWeather(lat, lon, lang)
  .then(([weather, forecast]) => {
    res.send({
      weather: weather.current_observation,
      forecast: forecast.forecast})
  })
  .catch(e => {
    console.log(e);
    res.status(400).send();
  });
});

module.exports = router;
