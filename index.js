'use strict';

const syllable = require('syllable');
const natural = require('natural');
const Tagger = natural.BrillPOSTagger;
const tokenizer = new natural.WordTokenizer();

const BASE = "./node_modules/natural/lib/natural/brill_pos_tagger";
const RULES = BASE + "/data/English/tr_from_posjs.txt";
const LEXICON = BASE + "/data/English/lexicon_from_posjs.json";
const DEFAULT_CATEGORY = 'N';

function tagWords(wordArr, next) {
  let tagger = new Tagger(LEXICON, RULES, DEFAULT_CATEGORY, (err) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    return next(null, JSON.stringify(tagger.tag(wordArr)));
  });
}

let Haiku = function () {
  let dataset = {};

  this.addToDataset = function (text, next) {
    let wordArr = tokenizer.tokenize(text);
    tagWords(wordArr, (err, resp) => {
      if (err) {
        return next(err);
      }

      let POSArr = JSON.parse(resp);

      POSArr.forEach((word) => {
        word = word.reverse();
        console.log('++ ', word)
        if (!dataset[word[0]]) {
          dataset[word[0]] = {};
        }

        dataset[word[0]][word[1].toLowerCase()] = true;
      });

      next(null, dataset);
    });
  };
};

module.exports = Haiku;
