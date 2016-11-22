var express = require("express");
var router = express.Router();
var controller = require("./cages_controller");

router.get("/", controller.index);
// router.get("/:id", controller.show);

module.exports = router;
