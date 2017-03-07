const router = require('express').Router();
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const supportedLangs = [
  'hy', 'sq', 'ar', 'bg', 'ca', 'cn', 'hr', 'cs', 'da', 'nl',
  'et', 'ph', 'fi', 'fr', 'ka', 'de', 'el', 'he', 'hu', 'id',
  'it', 'lv', 'lt', 'mk', 'ms', 'no', 'pl', 'pt', 'ro', 'ru',
  'sr', 'sk', 'sl', 'es', 'sv', 'th', 'tr', 'uk', 'vi'
];

function scrapeText(html) {
  let $ = cheerio.load(html);
  const text = $('div#Panes').text().split('\n');
  const trHeader = $('div#Translation h3');
  const trText = $('div#Translation p');

  const translations = {}

  trHeader.each((i, el) => {
    translations[i] = {};
    translations[i].title = el.children[0].data
  });

  trText.each((i, el) => {
    translations[i].text = el.children[0].data
  });

  const description = {
    what: {
      title: text[1],
      text: text[2]
    },
    why: {
      title: text[4],
      text: text[5]
    },
    where: {
      title: text[7],
      text: text[8]
    }
  };

  return {description, translations};
}

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

router.get('/:lang', (req, res) => {
  let lang = req.params.lang;
  if (!~supportedLangs.indexOf(lang)) lang = 'en';
  fetch(`http://${lang}.lipsum.com`)
    .then(res => res.text())
    .then(text => res.send(scrapeText(text)))
    .catch(e => console.log(e));
});

module.exports = router;
