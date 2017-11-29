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
    console.log("====================== API CALL =========================")
    console.log("me api");
    console.log(req.user);
    res.json(req.user);
  });

router.get('/search', (req, res) => {
  T.get('users/search', { q: JSON.stringify(req.query.searchBar), count: 5 })
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
  T.get('/statuses/user_timeline', {screen_name: 'barackobama', count: 5})
  .then(function(result){
    console.log(result.data[0].text)
    res.json(result.data)
  })
  .catch(function (err){
    console.log("FOUND ERROR: " + err.message)
  })
})

router.get('/sentiment', (req,res) => {
  // console.log(JSON.prase(req.body))
  indico.emotion(JSON.stringify(req.query.sentimentBar))
  .then(function(result){
    console.log(result);
    res.json(result)
  })
  .catch(function(err){
    console.log(err.message)
  });
})

router.post('/create', (req,res) => {

  // create a new user
  let newUser = User({
    email: req.body.email,
    password: req.body.password
  });

  // save the user
  newUser.save(function(err) {
    if (err) throw err;

    console.log('User created!');
  });
})

// router.post('/login', passport.authenticate('local', {successRedirect:'/api/me', failureRedirect: '/api', failureFlash: true, session:true}),
//   function(req,res) {
//     // console.log('sucess')
//     req.flash('success_msg', 'logged in');
//     res.redirect('/');
//   })


// router.post('/login', passport.authenticate('jwt', {session:false}),
//   function(req,res) {
//     // console.log('sucess')
//     req.flash('success_msg', 'logged in');
//     res.redirect('/api/me');
//   })
router.post("/login", function(req, res) {
  if(req.body.email && req.body.password){
    var email = req.body.email;
    var password = req.body.password;
  }

  User.findOne({email: email}, function(err, user) {
    if (err) {
        return res.json({message: "error"})
    }
    if(!user) res.json({message:"error: user not found"});

     else {
      user.comparePassword(password, function(err,isMatch){
      if(err) throw err;
      if(isMatch){
        var payload = {id: user._id};
        var token = jwt.sign(payload, config.JWTsecret.secret);
        res.json({message: "ok", token: 'Bearer ' + token});
      } else{
        res.json({message:'Invalid password'});
      }
    })
    }
  });
});
router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json({message:"Success! You can not see this without a token"});
});

router.get("/secretDebug",
  function(req, res, next){
    console.log(req.get('Authorization'));
    next();
  }, function(req, res){
    res.json("debugging");
});

module.exports = router;
