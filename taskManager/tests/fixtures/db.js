const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../app/models/user');
const Task = require('../../app/models/task');

const testUsers = [
    {
        _id: new mongoose.Types.ObjectId(),
        username: 'testuser1',
        password: 'passfork',
        mail: 'test@test.com',
    },
    {
        _id: new mongoose.Types.ObjectId(),
        username: 'testuser2',
        password: 'passfork',
        mail: 'test@mail.com',
    },
].map(user => ({
    ...user,
    tokens: [{
        token: jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'jwtsecret'),
    }],
}));

const initializeDatabase = async () => {
    await Promise.all(testUsers.map(async user => {
        await User.deleteMany({});
        await User.create(user);
        // alternative
        // await new User(testUser).save();
    }));
};

module.exports = {
    initializeDatabase,
    testUsers,
};
