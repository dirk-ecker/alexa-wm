const expect = require('chai').expect;
const wm2018 = require('../src/wm2018');

describe('wm2018', () => {

    beforeEach(() => {
      wm2018.initialise()
    })

    it('finds the matches for a specific date', (done) => {
        wm2018.getWhoPlays('2018-06-15').then(result => {
          expect(result.length).equals(3)
          done()
        })
    })

    it('finds the matches for today if no date is given', (done) => {
      wm2018.getWhoPlays().then(result => {
        expect(result.length).equals(0)
        done()
      })
    })

    it('finds the matches for a given team', (done) => {
      wm2018.getWhenPlays('Mexiko').then(result => {
        expect(result.length).equals(1)
        done()
      })
    })

})