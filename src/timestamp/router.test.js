const expect = require('expect');
const { validateDate } = require('./validator');

describe('Date validator test', () => {

  describe('Natural dates', () => {

    it('Should parse 26 02 2017', () => {
      const res = validateDate('26 02 2017');
      expect(res).toBeAn('object');
      expect(res.unix).toBe(1488067200000);
    });

    it('Should parse 26-02-2017', () => {
      const res = validateDate('26-02-2017');
      expect(res).toBeAn('object');
      expect(res.unix).toBe(1488067200000);
    });

    it('Should parse 26-2-2017', () => {
      const res = validateDate('26-2-2017');
      expect(res).toBeAn('object');
      expect(res.unix).toBe(1488067200000);
    });

    it('Should parse 02-26-2017', () => {
      const res = validateDate('02-26-2017');
      expect(res).toBeAn('object');
      expect(res.unix).toBe(1488067200000);
    });

    it('Should parse 12-01-2017', () => {
      const res = validateDate('12-01-2017');
      expect(res).toBeAn('object');
      expect(res.unix).toBe(1484179200000);
    });
  });

  describe('Unix dates', () => {

    it('Should parse 1488067200000', () => {
      const res = validateDate(1488067200000);
      expect(res).toBeAn('object');
      expect(res.utc).toBe('Sun, 26 Feb 2017 00:00:00 GMT')
    });

    it('Should parse 55896587443000', () => {
      const res = validateDate(55896587443000);
      expect(res).toBeAn('object');
      expect(res.utc).toBe('Mon, 17 Apr 3741 05:50:43 GMT')
    });

    it('Should parse \'55896587443000\'', () => {
      const res = validateDate('55896587443000');
      expect(res).toBeAn('object');
      expect(res.utc).toBe('Mon, 17 Apr 3741 05:50:43 GMT')
    });

    it('Should parse -42', () => {
      const res = validateDate(-42);
      expect(res).toBeAn('object');
      expect(res.utc).toBe('Wed, 31 Dec 1969 23:59:59 GMT');
    });

    it('Should parse `-42`', () => {
      const res = validateDate('-42');
      expect(res).toBeAn('object');
      expect(res.utc).toBe('Wed, 31 Dec 1969 23:59:59 GMT');
    });
  });

  describe('Invalid inputs', () => {

    it('Should return error message on \'abc\'', () => {
      const res = validateDate('abc');
      expect(res).toBeAn('object');
      expect(res.error).toBe('Invalid Date');
    });

    it('Should return error message on empty input', () => {
      const res = validateDate();
      expect(res).toBeAn('object');
      expect(res.error).toBe('Invalid Date');
    });
  });
});
