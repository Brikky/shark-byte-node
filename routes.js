const express = require('express');
const router = express.Router();
const UserController = require('./controllers/users_controller');
const CageController = require('./controllers/cages_controller');
const passport = require('passport');
const auth = require('./authentication.js');

// Protected Routes
router.get('/cages/new', auth.checkPermission, CageController.new);
router.post('/cages/create', auth.checkPermission, CageController.create);
router.get('/cages/:id', auth.checkPermission, CageController.show);
router.post('/cages/:id', auth.checkPermission, CageController.update);
router.delete('/cages/:id', auth.checkPermission, CageController.delete);
router.get('/cages', auth.checkPermission, CageController.index);
router.get('/profile', auth.checkPermission, UserController.profile);
// Unprotected Routes
router.get('/', UserController.index);
router.get('/signup', UserController.new);
router.post('/signup', UserController.createAccount);
router.get('/signin', UserController.signin);
router.post('/signin', passport.authenticate('local'), UserController.verify);
router.get('/logout', UserController.logout);

module.exports = router;
