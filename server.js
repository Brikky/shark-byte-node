var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    db = require("./models"),
        User = db.User,
        Cage = db.Cage;

//Middleware
app.use(cookieParser());
app.use(session({
    secret: 'supersecretkey', // change this!
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flash messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(express.static("./public"));
app.use(bodyParser());

//Require all resources in app
app.use(require("./routes"));

app.set('view engine', 'ejs');
// use res.render to load up an ejs view file
app.locals.user = false;
//Create a server
var port = process.env.PORT || 8000
app.listen(port, function() {
    console.log('running on port', port)
});

module.exports = app;
