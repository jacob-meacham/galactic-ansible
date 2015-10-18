'use strict';

import config from 'config/config';
const TwitterBot = require('node-twitterbot').TwitterBot;

const bot = new TwitterBot({
  'consumer_secret': config.auth.consumerSecret,
  'consumer_key': config.auth.consumerKey,
  'access_token': config.auth.accessToken,
  'access_token_secret': config.auth.tokenSecret
});

bot.addAction('tweet', function() {
  bot.tweet('H.E.L.L.O U.N.I.V.E.R.S.E');
});

bot.now('tweet');

console.log('something happened');
