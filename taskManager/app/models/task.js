const mongoose = require('mongoose');
const validator = require('validator').default;

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
});

module.exports = Task;