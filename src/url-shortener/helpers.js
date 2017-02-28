const dns = require('dns');
const validator = require('validator');

const urlOptions = {
  protocols: ['http','https'],
  require_tld: true,
  require_protocol: true,
  require_host: true,
  require_valid_protocol: true,
  allow_underscores: true,
  host_whitelist: false,
  host_blacklist: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false
}

function validateUrl(url) {
  return new Promise((resolve, reject) => {

    if (!validator.isURL(url, urlOptions)) resolve({error: 'invalid URL'});

    const noHttpUrl = url.replace(/^http(s)?:\/\//, '');

    dns.lookup(noHttpUrl, (err, addr) => {
      if (err) resolve({error: 'invalid URL'});
      resolve(true);
    })
  });
}

module.exports = {
  validateUrl
}
