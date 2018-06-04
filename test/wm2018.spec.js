const expect = require('chai').expect;
const vocable = require('../src/vocable');

describe('vocable', () => {

    it('gives the actual new vocables', (done) => {
        vocable.getActual().then(result => {
          const entries = result.entries();
          let next;
          while((next = entries.next(), !next.done)) {
            console.log(next.value);
          }
          expect(result).deep.equals('');
          done();
        });
    });
});