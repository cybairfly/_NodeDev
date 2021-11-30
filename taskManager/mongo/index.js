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

    client
        .db(dbName)
        .collection('users')
        .insertOne({
            name: 'Tobey',
            age: 33
        }).then(inserted => {
            client.db(dbName)
                .collection('users')
                .findOne({name: 'Tobey'})
                .then((verified) => {
                    console.log({inserted, verified});
                }).catch((error) => {
                    console.log(error);
                });
        }).catch((error) => {
            console.error(error);
        });

    client
        .db(dbName)
        .collection('tasks')
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
        ])
        .then((result) => {
            console.log({result});
        })
        .catch((error) => {
            console.error(error);
        });

    client
        .db(dbName)
        .collection('tasks')
        .estimatedDocumentCount()
        .then((count) => {
            console.log({count});
        })
        .catch((error) => {
            console.error(error);
        });

});