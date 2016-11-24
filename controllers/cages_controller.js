var CagesController = {};
var mongoose = require('mongoose');
var db = require('../models/index.js');

CagesController.index = function(req, res) {
  res.sendFile('../views/default.html', { root: __dirname });
}

CagesController.new = function(req, res) {
  res.render('../views/cages/default.ejs')
}

CagesController.create = function(req, res) {
  db.User.findOne({_id: req.app.locals.user.id},function(err, user){
    //TODO: in the default, add a hidden form with fields for html, css, js
    //when the save button is clicked, create a new cage and redirect to that Cage
    // if we're on the cages/new route, otherwise update the cage
    user.cages.push(new db.Cage({html: req.body.html, style: req.body.style, script: req.body.script}));
    user.save();
  })
  res.render('../views/cages/new.ejs')
}
module.exports = CagesController;
