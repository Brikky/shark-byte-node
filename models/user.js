const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Cage = require('./cage');

const UserSchema = new Schema({
  //TODO: make these required, unique, etc as appropriate
  username: String,
  password: String,
  headline: String,
  description: String,
  stackoverflow: String,
  github: String,
  cages: [Cage.schema]
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);
module.exports = User;
