const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../app/models/user');
const Task = require('../../app/models/task');

const testUsers = [
    {
        _id: new mongoose.Types.ObjectId(),
        username: 'testUser1',
        password: 'passfork',
        mail: 'test@test.com',
    },
    {
        _id: new mongoose.Types.ObjectId(),
        username: 'testUser2',
        password: 'passfork',
        mail: 'test@mail.com',
    },
].map(user => ({
    ...user,
    tokens: [{
        token: jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'jwtsecret'),
    }],
}));

const testTasks = [
    {
        _id: new mongoose.Types.ObjectId(),
        name: 'testTask1',
        done: true,
        user: testUsers[0]._id,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: 'testTask2',
        done: true,
        user: testUsers[0]._id,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: 'testTask3',
        done: true,
        user: testUsers[1]._id,
    },
];

const initializeDatabase = async () => {
    await User.deleteMany({});
    await Task.deleteMany({});
    await Promise.all(testUsers
        .map(async user =>
            User.create(user)));
    // alternative
    // await new User(testUser).save();

    await Promise.all(testTasks
        .map(async task =>
            Task.create(task)));
};

module.exports = {
    initializeDatabase,
    testUsers,
    testTasks,
};
