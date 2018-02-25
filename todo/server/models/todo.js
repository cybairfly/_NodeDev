const db = require('mongoose');

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
  ToDo
}
