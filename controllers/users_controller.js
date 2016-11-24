var UsersController = {};
var mongoose = require('mongoose');
var User = require('../models/user.js');
var passport = require('passport');
var path = require('path');
var server = require('../server.js');
// var auth = require('./authentication.js');


UsersController.index = function(req, res) {
  console.log(JSON.stringify(req.user));
  console.log("locals " + JSON.stringify(req.app.locals.user));
  var current_user = JSON.stringify(req.user);
  res.render('../views/users/home.ejs');
}

UsersController.profile = function(req, res){
  res.render('../views/users/profile.ejs');
}

UsersController.new = function(req, res) {
  res.sendFile(path.resolve('./views/users/signup.html'));
}

UsersController.register = function(req, res) {
  if(req.body.password != req.body.passwordConfirm){
    backURL=req.header('Referer') || '/';
  // error message passwords do not match
  res.redirect(backURL);
  }
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
      });
    }
  );
  res.redirect(path.resolve('/'));
};

UsersController.signin = function(req, res) {
  res.sendFile(path.resolve('./views/users/signin.html'));
}

UsersController.verify = function(req, res) {
  console.log("hey its " + req.user)
  req.app.locals.user = req.user;

  res.redirect(path.resolve('/'));
}

UsersController.logout = function(req, res){
    console.log("BEFORE logout", JSON.stringify(req.user));
    req.app.locals.user = false;
    req.logout();
    console.log("AFTER logout", JSON.stringify(req.user));
    res.redirect(path.resolve('/'));
  };


module.exports = UsersController;
