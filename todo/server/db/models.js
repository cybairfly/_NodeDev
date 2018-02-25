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

const ToDo = db.model(`ToDo`, {
  text: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  done: {
    type: Boolean,
    default: false
  },
  doneTime: {
    type: Number,
    default: Date.now()
  }
});

module.exports = {
  User,
  ToDo
}
