'use strict';

const should = require('should');

const Haiku = require('../index.js');

describe('Haiku', () => {
  it('should return POS data for a sentence', (done) => {
    let haiku = new Haiku();
    let sentence = 'The furry cat jumps on the table';
    let results = {
      DT: { the: { word: 'the', count: 1 }},
      NN: { cat: { word: 'cat', count: 1 }, table: { word: 'table', count: 2 }},
      NNS: { jumps: { word: 'jumps', count: 1 }},
      IN: { on: { word: 'on', count: 1 }},
      JJ: { furry: { word: 'furry', count: 2 }}
    };

    haiku.addToDataset(sentence, (err, resp) => {
      if (err) {
        throw err;
      }

      resp.should.deepEqual(results);
      done();
    });
  });

  it('should return POS data for a sentence', (done) => {
    let haiku = new Haiku();
    let sentence = 'appears doomed seems the it awful nerd alone runs walks smart dumb chair ' +
                   'sings considered a we seems appears they always tired amused ' +
                   'sadness joy shakes knows glitter blue green quickly superb she he ' +
                   'them bike dog ' +
                   'briskly firmly swiftly really writing laughing eating dancing ' +
                   'forever never happy sad sleeping curious bored cat person it is';

    haiku.addToDataset(sentence, (err, resp) => {
      if (err) {
        throw err;
      }

      let result = haiku.generate();

      should.exist(result);
      result.length.should.equal(3);
      console.log(result)
      done();
    });
  });

  it('should delete an unwanted word', (done) => {
    let haiku = new Haiku();
    let sentence = 'appears doomed';

    haiku.addToDataset(sentence, (err, resp) => {
      let result = { VBZ: { appears: { word: 'appears', count: 2 } },
          VBN: { doomed: { word: 'doomed', count: 1 } } };

      haiku.getData().should.deepEqual(result);

      haiku.del('VBN', 'doomed');

      result = { VBZ: { appears: { word: 'appears', count: 2 } }, VBN: { } };

      haiku.getData().should.deepEqual(result);

      done();
    });
  });
});
