const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/tasks', (req, res) => {
  Task.find({}).then(tasks => {
    res.json(tasks);
  }).catch(error => {
    res
      .status(500)
      .send(error);
  });
});

router.get('/tasks/:name', (req, res) => {
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

router.post('/tasks', (req, res) => {
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

router.patch('/tasks/:name', async (req, res) => {
  const updateError = await Task
    .validate(req.body)
    .catch(error => error);

  console.log(updateError);
  if (updateError)
    return res.status(400).send({error: updateError});

  Task.findOneAndUpdate({name: req.params.name}, req.body, {
    // return updated user instead original
    new: true,
    // ensure updated user matches original schema
    runValidators: true
  }).then(task => {
    if (!task)
      return res.status(404).send();

    res.send(task);
  }).catch(error => {
    res
      .status(400)
      .send(error);
  })
});

router.delete('/tasks/:name', (req, res) => {
  Task.findOneAndDelete({name: req.params.name})
    .then(task => {
      if (!task)
        return res.status(404).send();

      res.status(204).json(task);
    })
    .catch(error => {
      res
        .status(500)
        .send(error);
    })
});

module.exports = router;