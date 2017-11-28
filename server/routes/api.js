const express = require('express');
const router = express.Router();
const config = require('../config/config');
var User = require('../models/Users');

const Twit = require('twit');
const indico = require('indico.io');

const T = new Twit(config.oauth)
indico.apiKey = config.indico.apiKey

//req.body ======= POST!
//req.query ====== GET!

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/me', (req, res) => {
    console.log("====================== API CALL =========================")
    console.log("me api");
    console.log(req.user);
    res.json(req.user);
  });
  
router.get('/search', (req, res) => {
  T.get('users/search', { q: JSON.stringify(req.query.searchBar), count: 5 })
  .then(function(result) {
      // console.log(result);
      res.json(result.data);
      // res.send(result.data)
  })
  .catch(function (err){
    console.log("FOUND ERROR: " + err.message)
  })
})  

router.get('/tweets', (req,res) => {
  T.get('/statuses/user_timeline', {user_id: 813286})
  .then(function(result){
    console.log(result.data[0].text)
    res.json(result.data[0])
  })
  .catch(function (err){
    console.log("FOUND ERROR: " + err.message)
  })
})
router.get('/sentiment', (req,res) => {
  // console.log(JSON.prase(req.body))
  indico.emotion(JSON.stringify(req.query.sentimentBar))
  .then(function(result){
    console.log(result);
    res.json(result)
  })
  .catch(function(err){
    console.log(err.message)
  });
})

router.post('/create', (req,res) => {

  // create a new user
  let newUser = User({
    email: req.body.email,
    password: req.body.password
  });

  // save the user
  newUser.save(function(err) {
    if (err) throw err;

    console.log('User created!');
  });
})

module.exports = router;
