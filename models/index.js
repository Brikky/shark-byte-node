module.exports.User = require("./user");


var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://127.0.0.1/SharkByte" );


module.exports.User = require("./user");
module.exports.Cage = require("./cage");