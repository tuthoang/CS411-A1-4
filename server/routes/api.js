const express = require('express');
const router = express.Router();
const config = require('../config/config');
const passport = require('passport');
var User = require('../models/Users');

const jwt = require('jsonwebtoken');
const Twit = require('twit');
const indico = require('indico.io');

const T = new Twit(config.oauth)
indico.apiKey = config.indico.apiKey

require('../config/passport')(passport); // pass passport for configuration

//req.body ======= POST!
//req.query ====== GET!

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/me', (req, res) => {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    res.status(200).send(decoded);
  });
});

router.get('/search', (req, res) => {
  T.get('users/lookup', { screen_name: req.query.searchBar })
  .then(function(result) {
      // console.log(result);
      res.json(result.data);
      // res.send(result.data)
  })
  .catch(function (err){
    console.log("FOUND ERROR: " + err.message)
  })
})

router.get('/tweets', (req,res) => {
  T.get('/statuses/user_timeline', {screen_name: req.query.screen_name, count: 5, tweet_mode: 'extended'})
  .then(function(result){
    // console.log(result.data[0].text)
    // console.log('-------------'+result.data[0].retweeted_status.full_text);
    res.json(result.data)
  })
  .catch(function (err){
    console.log("FOUND ERROR: " + err.message)
  })
})

router.get('/sentiment', (req,res) => {
  console.log(req.query.tweet);
  // let query = req.query.tweet.text;
  indico.emotion(req.query.tweet,{top_n: 3})
  .then(function(result){
    console.log(result);
    res.json(result);
  })
  .catch(function(err){
    console.log(err.message);
  });
})

router.get('error', (req,res) => {
  res.send('error');
})
// router.post('/create', (req,res) => {

//   // create a new user
//   let newUser = User({
//     email: req.body.email,
//     password: req.body.password
//   });

//   // save the user
//   newUser.save(function(err) {
//     if (err) throw err;

//     console.log('User created!');
//   });
// })

// // router.post('/login', passport.authenticate('local', {successRedirect:'/api/me', failureRedirect: '/api', failureFlash: true, session:true}),
// //   function(req,res) {
// //     // console.log('sucess')
// //     req.flash('success_msg', 'logged in');
// //     res.redirect('/');
// //   })


// router.post("/login", function(req, res) {
//   if(req.body.email && req.body.password){
//     var email = req.body.email;
//     var password = req.body.password;
//   }

//   User.findOne({email: email}, function(err, user) {
//     if (err) {
//         return res.json({message: "error"})
//     }
//     if(!user) res.json({message:"error: user not found"});

//      else {
//       user.comparePassword(password, function(err,isMatch){
//       if(err) throw err;
//       if(isMatch){
//         var payload = {id: user._id, email: user.email};
//         var token = jwt.sign(payload, config.JWTsecret.secret);

//         res.json({message: "ok", token: 'Bearer ' + token});
//       } else{
//         res.json({message:'Invalid password'});
//       }
//     })
//     }
//   });
// });
// // use res.header or something like that
// router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
//   res.json({message:"Success! You can not see this without a token"});
// });

// router.get("/secretDebug",
//   function(req, res, next){
//     console.log(req.get('Authorization'));
//     next();
//   }, function(req, res){
//     res.json("debugging");
// });

module.exports = router;
