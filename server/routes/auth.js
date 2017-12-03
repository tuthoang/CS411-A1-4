const express = require('express');
const router = express.Router();
const config = require('../config/config');
const passport = require('passport');
var User = require('../models/Users');

const jwt = require('jsonwebtoken');
require('../config/passport')(passport); // pass passport for configuration


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

//TWITTER LOG
// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
router.get('/twitter', passport.authenticate('twitter', {session: false}));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/', failureRedirect:'/api/error'}));

// router.post('/login', passport.authenticate('local', {successRedirect:'/api/me', failureRedirect: '/api', failureFlash: true, session:true}),
//   function(req,res) {
//     // console.log('sucess')
//     req.flash('success_msg', 'logged in');
//     res.redirect('/');
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
        var payload = {id: user._id, email: user.email};
        var token = jwt.sign(payload, config.JWTsecret.secret, {
          expiresIn: 24*24*60
        });
        console.log('logging');
        res.cookie('jwt',token);
        res.json({
          success: true, 
          message: "Receiving Token",
          user: user.email,
          token: 'Bearer ' + token
        });
      } else{
        res.json({message:'Invalid password'});
      }
    })
    }
  });
});


router.post("/logout", passport.authenticate('jwt', {session:false}),
  function (req,res) {
    console.log("logged out");
    res.json({message:"You've logged out"});
  })

// use res.header or something like that
router.get("/secret", passport.authenticate('jwt', { session: false }), 
  function(req, res){
    console.log('accessed secret');
    res.json({message:"Success! You can not see this without a token"});
});

router.get("/secretDebug",
  function(req, res, next){
    console.log(req.get('Authorization'));
    next();
  }, function(req, res){
    res.json("debugging");
});

router.get('/me', function(res,req){
  res.json(req.user);
})

module.exports = router;
