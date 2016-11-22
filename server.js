var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

//Middleware for static file service
app.use(express.static("./public"));
app.use(bodyParser());

//Require all resources in app
app.use(require("./resources"));

// middleware for auth
app.use(cookieParser());
app.use(session({
    secret: 'supersecretkey', // change this!
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var db = require("./models"),
    User = db.User;

//Create a server
app.listen(8080, function() {
    console.log('running on port 8080')
});

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/signup', function(req, res) {
    res.sendFile('views/signup.html', {
        root: __dirname
    });
});

// sign up new user, then log them in
// hashes and salts password, saves new user to db
app.post('/signup', function (req, res) {
  console.log(req.body)
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.send("banan");
      });
    }
  );
  res.sendFile('views/users/home.html', {
      root: __dirname
  });
});


module.exports = app;
