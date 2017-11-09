var express = require('express')
var router = express.Router()
const Twit = require('twit')
const config = require('../config')

const T = new Twit(config.oauth)

router.post('/search', function (req, res){

  var searchContents = req.body.searchBar;
  console.log(searchContents)

  T.get('users/search', { q: searchContents, count: 20 })
  .catch(function (err){
    console.log("FOUND ERROR: " + err.message)
  })
  .then(function(result) {
    res.render('search',
    {
      twitter: result.data
    })
  })
})

module.exports = router
