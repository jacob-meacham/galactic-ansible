'use strict'

import config from 'config/config';
const fs = require('fs');
const TwitterBot = require('node-twitterbot').TwitterBot;

class TwitterBroadcaster {
    constructor() {
        this.bot = new TwitterBot({
          'consumer_secret': config.auth.consumerSecret,
          'consumer_key': config.auth.consumerKey,
          'access_token': config.auth.accessToken,
          'access_token_secret': config.auth.tokenSecret
        });
    }

    broadcast(message) {
        this.bot.now(_ => bot.tweet(message));
    }
};

class FileBroadcaster {
    constructor(file) {
        this.file = file
    }

    broadcast(message) {
        fs.writeFile(this.file, message, err => {
            if(err) {
                // TODO
            }
        }); 
    }
};

class ConsoleBroadcaster {
    broadcast(message) {
        console.log(message);
    }
};