const path = require('path');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const { validateUrl } = require('./helpers');
const { findOrCreate, findByShortUrl } = require('./urls/url.actions');

router.use(bodyParser.urlencoded({ extended: false }));

router.use(express.static(path.join(__dirname, 'public')));

router.post('/new', (req, res) => {

  const url = req.body.url;

  validateUrl(url)
  .then(data => {
    if (data.error) throw data;

    return findOrCreate(url)
  })
  .then(url => {
    res.send({
      original_url: url.url,
      short_url: url.shortUrl
    })
  })
  .catch(e => {
    if (e.error) return res.status(400).send(e);
    if (e.url && e.shortUrl) return res.status(200).send({original_url: e.url, short_url: e.shortUrl});
    res.status(400).send()
  });
});

router.get('/:short', (req, res) => {
  findByShortUrl(req.params.short)
  .then(data => {
    if (data.error) return res.send(data);
    res.redirect(data.url);
  })
});

module.exports = router;
