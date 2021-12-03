const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/users', (req, res) => {
    User.find({}).then(users => {
        res.json(users);
    }).catch(error => {
        res
            .status(500)
            .send(error);
    });
});

router.get('/users/:name', (req, res) => {
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
        });
});

router.post('/users', (req, res) => {
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

router.patch('/users/:name', async (req, res) => {
    // custom validation
    const currentUpdates = Object.keys(req.body);
    const allowedUpdates = ['username', 'password', 'mail', 'age'];
    const isValidUpdate = currentUpdates.every(update => allowedUpdates.includes(update));

    // custom validation alternative
    const updateError = await User
        .validate(req.body, allowedUpdates)
        .catch(error => error);

    if (!isValidUpdate || updateError)
        return res.status(400).send({error: updateError || 'Invalid updates!'});

    User.findOneAndUpdate({username: req.params.name}, req.body, {
    // return updated user instead original
        new: true,
        // ensure updated user matches original schema
        runValidators: true,
    }).then(user => {
        if (!user)
            return res.status(404).send();

        res.send(user);
    }).catch(error => {
        res
            .status(400)
            .send(error);
    });
});

router.delete('/users/:name', (req, res) => {
    User.findOneAndDelete({username: req.params.name})
        .then(user => {
            if (!user)
                return res.status(404).send();

            res.status(204).json(user);
        })
        .catch(error => {
            res
                .status(500)
                .send(error);
        });
});

module.exports = router;
