var UsersController = {};
var mongoose = require('mongoose');
var User = require('../models/user.js');
var passport = require('passport');
var path = require('path');
// var auth = require('./authentication.js');


UsersController.index = function(req, res) {
  res.sendFile(path.resolve('./views/users/home.html'));
}

UsersController.new = function(req, res) {
  res.sendFile(path.resolve('./views/users/signup.html'));
}

UsersController.register = function(req, res) {
  console.log(req.body)
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
      });
    }
  );
  res.redirect(path.resolve('/users'));
};

UsersController.signin = function(req, res) {
  res.sendFile(path.resolve('./views/users/signin.html'));
}

UsersController.verify = function(req, res) {
  res.sendFile(path.resolve('./views/users/home.html'));
}

UsersController.logout = function(req, res){
    console.log("BEFORE logout", JSON.stringify(req.user));
    req.logout();
    console.log("AFTER logout", JSON.stringify(req.user));
    res.redirect(path.resolve('/users'));
  };


module.exports = UsersController;
