// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

// Get our API routes
const api = require('./routes/api');
const passport = require('passport');
const passportRoute = require('./routes/twitterLogin')(passport);
const app = express();

require('./config/passport')(passport); // pass passport for configuration
// Connection to mongo server
var mongo = require('./config/mongo')

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*', cors());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

// const passportRoute = require('./routes/passport')(passport);

// Set our api routes
app.use('/api',api);
app.use(passportRoute);


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
