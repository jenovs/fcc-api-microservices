const fetch = require('node-fetch');

const { WEATHER_API_KEY } = process.env;


function getWeather(lat, lon, lang) {
  let weatherUrl = `https://api.wunderground.com/api/${WEATHER_API_KEY}/conditions/lang:${lang}/q/${lat},${lon}.json`;
  let forecastUrl = `https://api.wunderground.com/api/${WEATHER_API_KEY}/forecast/lang:${lang}/q/${lat},${lon}.json`;
  return Promise.all([
    fetch(weatherUrl).then(res => res.json()),
    fetch(forecastUrl).then(res => res.json())
  ])
}

module.exports = {
  getWeather
}
