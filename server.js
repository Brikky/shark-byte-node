const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./models');
const User = db.User;
const Cage = db.Cage;

//Middleware
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flash messages
app.use(flash());
app.use(function(req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(express.static('./public'));
app.use(bodyParser());

//Require all resources in app
app.use(require('./routes'));

app.set('view engine', 'ejs');
// use res.render to load up an ejs view file
app.locals.user = false;

//Create server
var port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log('running on port', port);
});

module.exports = app;
