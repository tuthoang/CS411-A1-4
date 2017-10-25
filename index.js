var express = require('express')
var path = require('path')
var cors = require('cors');
const bodyParser = require('body-parser')
const Twit = require('twit')
const async = require('async')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname , 'views'))

var T = new Twit({
  consumer_key:         'A15zwJ94dD4puhGr6QBQKxWsd',
  consumer_secret:      '0udsXOyiGrSt3i6lze0TQeNKaCmqlc4hzujMDCDGMXZ9QIVfgB',
  access_token:         '4831224928-WSzUTsaFUUKWKaaaqVPJpcyNp9tBJEeYqnq3DfS',
  access_token_secret:  '4j4ynkCV2QtSYIpok3wXoy09NrjA0WwdYJmTQCh83v9aT'
})

var j
app.get('/', function (req, res) {
  res.render('index')
})

app.post('/search', function (req, res){
  var searchContents = req.body.searchBar;
  console.log(searchContents)

  T.get('users/search', { q: searchContents, count: 100 })
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
  console.log('Example app listening on port 8000!')
})
