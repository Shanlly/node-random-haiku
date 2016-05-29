'use strict';

const should = require('should');

const Haiku = require('../index.js');

const currentResults = {
  DT: { a: { word: 'a', count: 1 }, an: { word: 'an', count: 1 } },
  JJ: { opulent: { word: 'opulent', count: 3 } },
  VBN: { considered: { word: 'considered', count: 3} },
  NN: { lemon: { word: 'lemon', count: 2 } },
  PRP: { we: { word: 'we', count: 1 } },
  VBZ: { refers: { word: 'refers', count: 2 } },
  RB: { now: { word: 'now', count: 1 } },
  VBG: { eating: { word: 'eating', count: 2 } }
};

describe('Haiku', () => {
  it('should return POS data for a sentence', (done) => {
    let haiku = new Haiku();
    let sentence = 'a an opulent lemon we refers now considered eating';
    let results = currentResults;

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
    let sentence = 'a an opulent lemon we refers now considered eating';

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
      if (err) {
        throw err;
      }

      let result = { VBZ: { appears: { word: 'appears', count: 2 } },
          VBN: { doomed: { word: 'doomed', count: 1 } } };

      haiku.getData().should.deepEqual(result);

      haiku.del('VBN', 'doomed');

      result = { VBZ: { appears: { word: 'appears', count: 2 } }, VBN: { } };

      haiku.getData().should.deepEqual(result);

      done();
    });
  });

  it('should not include an unused part-of-speech', (done) => {
    let haiku = new Haiku();
    let sentence = 'verify';

    haiku.addToDataset(sentence, (err, resp) => {
      if (err) {
        throw err;
      }

      let result = {};

      haiku.getData().should.deepEqual(result);

      done();
    });
  });

  it('should use "an" for a vowel', (done) => {
    let haiku = new Haiku();
    let sentence = 'a an opulent lemon we refers now considered eating';
    let results = currentResults;

    haiku.addToDataset(sentence, (err, resp) => {
      if (err) {
        throw err;
      }

      let result = haiku.generate();

      should.exist(result);
      result.should.deepEqual([
        'an opulent lemon',
        'we refers now considered',
        'considered eating'
      ]);
      console.log(result)
      done();
    });
  });

  it('should use "a" for a consonant ', (done) => {
    let haiku = new Haiku();
    let sentence = 'a an happy lemon we refers now considered eating';
    let results = { DT: { a: { word: 'a', count: 1 }, an: { word: 'an', count: 1 } },
      JJ: { happy: { word: 'happy', count: 2 } },
      VBN: { considered: { word: 'considered', count: 3} },
      NN: { lemon: { word: 'lemon', count: 2 } },
      PRP: { we: { word: 'we', count: 1 } },
      VBZ: { refers: { word: 'refers', count: 2 } },
      RB: { now: { word: 'now', count: 1 } },
      VBG: { eating: { word: 'eating', count: 2 } }
    };

    haiku.addToDataset(sentence, (err, resp) => {
      if (err) {
        throw err;
      }

      resp.should.deepEqual(results);

      let result = haiku.generate();

      should.exist(result);
      result.should.deepEqual([
        'a happy lemon',
        'we refers now considered',
        'considered eating'
      ]);
      console.log(result)
      done();
    });
  });
});
