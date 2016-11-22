var express = require("express");
var router = express.Router();
var UserController = require("./controllers/users_controller");
var CageController = require("./controllers/cages_controller");
var passport = require('passport');

router.get("/cages", CageController.index);
router.get("/users", UserController.index);
router.get("/signup", UserController.new);
router.post('/signup', UserController.register);
router.get('/signin', UserController.signin);
router.post('/signin', passport.authenticate('local'), UserController.verify);
router.get('/logout', UserController.logout);

module.exports = router;
