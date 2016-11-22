var express = require("express");
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

router.use("/users", require("./views/users"));
router.use("/cages", require("./views/cages"));
// router.get('/profile', auth, ctrlProfile.profileRead);

module.exports = router;
