const express = require('express');
const router = express.Router();
const config = require('../config')
const Twit = require('twit')
const indico = require('indico.io');

const T = new Twit(config.oauth)
indico.apiKey = config.indico.apiKey

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

  
router.post('/search', (req, res) => {
  T.get('users/search', { q: JSON.stringify(req.body.searchBar), count: 1 })
  .then(function(result) {
      console.log(result);
      res.json(result.data);
      // res.send(result.data)
  })
  .catch(function (err){
    console.log("FOUND ERROR: " + err.message)
  })
})  

router.post('/sentiment', (req,res) => {
  // console.log(JSON.prase(req.body))
  indico.emotion(JSON.stringify(req.body.sentimentBar))
  .then(function(result){
    console.log(result);
    res.json(result)
  })
  .catch(function(err){
    console.log(err.message)
  });
})
module.exports = router;
