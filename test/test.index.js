'use strict';

const should = require('should');

const Haiku = require('../index.js');

describe('Haiku', () => {
  it('should return POS data for a sentence', (done) => {
    let haiku = new Haiku();
    let sentence = 'The cat jumps on the table';
    let results = {
      DT: { the: 1 },
      NN: { cat: 1, table: 2 },
      NNS: { jumps: 1 },
      IN: { on: 1 }
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
