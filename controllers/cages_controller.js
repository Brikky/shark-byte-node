var CagesController = {};
var mongoose = require('mongoose');
var db = require('../models/index.js');
var path = require('path');

CagesController.index = function(req, res) {
  res.sendFile('../views/default.html', { root: __dirname });
}

CagesController.new = function(req, res) {
  res.render('../views/cages/default.ejs');
}

CagesController.create = function(req, res) {
  db.User.findOne({_id: req.app.locals.user.id},function(err, user){
    //TODO: in the default, add a hidden form with fields for html, css, js
    //when the save button is clicked, create a new cage and redirect to that Cage
    // if we're on the cages/new route, otherwise update the cage
    var newCage = new db.Cage({html: req.query.html, style: req.query.style, script: req.query.script});
    user.cages.push(newCage);
    newCage.save();
    user.save();
    res.json({'cageId':newCage.id});
  })
}

CagesController.show = function(req, res) {
  console.log(req.params.id)
  db.Cage.findOne({_id: req.params.id}, function(err, cage){
    console.log(cage);
    res.render('../views/cages/default.ejs', {'data': cage});
  });
}

module.exports = CagesController;
