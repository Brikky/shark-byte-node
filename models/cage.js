const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CageSchema = new Schema({
  html: String,
  style: String,
  script: String,
  name: String,
  dbRef: String,
  public: {
    type: Boolean,
    default: false
  }
});

const Cage = mongoose.model('Cage', CageSchema);

module.exports = Cage;
