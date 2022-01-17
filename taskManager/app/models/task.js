const mongoose = require('mongoose');
const validator = require('validator').default;

// use string reference to avoid circular dependency
// const User = require('./user');

const Task = mongoose.model('Task', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // link to user model for user ID
        ref: 'User',
    },
});

module.exports = Task;
