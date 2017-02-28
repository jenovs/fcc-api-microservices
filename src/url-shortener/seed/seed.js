const { ObjectID } = require('mongodb');
const shortId = require('shortid');

const mongoose = require('./../../mongoose');
const Url = require('./../urls/url.model');

const shortUrl1 = shortId.generate();
const shortUrl2 = shortId.generate();

const url0Id = new ObjectID();
const url1Id = new ObjectID();
const url2Id = new ObjectID();
const url3Id = new ObjectID();

const urlsList = [
  {
    _id: url0Id,
    url: 'https://www.google.com',
    shortUrl: shortUrl1
  }, {
    _id: url1Id,
    url: 'https://www.youtube.com',
    shortUrl: shortUrl2
  }
];

function seed(done) {
  const { urls } = mongoose.connection.collections;

  urls.drop(() => {
    Url.insertMany(urlsList)
    .then((data) => {
      done();
    })
    .catch(e => console.log(e))
  });
}

module.exports = {
  seed,
  urlsList
}
