const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.register = function(req, res) {
  let user = new User();
  user.setPassword(req.body.password);
  user.save(function(err) {
    let token = this.generateJwt();
    res.status(200);
    res.json({
      token: token
    });
  });
};

module.exports.login = function(req, res) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      res.status(404).send(`passport error: ${err}`);
      return;
    }
    if (user) {
      let token = user.generateJwt();
      res.status(200);
      res.json({
        token: token
      });
    } else {
      res.status(401).send(`user not found: ${info}`);
    }
  })(req, res);
};

module.exports.checkPermission = function(req, res, next) {
  if (req.user) {
    req.app.locals.user = req.user;
    next();
  } else {
    req.flash('error', 'You need to login first to access that page!');
    res.redirect('/');
  }
};
