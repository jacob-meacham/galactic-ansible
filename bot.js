'use strict';

var config = require('./config/config');
var TwitterBot = require('node-twitterbot').TwitterBot;

var Bot = new TwitterBot({
  'consumer_secret': config.auth.consumerSecret,
  'consumer_key': config.auth.consumerKey,
  'access_token': config.auth.accessToken,
  'access_token_secret': config.auth.tokenSecret
});

Bot.addAction('tweet', function() {
  Bot.tweet('H.E.L.L.O U.N.I.V.E.R.S.E');
});

Bot.now('tweet');