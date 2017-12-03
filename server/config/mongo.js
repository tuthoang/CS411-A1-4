// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/test";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   db.createCollection("Users", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });
// const mongoose = require('mongoose');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });

// var userSchema = mongoose.Schema({
//     email: String,
//     password: String
// });

// var User = mongoose.model('User', userSchema);
