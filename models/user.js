const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
// define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});
// on save hook encrypt password
// before saving the model run
userSchema.pre('save', function (next) {
    // user model
  const user = this;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err); }

    // has the passw usng the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};

// create model class
const ModelClass = mongoose.model('user', userSchema);
// export model
module.exports = ModelClass;
