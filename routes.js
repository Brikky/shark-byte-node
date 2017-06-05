var express = require('express');
var router = express.Router();
var UserController = require('./controllers/users_controller');
var CageController = require('./controllers/cages_controller');
var passport = require('passport');
var auth = require('./authentication.js');

//home page
router.get('/', UserController.index);
//########**PROTECTED**########
//cages
router.get('/cages/new', auth.checkPermission, CageController.new);
router.post('/cages/create', auth.checkPermission, CageController.create);
router.get('/cages/:id', auth.checkPermission, CageController.show);
router.post('/cages/:id', auth.checkPermission, CageController.update);
router.delete('/cages/:id', auth.checkPermission, CageController.delete);
router.get('/cages', auth.checkPermission, CageController.index);
//profile
router.get('/profile', auth.checkPermission, UserController.profile);
//########**END PROTECTED**########
//account routes
router.get('/signup', UserController.new);
router.post('/signup', UserController.createAccount);
router.get('/signin', UserController.signin);
router.post('/signin', passport.authenticate('local'), UserController.verify);
router.get('/logout', UserController.logout);

module.exports = router;
