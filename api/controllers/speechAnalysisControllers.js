const User = require('../models/userModel');
const dotenv = require('dotenv');
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient({
  keyFilename: './google.json',
});

const SERVER_USER_ERROR = 422;
//test comment
// helper function to send errors
const sendUserError = (err, res) => {
  res.status(SERVER_USER_ERROR);
  if (typeof err === 'string') {
    res.json({ err });
    return;
  } else if (err && err.message) {
    res.json({
      message: err.message,
      stack: err.stack,
    });
    return;
  }
  res.json(err);
};

// test route
const test = (req, res) => {
  res.json({ msg: 'online' });
};


const dbtest = (req, res) => {
  const { Username, email, analysis } = req.body;
  if (!Username) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Missing required Username' });
    return;
  }
  if (!analysis) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Missing required analysis' });
    return;
  }
  if (!email) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Missing email' });
    return;
  }
  const newUser = new User({ Username, email, analysis });
  newUser.save((err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: 'error' });
      return;
    }
    res.json(newUser);
  });
}

const sentiment = (req, res) => {
  const info = {};
  const { text } = req.body;
  if (!text) return sendUserError('Please provide some text', res);

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  client
    .analyzeSentiment({document: document})
    .then(results => {
      const sentiment = results[0].documentSentiment;
      // info = {
      //   text,
      //   sentimentScore: sentiment.score,
      //   sentimentMagnitude: sentiment.magnitude,
      // };
      info.text = text;
      info.sentimentScore = sentiment.score;
      info.sentimentMagnitude = sentiment.magnitude;
      // res.json(info);

      // console.log(`Text: ${text}`);
      // console.log(`Sentiment score: ${sentiment.score}`);
      // console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
    })
    .catch(err => {
      sendUserError('there was an error in the server1, try again.', res);
    });

    client
      .analyzeSyntax({document: document})
      .then(results => {
        const syntax = results[0].documentSentiment;
        info.results = results;
        res.json(info);
      })
      .catch(err => {
        sendUserError('there was an error in the server, try again.', res);
      });

};

module.exports = {
  test,
  dbtest,
  sentiment,
};
