const bcrypt = require('bcrypt');
const express = require('express');

const User = require('../models/user');
const Task = require('../models/task');
const access = require('../hooks/access');

const router = express.Router();

router.get('/tasks', access, async (req, res) => {
    // alternative solution using references
    // await req.user
    //     .populate('tasks')
    //     .execPopulate();

    // res.send(req.user.tasks);

    Task.find({
        // reference to user in task model
        user: req.user._id,
    }).then(tasks => {
        res.json(tasks);
    }).catch(error => {
        res
            .status(500)
            .send(error);
    });
});

router.get('/tasks/:name', access, (req, res) => {
    Task.findOne({
        name: req.params.name,
        // reference to user in task model
        user: req.user._id,
    }).then(task => {
        if (!task)
            res.status(404).send('Task not found');
        else
            res.json(task);
    }).catch(error => {
        res
            .status(500)
            .send(error);
    });
});

router.post('/tasks', access, (req, res) => {
    const task = new Task({
        ...req.body,
        user: req.user._id,
    });

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

router.patch('/tasks/:name', access, async (req, res) => {
    const updateError = await Task
        .validate(req.body, ['name'])
        .catch(error => error);

    if (updateError)
        return res.status(400).send({error: updateError});

    // some mongoose methods skip middleware like password hashing
    // Task.findOneAndUpdate({name: req.params.name}, req.body, {

    Task.findOneAndUpdate({
        name: req.params.name,
        // reference to user in task model
        user: req.user._id,
    }, req.body, {
        // return updated user instead original
        new: true,
        // ensure updated user matches original schema
        runValidators: true,
    }).then(task => {
        if (!task)
            return res.status(404).send();

        res.send(task);
    }).catch(error => {
        res
            .status(400)
            .send(error);
    });
});

router.delete('/tasks/:name', access, (req, res) => {
    Task.findOneAndDelete({
        name: req.params.name,
        // reference to user in task model
        user: req.user._id,
    }).then(task => {
        if (!task)
            return res.status(404).send();

        res.status(204).json(task);
    }).catch(error => {
        res
            .status(500)
            .send(error);
    });
});

module.exports = router;
