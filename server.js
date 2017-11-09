const express = require('express')
const path = require('path')
const cors = require('cors');
const bodyParser = require('body-parser')
const Twit = require('twit')
const async = require('async')

const fs = require('fs')
const config = require('./config.json')

const app = express()
console.log(typeof config)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use(express.static(path.join(__dirname, '/styles')));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname , 'views'))

const T = new Twit(config)

app.get('/', function (req, res) {
  res.render('index')
})

app.post('/search', function (req, res){

  var searchContents = req.body.searchBar;
  console.log(searchContents)

  T.get('users/search', { q: searchContents, count: 20 })
  .catch(function (err){
    console.log("FOUND ERROR: " + err)})
  .then(function(result) {
    res.render('search',
    {
      twitter: result.data
    })
  })
})

app.listen(8890, function () {
  console.log('Example app listening on port 8890!')
})
