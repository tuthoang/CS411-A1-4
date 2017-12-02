const TwitterStrategy = require('passport-twitter').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/Users')

const config = require('./config')


// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

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

  var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
  };

  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  // opts.jwtFromRequest = cookieExtractor;
  opts.secretOrKey = config.JWTsecret.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    User.findOne({_id: jwt_payload.id}, function(err, user) {
      if (err) {
        console.log('err');
        return done(err, false);
      }
      if (user) {
        console.log(user);
        done(null, user);
      } else {
        console.log('no user');
        done(null, false);
      }
    });
  }));
  // Use local strategy
  // passport.use(new LocalStrategy({
  //   usernameField: "email",
  //   passwordField: "password",
  //   passReqToCallback : true // allows us to pass back the entire request to the callback
  // },function(req, email, password, done) {
  //   User.findOne({
  //     email: email
  //   }, function(err, user) {
  //     // When an error occurred
  //     if (err) {
  //       return done(err);
  //     }
      
  //     // When user not found 
  //     if (!user) {
  //       return done(null, false, {
  //         message: 'Unknown user'
  //       });
  //     }

  //     // When the password is invalid
  //     user.comparePassword(password, function(err,isMatch){
  //       if(err) throw err;
  //       if(isMatch){
  //         console.log('logged');
  //         return done(null,user);
  //       } else{
  //         return done(null,false, {message:'Invalid password'});
  //       }
  //     })
  //   });
  // }));

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
