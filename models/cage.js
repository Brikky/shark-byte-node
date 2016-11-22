var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CageSchema = new Schema({
  html: String,
  style: String,
  script: String
});

var Cage = mongoose.model('Cage', CageSchema);

module.exports = Cage;
