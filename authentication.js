var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res) {
  var user = new User();
  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      token: token
    });
  });
};

module.exports.login = function(req, res) {
  passport.authenticate('local', function(err, user, info) {
    var token;
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json('passport error ' + err);
      return;
    }
    // If a user is found
    if (user) {
      token = user.generateJwt();
      req.app.user = user;
      res.status(200);
      res.json({
        token: token
      });
    } else {
      // If user is not found
      res.status(401).json('user not found, ' + info);
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
