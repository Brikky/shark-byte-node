var CagesController = {};
var mongoose = require('mongoose');
var db = require('../models/index.js');
var path = require('path');

CagesController.index = function(req, res) {
  res.sendFile('../views/new.html', { root: __dirname });
}

CagesController.new = function(req, res) {
  res.render('../views/cages/new.ejs');
}

CagesController.create = function(req, res) {
  db.User.findOne({_id: req.app.locals.user.id},function(err, user){
    var newCage = new db.Cage({html: req.body.html, style: req.body.style, script: req.body.script});
    user.cages.push(newCage);
    user.save();
    newCage.save();
    res.json({'cageId':newCage.id, 'cage':newCage});
  })
}

CagesController.show = function(req, res) {
  console.log('show action',req.params.id)
  db.Cage.findOne({_id: req.params.id}, function(err, cage){
    res.render('../views/cages/show.ejs', {'cageData': cage});
  });
}

CagesController.update = function(req, res) {
  db.Cage.update({_id: req.params.id},{
    html: req.body.html,
    style: req.body.style,
    script: req.body.script
  }, function(err, affected, res){
    console.log('error', err);
    console.log('affected', affected);
    console.log('response',res);
  });
  res.send('cage updated successfully');
}

module.exports = CagesController;
