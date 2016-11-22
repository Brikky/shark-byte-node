var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Cage = require('./cage');

var UserSchema = new Schema({
    username: String,
    password: String,
    cages: [Cage.schema]
});

UserSchema.plugin(passportLocalMongoose);


var User = mongoose.model('User', UserSchema);
module.exports = User;
