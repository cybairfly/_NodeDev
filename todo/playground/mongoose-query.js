const {db} = require('./../server/db/db');
const {User, ToDo} = require('./../server/db/models');

const {ObjectID: OID} = require('mongodb');

const id = '5a9055678442b2162856fa04';
const uid = '5a8c13a324b6f41dacc5f4af';

const json = (json) => JSON.stringify(json, null, 2);

if (!OID.isValid(id)) return console.log(`Invalid ID`);

ToDo.find({
  _id: id
})
.then(data => console.log(json(data)));

ToDo.findOne({
  done: false
})
.then(data => console.log(json(data)));

ToDo.findById(id)
.then((data) => {
  if (!data) return console.log(`Not found: id`, id);
  console.log(json(data));
})
.catch(console.log);

User.findById(uid)
.then((user) => {
  if (!user) return console.log(`Not found: user`, uid);
  console.log(json(user));
})
.catch(console.log);
