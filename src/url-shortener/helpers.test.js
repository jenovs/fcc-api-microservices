const expect = require('expect');
const { validateUrl } = require('./helpers');

describe('Test url validator', () => {

  it('should resolve valid url', (done) => {
    validateUrl('http://www.google.com')
    .then(res => {
      expect(res).toBe(true);
      done();
    })
    .catch(e => done(e));
  });

  it('should reject invalid url', (done) => {
    validateUrl('htp://www.google.com')
    .then(res => {
      expect(res.error).toExist();
      done();
    })
    .catch(e => done(e));
  })
});
