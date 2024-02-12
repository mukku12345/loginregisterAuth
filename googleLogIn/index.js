// EXPRESS */

const express = require('express');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.get('/', function(req, res) {
//   res.render('/signIn');
res.send("welcome to login with google")
});

const port = process.env.PORT || 8080;
app.listen(port , () => console.log('App listening on port ' + port));

///////////////////////////////////////
const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


////////////////////////////////////


 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '1061184605458-gih0qdkbn9oda8pr2cnqppq3p0momrbu.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });