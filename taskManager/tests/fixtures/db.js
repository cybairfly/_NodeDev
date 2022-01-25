const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../app/models/user');

const testUserId = new mongoose.Types.ObjectId();
const testUser = {
    _id: testUserId,
    username: 'testuser',
    password: 'passfork',
    mail: 'test@mail.com',
    tokens: [{
        token: jwt.sign({_id: testUserId}, process.env.JWT_SECRET || 'jwtsecret'),
    }],
};

const initializeDatabase = async () => {
    await User.deleteMany({});
    await User.create(testUser);
    // alternative
    // await new User(testUser).save();
};

module.exports = {
    initializeDatabase,
    testUserId,
    testUser,
};
