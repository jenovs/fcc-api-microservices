const path = require('path');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const moment = require('moment');


const Search = require('./searches/search.model');

router.use(bodyParser.urlencoded({ extended: false }));

const {
  API_KEY,
  SE_ID
} = process.env;

router.get('/latest', (req, res) => {
  Search.find({}, '-_id term created').limit(10).sort('-created')
  .then(data => {
    if (!data) return res.send('No recent searches');

    data = data.map(i => {
      const s = {};
      s.search = i.term;
      const time = moment(i.created);
      s.time = time.format("ddd, DD MMM YYYY HH:mm:ss") + ' GMT';
      return s;
    })
    res.send(data);
  })
  .catch(e => console.log(e));
});

router.get('/', (req, res) => {
  if (!req.query.q) {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }

  const q = req.query.q;
  const offset = req.query.offset || 1;

  const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SE_ID}&q=${encodeURIComponent(q)}&searchType=image&start=${offset}`;
  fetch(url)
  .then(res => res.json())
  .then(json => {
    const newSearch = new Search({
      term: q,
      created: new Date().getTime()
    });
    newSearch.save();

    const items = json.items ? json.items : []
    const filtered = items.map(item => {
      return {
        url: item.link,
        snippet: item.snippet,
        thumbnail: item.image.thumbnailLink,
        context: item.image.contextLink
      }
    });

    res.send(filtered);
  })
  .catch(e => console.log(e));
});

module.exports = router;
