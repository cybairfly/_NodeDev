const express = require('express');
const mongoose = require('mongoose');

const db = require('./db');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

// automatic parsing of json
app.use(express.json());

app.get('/users', (req, res) => {
  User.find({}).then(users => {
    res.json(users);
  }).catch(error => {
    res
      .status(500)
      .send(error);
  });
});

app.get('/users/:name', (req, res) => {
  User.find({username: req.params.name})
    .then(user => {
      if (!user)
        res.status(404).send('User not found');
      else
        res.json(user);
    })
    .catch(error => {
      res
        .status(500)
        .send(error);
    })
});

app.post('/users', (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res
        .status(201)
        .send(user);
    }).catch(error => {
      res
        .status(400)
        .send(error);
    });
});

app.get('/tasks', (req, res) => {
  Task.find({}).then(tasks => {
    res.json(tasks);
  }).catch(error => {
    res
      .status(500)
      .send(error);
  });
});

app.get('/tasks/:name', (req, res) => {
  console.log(req.params.name);
  Task.find({name: req.params.name})
    .then(task => {
      if (!task)
        res.status(404).send('Task not found');
      else
        res.json(task);
    })
    .catch(error => {
      res
        .status(500)
        .send(error);
    })
});

app.post('/tasks', (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res
        .status(201)
        .send(task);
    }).catch(error => {
      res
        .status(400)
        .send(error);
    });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});