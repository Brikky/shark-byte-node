const UsersController = {};
const mongoose = require('mongoose');
const User = require('../models/user.js');
const passport = require('passport');
const path = require('path');
const server = require('../server.js');

UsersController.index = function(req, res) {
  res.render('../views/users/home.ejs');
}

UsersController.profile = function(req, res) {
  User.findOne({
    _id: req.app.locals.user.id
  }, function(err, user) {
    req.app.locals.user = user;
  });
  res.render('../views/users/profile.ejs');
}

UsersController.new = function(req, res) {
  res.sendFile(path.resolve('./views/users/signup.html'));
}

UsersController.createAccount = function(req, res) {
  if (req.body.password !== req.body.passwordConfirm) {
    res.redirect('./views/users/signup.html');
  }
  User.register(new User({
      username: req.body.username,
      headline: req.body.headline,
      description: req.body.description,
      github: req.body.github,
      stackoverflow: req.body.stackoverflow
    }), req.body.password,
    function(err, newUser) {
      passport.authenticate('local'),(req, res, function() {
          res.redirect(path.resolve('/'));
      });
    }
  );
  req.flash('error', 'user could not be created');
  res.redirect('./views/users/signup.html');
};

UsersController.signin = function(req, res) {
  res.sendFile(path.resolve('./views/users/signin.html'));
}

UsersController.verify = function(req, res) {
  req.app.locals.user = req.user;
  res.redirect(path.resolve('/'));
}

UsersController.logout = function(req, res) {
  req.app.locals.user = false;
  req.logout();
  res.redirect(path.resolve('/'));
};

module.exports = UsersController;
