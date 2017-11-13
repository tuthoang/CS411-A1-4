const express = require('express');
const router = express.Router();
// const config = require('../config')
// const passport = require('passport')
// const TwitterStrategy = require('passport-twitter').Strategy;

// passport.use(new TwitterStrategy({
//     consumerKey: config.oauth.consumer_key,
//     consumerSecret: config.oauth.consumer_secret,
//     callbackURL: "http://localhost:3000/auth/twitter/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//     console.log(profile)
//     // User.findOrCreate(..., function(err, user) {
//     //   if (err) { return done(err); }
//     //   done(null, user);
//     // });
//     done(null, profile);
//   }
// ));

// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
module.exports = function(passport){
  router.get('/auth/twitter', passport.authenticate('twitter'));

  // Twitter will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { successRedirect: '/',
                                       failureRedirect: '/twittererror' }));
  return router;
}
// module.exports = router
