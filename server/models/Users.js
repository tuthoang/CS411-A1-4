const mongoose = require('mongoose');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });

var userSchema = mongoose.Schema({
    email: String,
    password: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
