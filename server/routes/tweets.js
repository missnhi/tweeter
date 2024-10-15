"use strict";

const userHelper = require("../lib/util/user-helper")

const express = require('express');
const tweetsRoutes = express.Router();


//The module exports a function that takes DataHelpers as an argument. DataHelpers provides
// methods for interacting with the database (e.g., getTweets and saveTweet).
module.exports = function(DataHelpers) {
  
  // GET /: Retrieves all tweets from the database.
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({error: err.message});
      } else {
        res.json(tweets);
      }
    });
  });
  
  // POST /: Creates a new tweet.
  tweetsRoutes.post("/", function(req, res) {
    
    // Checks if the request body contains text
    if (!req.body.text) {
      res.status(400).json({error: 'invalid request: no data in POST body'});
      return;
    }
    
    // If the request body contains a user, use that user. Otherwise, generate a random user.
    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };
    
    // Calls DataHelpers.saveTweet to save the tweet.
    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({error: err.message});
      } else {
        res.status(201).send(tweet);
      }
    });
  });
  
  return tweetsRoutes;
  
}
