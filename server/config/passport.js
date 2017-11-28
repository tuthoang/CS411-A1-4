const TwitterStrategy = require('passport-twitter').Strategy;
const LocalStrategy = require('passport-local').Strategy;
var User = require('../models/Users')

const config = require('./config')

module.exports = function(passport) {

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

  // Use local strategy
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },function(req, email, password, done) {
    User.findOne({
      email: email
    }, function(err, user) {
      // When an error occurred
      if (err) {
        return done(err);
      }
      
      // When user not found 
      if (!user) {
        return done(null, false, {
          message: 'Unknown user'
        });
      }

      // When the password is invalid
      user.comparePassword(password, function(err,isMatch){
        if(err) throw err;
        if(isMatch){
          console.log('logged');
          return done(null,user);
        } else{
          return done(null,false, {message:'Invalid password'});
        }
      })
    });
  }));

  passport.serializeUser(function(user, done) {
    console.log('in serialize, setting id on session:', user.id)
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    console.log('in deserialize with id', user.id)
   // User.findOne({twitterID: id}, function (err, user) {
   //     done(err, user)
   // })
    done(null, user);
  });
}
