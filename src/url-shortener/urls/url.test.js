const expect = require('expect');
const shortId = require('shortid');

const { seed, urlsList } = require('./../seed/seed');
const Url = require('./url.model');

const { findOrCreate, findByShortUrl } = require('./url.actions');

describe('Url tests', () => {

  beforeEach(done => {
    seed(done);
  });

  describe('findOrCreate tests', () => {
    const urls = [
      'http://www.example.com'
    ]

    it('Should save a url if does not exist and return saved data', (done) => {
      let savedUrl;

      findOrCreate(urls[0])
      .then((data) => {
        expect(data.url).toBe(urls[0]);
        expect(data.shortUrl).toBeA('string');
        savedUrl = data;
        return Url.find()
      })
      .then(data => {
        expect(data.length).toBe(3);
        expect(data[2].url).toBe(urls[0]);
        expect(data[2].url).toBe(savedUrl.url);
        expect(data[2].shortUrl).toBeA('string');
        expect(data[2].shortUrl).toBe(savedUrl.shortUrl);
        done();
      })
      .catch(e => done(e));
    });

    it('should not save duplicate url, but return data from db', (done) => {

      findOrCreate(urlsList[0].url)
      .then(data => {
        expect(data.url).toBe(urlsList[0].url);
        expect(data.shortUrl).toBeA('string');
        return Url.find()
      })
      .then(data => {
        expect(data.length).toBe(2);
        expect(data[0].url).toBe(urlsList[0].url);
        expect(data[1].url).toBe(urlsList[1].url);
        done();
      })
      .catch(e => done(e))
    });
  });

  describe('findByShortUrl tests', () => {

    it('Should find original_url from short_url', (done) => {
      findByShortUrl(urlsList[1].shortUrl)
      .then(data => {
        expect(data.url).toBe(urlsList[1].url);
        done();
      })
      .catch(e => done(e));
    });

    it('Should return error message if short_url is invalid', (done) => {
      findByShortUrl('123 abc')
      .then(data => {
        expect(data.error).toExist();
        done();
      })
      .catch(e => done(e));
    });

    it('Should return error message if short_url is not in db', (done) => {
      findByShortUrl(shortId.generate())
      .then(data => {
        expect(data.error).toExist();
        done();
      })
      .catch(e => done(e));
    });
  });

});
