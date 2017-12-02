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
        var token = jwt.sign(payload, config.JWTsecret.secret);
        console.log('logging');
        // sessionStorage.setItem('jwt', token)
        // res.setHeader('Authorization', 'Bearer ' +token); //doesnt work
        res.cookie('jwt',token);
        // res.redirect(302, 'http://localhost:3000');

        res.json({
          success: true, 
          message: "Receiving Token", 
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
    console.log('sadiosad');
    next();
  }, function(req, res){
    res.json("debugging");
});

module.exports = router;
