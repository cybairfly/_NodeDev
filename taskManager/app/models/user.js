const mongoose = require('mongoose');
const validator = require('validator').default;

const User = mongoose.model('User', {
  username: {
      type: String,
      required: true,
      trim: true,
  },
  password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
          if (value.toLowerCase().includes('password'))
              throw new Error('Password cannot contain "password"');
      }
  },
  age: {
      type: Number,
      required: true,
      default: 18,
      validate(value) {
          if (!value)
              throw new Error('Age must be a positive number');
      }
  },
  mail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate(value) {
          if (!validator.isEmail(value))
              throw new Error('Invalid email');
      }
  }
});

module.exports = User;