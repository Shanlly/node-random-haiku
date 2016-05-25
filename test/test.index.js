'use strict';

const should = require('should');

const Haiku = require('../index.js');

describe('Haiku', () => {
  it('should return POS data for a sentence', (done) => {
    let haiku = new Haiku();
    let sentence = 'The cat jumps on the table';
    let results = {
      DT: { the: true },
      NN: { cat: true, table: true },
      NNS: { jumps: true },
      IN: { on: true }
    };

    haiku.addToDataset(sentence, (err, resp) => {
      if (err) {
        throw err;
      }

      resp.should.deepEqual(results);
      done();
    });
  });
});
