const mongoose = require('mongoose');

const url = `${process.env.MONGO_URL}/task-manager`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // fix deprecation warnings
    // useFindAndModify: false,
});

mongoose.connection.collection('users').drop().catch(() => {});
mongoose.connection.collection('tasks').drop().catch(() => {});