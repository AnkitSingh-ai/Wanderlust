const mongoose = require('mongoose');
const schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// Define the user schema
const userSchema = new schema({

  email: {
    type: String,
    required: true,
    unique: true,
  }
   });
  userSchema.plugin(passportLocalMongoose);

  module.exports = mongoose.model('User', userSchema);
