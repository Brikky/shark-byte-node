var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Cage = require('./cage');

var UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, },
    cages: [Cage.schema]
});

UserSchema.plugin(passportLocalMongoose);


var User = mongoose.model('User', UserSchema);
module.exports = User;
