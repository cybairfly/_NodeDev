// const Mongo = require('mongodb').MongoClient;
const {MongoClient: Mongo, ObjectID} = require('mongodb');

// const urlDB = `mongodb://cyberfly:3N%2B3rin9@cloudb-shard-00-00-t5bev.mongodb.net:27017,cloudb-shard-00-01-t5bev.mongodb.net:27017,cloudb-shard-00-02-t5bev.mongodb.net:27017?ssl=true&replicaSet=CloudB-shard-0&authSource=admin`;
const urlDB = `mongodb://admin:3n73rin9@ds141068.mlab.com:41068/cloudb`;

Mongo.connect(urlDB, (error, client) => {
  if (error) return console.log(`Unable to connect to mongodb`);
  console.log(`Connected`);

  const db = client.db('cloudb');

  db.collection('ToDo').insertOne({
    todo: `do somethin`,
    done: false
  }, (error, result) => {
    if (error) return console.log(`Unable to insert`, error);
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), null, 2));
  });

  // db.collection('ToDo').find({}, (error, result) => {
  //     if (error) return console.log(`Unable to insert`, error);
  //     console.log(JSON.stringify(result.ops, null, 2));
  //   });

  client.close();
});
