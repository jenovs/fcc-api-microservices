const shortId = require('shortid');

const Url = require('./url.model');

function findOrCreate(url) {
  return Url.findOne({ url })
  .then(data => {
    if (data) return data;

    const newUrl = new Url({
      url,
      shortUrl: shortId.generate()
    });

    return newUrl.save();
  })
}

function findByShortUrl(shortUrl) {
  if (!shortId.isValid(shortUrl)) return Promise.resolve({error: 'Invalid short URL'});
  return Url.findOne({ shortUrl })
  .then(data => {
    if (!data) return {error: 'Invalid short URL'}
    return data;
  })
}

module.exports = {
  findOrCreate,
  findByShortUrl
}
