// const Mongo = require('mongodb').MongoClient;
const {MongoClient: Mongo, ObjectID} = require('mongodb');

// const urlDB = `mongodb://cyberfly:3N%2B3rin9@cloudb-shard-00-00-t5bev.mongodb.net:27017,cloudb-shard-00-01-t5bev.mongodb.net:27017,cloudb-shard-00-02-t5bev.mongodb.net:27017?ssl=true&replicaSet=CloudB-shard-0&authSource=admin`;
const urlDB = `mongodb://admin:3n73rin9@ds141068.mlab.com:41068/cloudb`;

Mongo.connect(urlDB, (error, client) => {
  if (error) return console.log(`Unable to connect to mongodb`);
  console.log(`Connected`);

  const db = client.db('cloudb');

  // db.collection('Users').insertOne(
  //   {
  //     name: `Vasek`,
  //     nick: `Tobey`
  //   },
  //   (e, r) => console.log(e ? e : r.ops)
  // );

  db.collection('Users')
  .find({
    name: `Vasek`
  })
  .toArray()
  .then(
    docs => {
      console.log(JSON.stringify(docs, null, 2));
    },
    error => {
      console.log(`Unable to fetch data`);
    }
  );

    // db.collection('ToDo')
    // .find({
    //   _id: ObjectID(`5a8ae17f7ee3d4587b5c6445`)
    // })
    // .toArray()
    // .then(
    //   docs => {
    //     console.log(JSON.stringify(docs, null, 2));
    //   },
    //   error => {
    //     console.log(`Unable to fetch data`);
    //   }
    // );

  // db.collection('ToDo')
  // .find()
  // .count()
  // .then(
  //   count => {
  //     console.log(`${count} records found`);
  //   },
  //   error => {
  //     console.log(`Unable to fetch data`);
  //   });


  // client.close();
});
