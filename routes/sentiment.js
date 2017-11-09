var express = require('express')
var router = express.Router()
var indico = require('indico.io')
const config = require('../config')

indico.apiKey = config.indico.apiKey

router.post('/sentiment', function (req, res){
  let sentimentText = req.body.sentimentBox
  console.log(sentimentText)
  indico
    .sentiment(sentimentText)
    .then(function(result){
      // console.log(res)
      res.render('sentiment',
      {
        sentimentAnalysis: result
      })      
    })
    .catch(function(err){
      console.log('err: ', err);
    })
})

module.exports = router
