// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser')

const cors = require('cors');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const jwt = require('jsonwebtoken');
// Get our API routes
const api = require('./routes/api');
const auth = require('./routes/auth')
const passport = require('passport');
// const passportRoute = require('./routes/api')(passport);
const app = express();

// Connection to mongo server
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});




// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*', cors());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


// app.use(session({
//   secret: 'mysecret',
//   resave: false,
//   saveUninitialized: true
// }))
app.use(cookieParser());
app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
// const passportRoute = require('./routes/passport')(passport);

// Set our api routes
app.use('/api',api);
app.use('/auth',auth);
// app.use(passportRoute);


// Point static path to dist
app.use(express.static(path.join(__dirname, '../client/dist')));


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
