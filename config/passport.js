var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use('login', new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        console.log("LocalStrategy: !user");
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        console.log("LocalStrategy: !validPassword");
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log("LocalStrategy: returning user");
      return done(null, user);
    });
  }
));