const db = require('mongoose');

const User = db.model(`User`, {
  name: {
    type: String,
    minlength: 2,
    required: true,
    trim: true
  },
  mail: {
    type: String,
    minlength: 2,
    required: true,
    trim: true
  }
});

module.exports = {
  User
}
