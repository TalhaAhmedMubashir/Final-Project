var express = require('express');
var passport = require('passport');
const User = require('../models/user');
var fBRouter = express.Router();

const FacebookStrategy = require('passport-facebook').Strategy;


passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    //console.log("Deserial : ", user)
    cb(null, user);
  });
});

passport.use(new FacebookStrategy({
  clientID: process.env['FACEBOOK_APP_ID'],
  clientSecret: process.env['FACEBOOK_APP_SECRET'],
  callbackURL: "http://localhost:3002/auth/facebook/redirect/flightmanagement",
  profileFields: ['id', 'displayName', 'email'],
  passReqToCallback: true,
  enableProof: false // Add this line to disable proof key
},
  async (refreshToken, accessToken, undefine_user, profile, cb) => {
    //console.log("refreshToken : ",refreshToken," accessToken : ",accessToken," undefine : ",undefine_user)
    try {
      const user = await User.findOne({ facebookId: profile.id });
      if (!user) {
        const newUser = new User({
          name: profile.displayName,
          email:profile["_json"].email,
          facebookId: profile.id,
          accessToken: accessToken,
          userType:"FaceBook"
        });
        await newUser.save();
        return cb(null, newUser);
      } else {
        const existingUser = await User.findOne({ facebookId: user.facebookId });
        if (!user) {
          return cb(null, user);
        }
        return cb(null, existingUser);
      }
    } catch (err) {
      return cb(err)
    }
  }
));

fBRouter.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile',"email"] }));

fBRouter.get('/facebook/redirect/flightmanagement', passport.authenticate('facebook', {
  successRedirect: '/success',
  failureRedirect: '/login'
}));

module.exports = fBRouter;
