const {MongoClient, ObjectId} = require('mongodb');

const url = process.env.MONGO_URL;
const dbName = 'task-manager';

const id = new ObjectId();
console.log(id.getTimestamp());
console.log(`ID size is half in binary: ${id.id.length} < ${id.toHexString().length}`);

MongoClient.connect(url, {
    useNewUrlParser: true,
}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to DB');
    }
    console.log('Connected to MongoDB server');

    const users = client.db(dbName).collection('users');
    const tasks = client.db(dbName).collection('tasks');

    users
        .insertOne({
            name: 'Tobey',
            age: 33
        }).then(inserted => {
            users
                .findOne({name: 'Tobey'})
                .then((verified) => {
                    console.log({inserted, verified});
                });
        });

    users
        // returns cursor/pointer only for more flexibility/operations
        .find({name: 'Tobey'})
        .toArray()
        .then((results) => {
            console.log({results});
        });

    tasks
        .insertMany([
            {
                task: 'Buy milk',
                done: false,
            },
            {
                task: 'Buy bread',
                done: false,
            },
            {
                task: 'Buy cheese',
                done: false,
            }
        ]).then((result) => {
            console.log({result});
        });

    tasks
        .estimatedDocumentCount()
        .then((count) => {
            console.log({count});
        });

    tasks
        // returns cursor/pointer only for more flexibility/operations
        .find({done: false})
        .count()
        .then((count) => {
            console.log({count});
        });
});