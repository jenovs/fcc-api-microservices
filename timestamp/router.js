const router = require('express').Router();
const moment = require('moment');

const { validateDate } = require('./validator');

router.get('/:date_string', (req, res) => {
  const str = req.params.date_string;
  res.send(validateDate(str));
});

router.get('/', (req, res) => {
  const current = moment.utc();
  const utc = current.format("ddd, DD MMM YYYY HH:mm:ss") + ' GMT';
  const unix = current.unix() * 1000;
  res.send({ utc, unix });
})

module.exports = router;
