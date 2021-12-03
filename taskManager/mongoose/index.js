const mongoose = require('mongoose');
const validator = require('validator').default;

const url = `${process.env.MONGO_URL}/task-manager`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.collection('users').drop().catch(() => {});
mongoose.connection.collection('tasks').drop().catch(() => {});

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
        },
    },
    age: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if (!value)
                throw new Error('Age must be a positive number');
        },
    },
    mail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Invalid email');
        },
    },
});

const user = new User({username: ' Tobey ', password: 'passfork', age: 33, mail: 'TesT@TesT.COM'});

user
    .save()
    .then(result => {
        console.log('User saved', result);
    }).catch(error => {
        console.log('Error saving user', error);
    });

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

const task = new Task({name: 'Do stuff', done: false});

task
    .save()
    .then(result => {
        console.log('Task saved', result);
    }).catch(error => {
        console.log('Error saving task', error);
    });
