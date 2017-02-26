const moment = require('moment');

const formats = [
  'D-M-Y',
  'D M Y',
  'M-D-Y',
  'M D Y',
  'Y-M-D',
  'Y M D'
];

function validateDate(date) {
  let utc, unix;
  utc = moment.utc(date, formats, true);

  if (utc.isValid()) {
    unix = utc.unix() * 1000;
    utc = utc.format("ddd, DD MMM YYYY HH:mm:ss") + ' GMT'
    return { utc, unix }
  }

  if (isNaN(date)) return {"error": "Invalid Date"};

  utc = moment.utc(date);

  if (utc.isValid()) {
    unix = +date;
    utc = utc.format("ddd, DD MMM YYYY HH:mm:ss") + ' GMT'
    return { utc, unix }
  }

  return {"error": "Invalid Date"};
}

module.exports = {
  validateDate
}
