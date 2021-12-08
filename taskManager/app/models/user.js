const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator').default;

// prepare in advance to enable hook injection
const schema = new mongoose.Schema({
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
    mail: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Invalid email');
        },
    },
    age: {
        type: Number,
        required: true,
        default: 18,
        validate(value) {
            if (!value)
                throw new Error('Age must be a positive number');
        },
    },
    // allow multiple tokens for the same user
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }],
});

schema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user)
        throw new Error('Invalid username');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        throw new Error('Invalid password');

    return user;
};

schema.methods.generateAuthToken = async function () {
    const token = jwt.sign({
        username: this.username,
        _id: this._id.toString(),
    }, process.env.JWT_SECRET || 'jwtsecret');

    // add token to tokens array to allow multiple tokens per user
    // new token must be an object as per schema!
    // this.tokens = {...this.tokens, token};
    this.tokens = [...this.tokens, {token}];

    await this.updateOne({ tokens: this.tokens });

    return token;
};

// automatic password hashing
schema.pre([
    'save',
    // direct mongo methods skip middleware like password hashing or password property is nested ?
    'updateOne',
    // 'findOneAndUpdate',
], async function (next) {
    // this = model || model.Query - depending on operation - not request input
    if (this.password || (this.isModified && this.isModified('password')))
        this.password = await bcrypt.hash(this.password, 10);

    next();
});

const User = mongoose.model('User', schema);

module.exports = User;
