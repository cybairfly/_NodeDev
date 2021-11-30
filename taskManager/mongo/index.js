const {MongoClient, ObjectId} = require('mongodb');

const url = process.env.MONGO_URL;
const dbName = 'task-manager';

MongoClient.connect(url, {
    useNewUrlParser: true,
}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to DB');
    }
    console.log('Connected to MongoDB server');
});