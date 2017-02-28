const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UrlSchema = new Schema({
  url: {
    type: String,
    unique: true,
    index: true
  },
  shortUrl: String
});

module.exports = mongoose.model('url', UrlSchema);
