const express = require('express');
const parser = require('body-parser');
const {ObjectID: OID} = require('mongodb');

// pull objects into variables
const {db} = require('./db/db');
const {User, ToDo} = require('./db/models');

const app = express().use(parser.json());

app.get('/todo', (req, res) => {
  ToDo.find()
  .then(data => {
    res.send({
      data
    });
  }, e => res.status(400).send(e));
});

app.get('/todo/:id', (req, res) => {
  let id = req.params.id;
  if(!OID.isValid(id)) return res.status(400).send(`Invalid ID`);
  ToDo.findById(id)
  .then(data => {
    if (!data) return res.status(404).send(`Not found: id ${id}`);
    res.status(200).send({
      data
    });
  })
  .catch(e => {
    res.status(400).send(`Error`);
  });
});

app.get('/user/:name', (req, res) => {
  let name = req.params.name;
  User.findOne({
    name
  })
  .then(data => {
    if (!data) return res.status(404).send(`Not found: user ${name}`);
    res.status(200).send({
      data
    });
  })
  .catch(e => {
    res.status(400).send(`Error`);
  });
});

app.post('/todo', (req, res) => {
  // console.log(req.body);
  // res.sendStatus(200);

  const todo = ToDo({
    text: req.body.text
  });

  todo.save()
  .then(data => res.status(200).send(data), e => res.status(400).send(e));
});

app.listen(3000, () => console.log(`Listening...`))


// const newUser = new User({
//   name: `Tobey`,
//   mail: `test@test.com`
// });
//
// const newToDo = new ToDo({
//   text: `default`,
// });
//
// newUser.save()
// .then(data => console.log(`User imported. \r\n`, data), e => console.log(e));
//
// newToDo.save()
// .then(data => console.log(`Data imported. \r\n`, data), e => console.log(e));\

module.exports = {
  app
}
