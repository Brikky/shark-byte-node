var express = require("express");
var router = express.Router();
var UserController = require("./controllers/users_controller");
var CageController = require("./controllers/cages_controller");
var passport = require('passport');

//home page
router.get("/", UserController.index);
//cages
router.get("/cages/new", CageController.new);
router.post("/cages/create", CageController.create);
router.get("/cages/:id", CageController.show);
router.post("/cages/:id", CageController.update);
router.get("/cages", CageController.index);
//profile
router.get("/profile", UserController.profile);
//account routes
router.get("/signup", UserController.new);
router.post('/signup', UserController.createAccount);
router.get('/signin', UserController.signin);
router.post('/signin', passport.authenticate('local'), UserController.verify);
router.get('/logout', UserController.logout);

module.exports = router;
