const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
// local startegy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
// verify email user and password
  User.findOne({ email: email }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // compare passwords
  });
});
// set up options for jwt Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// create jwt Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // see if user id in the payload exists in db

  User.findById(payload.sub, function (err, user) {
    if (err) { return done(err, false); }
    if (user) {
      done(null, user); // call done with that user
    } else {
      done(null, false);   // call done without a user
    }
  });
});
// tell passport to use the strategy
passport.use(jwtLogin);
