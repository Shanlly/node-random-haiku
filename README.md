# random haiku

Generates random haikus. Very experimental. Not the greatest.

## example

    const Haiku = require('random-haiku');

    let haiku = new Haiku();
    let dictionary = 'the it awful nerd talk alone runs walks smart dumb chair ' +
                  'sing considered a we seem appears they always tired amused ' +
                  'sadness joy shake knows glitter blue green quickly superb she he ' +
                  'briskly firmly swiftly really writing laughing eating dancing ' +
                  'forever never happy sad sleeping curious bored cat person it is';

    haiku.addToDataset(dictionary, (err, resp) => {
      if (err) {
        throw err;
      }

      let result = haiku.generate();

      console.log(result);

      // ['a smart chair',
      //  'it quickly appears swiftly',
      //  'considered dancing']
    });

Other commands include:

    haiku.getData(); // returns the current dataset.
    haiku.del('PRP'); // deletes all the content from a particular part-of-speech.
    haiku.del('NN', 'tree'); // deletes a word from the dataset - you need to know what part-of-speech it is.

## tests

You can also run the sample set of words through `npm test`
