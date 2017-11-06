const express = require('express')
const path = require('path')
const cors = require('cors');
const bodyParser = require('body-parser')
const Twit = require('twit')

const fs = require('fs')
const config = require('./config')
<<<<<<< HEAD
const search = require('./routes/search')
const sentiment = require('./routes/sentiment')
=======

>>>>>>> origin/master
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname , 'views'))


app.use(search)
app.use(sentiment)

app.get('/', function (req, res) {
  res.render('index')
})

app.listen(8890, function () {
  console.log('Example app listening on port 8890!')
})
