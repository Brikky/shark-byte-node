var CagesController = {};
var mongoose = require('mongoose');
var db = require('../models/index.js');
var path = require('path');

CagesController.index = function(req, res) {
    res.sendFile('../views/new.html', {
        root: __dirname
    });
}

CagesController.new = function(req, res) {
    res.render('../views/cages/new.ejs');
}

CagesController.create = function(req, res) {
    console.log(req.body)
    db.User.findOne({
        _id: req.app.locals.user.id
    }, function(err, user) {
        var newCage = new db.Cage({
            html: req.body.html,
            style: req.body.style,
            script: req.body.script,
            dbRef: req.body.htmlRef
        });
        user.cages.push(newCage);
        user.save();
        newCage.save();
        res.json({
            'cageId': newCage.id,
            'cage': newCage
        });
    })
}

CagesController.show = function(req, res) {
    console.log(req.params.id)
    db.User.findOne({
        'cages': {
            $elemMatch: {
                '_id': req.params.id
            }
        }
    }, function(err, owner) {
        db.Cage.findOne({
            _id: req.params.id
        }, function(err, cage) {
            if (cage.public || req.user.id == owner.id) {
                res.render('../views/cages/show.ejs', {
                    'cageData': cage
                });
            } else {
                req.flash('error', 'That cage is private!');
                res.redirect('/');
            }
        });
    });
};

CagesController.update = function(req, res) {
    if (req.body.public) {
        var privacyStatus = req.body.public === 'true';
        db.Cage.update({
            _id: req.params.id
        }, {
            public: privacyStatus
        }, function(err, affected, res) {});
    } else {
        db.Cage.update({
            _id: req.params.id
        }, {
            html: req.body.html,
            style: req.body.style,
            script: req.body.script
        }, function(err, affected, res) {});
    }
    res.send('cage updated successfully');
}

CagesController.delete = function(req, res) {
    console.log(req.params)
    console.log(req.app.locals.user.id)
    db.User.update({
        _id: req.app.locals.user.id
    }, {
        $pull: {
            cages: {
                _id: req.params.id
            }
        }
    }, function(err, affected, res){
      console.log('err',err,'affected',affected,'res',res)
    })
    db.User.findOne({_id: req.app.locals.user.id}, function(err, user){
      req.app.locals.user = user;
    })
    res.send('deleted');
}

module.exports = CagesController;
