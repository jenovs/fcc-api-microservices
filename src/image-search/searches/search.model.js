const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const SearchSchema = new Schema({
  term: String,
  created: Number
});

module.exports = mongoose.model('search', SearchSchema);
