const express = require('express')
const path = require('path')
const cors = require('cors');
const bodyParser = require('body-parser')
const Twit = require('twit')

const fs = require('fs')
const config = require('./config')
const search = require('./routes/search')
const sentiment = require('./routes/sentiment')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname , 'views'))
//search twitter user's
app.use(search)
app.use(sentiment)
const T = new Twit(config.oauth)

app.get('/', function (req, res) {
  res.render('index')
})
// app.post('/search', function (req, res){
  
//   var searchContents = req.body.searchBar;
//   console.log(searchContents)

//   T.get('users/search', { q: searchContents, count: 20 })
//   .catch(function (err){
//     console.log("FOUND ERROR: " + err.message)})
//   .then(function(result) {
//     res.render('search',
//     {
//       twitter: result.data
//     })
//   })
// })

app.listen(8889, function () {
  console.log('Example app listening on port 8890!')
})
