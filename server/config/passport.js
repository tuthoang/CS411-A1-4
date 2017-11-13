const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('./config')

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new TwitterStrategy({
      consumerKey: config.oauth.consumer_key,
      consumerSecret: config.oauth.consumer_secret,
      callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
      console.log(profile)
      // User.findOrCreate(..., function(err, user) {
      //   if (err) { return done(err); }
      //   done(null, user);
      // });
      done(null, profile);
    }
  ));

}
