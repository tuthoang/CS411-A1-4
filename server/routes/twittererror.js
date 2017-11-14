const express = require('express');
const router = express.Router();

router.get('/twittererror', (req,res) => {
  console.log("error logging in with twitter")
  res.send("Error logging in with twitter")
})

module.exports = router;
