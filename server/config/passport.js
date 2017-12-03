const TwitterStrategy = require('passport-twitter').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
var User = require('../models/Users')

const config = require('./config')


module.exports = function(passport) {

  passport.use(new TwitterStrategy({
      consumerKey: config.oauth.consumer_key,
      consumerSecret: config.oauth.consumer_secret,
      callbackURL: "http://localhost:3000/auth/twitter/callback",
      includeEmail: true,
      passReqToCallback: true

    },
    function(req, token, tokenSecret, profile, done){
      // console.log(profile);
      // return done(null,profile);

      User.findOne({'twitter.id': profile.id}), function(err,user){
        if(err) return done(err);
        let payload = {id: profile.id, email: profile.emails[0].value};
        let token = jwt.sign(payload, config.JWTsecret.secret, {
          expiresIn: 24*24*60
        });
        res.cookie('jwt',token);

        if(!user){
          console.log('creating new user');
          user = new User({
            email: profile.emails[0].value,
            twitter: profile._json
          });
          user.save(function(err) {
            if(err) console.log(err);
            return done(err,user);
          });
        } else{
          console.log('found user');
          return done(null,user);
        }
      }
    } 
    // function(token, tokenSecret, profile, done) {
    //   console.log(profile)
    //   console.log(profile.email);
      // return done(null, profile);

      // User.findOne({email: profile.emails[0].value}), function(err, user){
      //   console.log('sadlkjas');
      //   if(err) {
      //     console.log('error');
      //     return done(err);
      //   }
      //   if(!user){
      //     console.log("creating user from twitter");
      //     user = new User({
      //       email : profile.emails[0].value,
      //       password: null
      //     })
      //     // save the user
      //     user.save(function(err) {
      //       console.log("twitter user registered");
      //       if (err) throw err;
      //       return done(null,user);
      //     })
      //   }else{
      //     console.log('user already in db');
      //     return done(null,user);
      //   }
      // }
    // }
  ));

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
