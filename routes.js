var express = require("express");
var router = express.Router();
var UserController = require("./controllers/users_controller");
var CageController = require("./controllers/cages_controller");
var passport = require('passport');

//home page
router.get("/", UserController.index);
//default cage
router.get("/cages", CageController.index);
//profile
router.get("/profile", UserController.profile);
//cage creation
router.get("/cages/new", CageController.new);

//account routes
router.get("/signup", UserController.new);
router.post('/signup', UserController.createAccount);
router.get('/signin', UserController.signin);
router.post('/signin', passport.authenticate('local'), UserController.verify);
router.get('/logout', UserController.logout);

module.exports = router;
