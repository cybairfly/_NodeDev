const mongoose = require('mongoose');

const connect = isTest => {
    const url = `${process.env.MONGO_URL}/task-manager${global.isTest ? '-test' : ''}`;

    const db = mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    // fix deprecation warnings
    // useFindAndModify: false,
    });

    mongoose.connection.collection('users').drop().catch(() => {});
    mongoose.connection.collection('tasks').drop().catch(() => {});

    return db;
};

const db = connect();

module.exports = db;
