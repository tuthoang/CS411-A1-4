var express = require('express')
var path = require('path')
var cors = require('cors');
const Twit = require('twit')
const app = express()

app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

var j
var T = new Twit({
  consumer_key:         'A15zwJ94dD4puhGr6QBQKxWsd',
  consumer_secret:      '0udsXOyiGrSt3i6lze0TQeNKaCmqlc4hzujMDCDGMXZ9QIVfgB',
  access_token:         '4831224928-WSzUTsaFUUKWKaaaqVPJpcyNp9tBJEeYqnq3DfS',
  access_token_secret:  '4j4ynkCV2QtSYIpok3wXoy09NrjA0WwdYJmTQCh83v9aT'
})

app.get('/', function (req, res) {
  T.get('search/tweets', { q: 'perrydBUCS', count: 100 }, function(err, data, response) {
  console.log(data)
  j = data;
})
  res.render('index',
  {
    twitter: j
  })
})

app.listen(8890, function () {
  console.log('Example app listening on port 8000!')
})
