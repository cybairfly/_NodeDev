const {MongoClient, ObjectId} = require('mongodb');

const url = process.env.MONGO_URL;
const dbName = 'task-manager-testing';

const id = new ObjectId();
console.log(id.getTimestamp());
console.log(`ID size is half in binary: ${id.id.length} < ${id.toHexString().length}`);

MongoClient.connect(url, {
    useNewUrlParser: true,
}, (error, client) => {
    if (error)
        return console.error('Unable to connect to DB', error);

    console.log('Connected to MongoDB server');

    const users = client.db(dbName).collection('users');
    const tasks = client.db(dbName).collection('tasks');

    users.drop().catch(() => {});
    tasks.drop().catch(() => {});

    users
        .insertOne({
            name: 'Tobey',
            age: 33
        }).then(inserted => {
            users
                .updateOne({name: 'Tobey'}, {$inc: {age: 1}})
                .then(updated => {
                    users
                        .findOne({name: 'Tobey'})
                        .then((verified) => {
                            console.log({inserted, updated, verified});
                        });
                });
        });

    users
        // returns cursor/pointer only for more flexibility/operations
        .find({name: 'Tobey'})
        .count()
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
                done: true,
            },
            {
                task: 'Buy cheese',
                done: true,
            }
        ]).then((inserted) => {
            tasks
                .updateMany({done: false}, {$set: {done: true}})
                .then(updated => {
                    console.log({updated});
                });
        })

    tasks
        .estimatedDocumentCount()
        .then((count) => {
            console.log({count});
        });

    tasks
        // returns cursor/pointer only for more flexibility/operations
        .find({done: true})
        .toArray()
        .then((tasks) => {
            console.log({tasks});
        });
});