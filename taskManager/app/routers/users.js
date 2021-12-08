const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/user');
const access = require('../hooks/access');

const router = express.Router();

router.get('/users', access, (req, res) => {
    User.find({}).then(users => {
        res.json(users);
    }).catch(error => {
        res
            .status(500)
            .send(error);
    });
});

router.get('/users/me', access, (req, res) => {
    // from auth hook
    res.send(req.user);
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
        .then(async user => {
            const token = await user.generateAuthToken();
            return {user, token};
        })
        .then(({user, token}) => {
            res
                .status(201)
                .send({user, token});
        }).catch(error => {
            res
                .status(400)
                .send(error);
        });
});

router.post('/users/login', async (req, res) => {
    const user = await User
        // custom static schema method
        .findByCredentials(req.body.username, req.body.password)
        .catch(error => null);

    if (!user)
        return res.status(401).send('Invalid username or password');

    // custom instance method
    const token = await user.generateAuthToken();

    res.send({user, token});
});

router.post('/users/logout', access, async (req, res) => {
    // user assigned to request in access control
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);

    // avoid double password hashing on access token creation
    // await req.user.save();
    await req.user.updateOne({tokens: req.user.tokens});

    res.send('Logout success');
});

router.post('/users/logoutGlobal', access, async (req, res) => {
    // user assigned to request in access control
    req.user.tokens = [];
    await req.user.updateOne({tokens: req.user.tokens});

    res.send('Logout success for all tokens');
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

    // some mongoose methods skip middleware like password hashing
    // User.findOneAndUpdate({username: req.params.name}, req.body, {

    // prefer dynamic update and handle password hashing through hook
    // const update = {...req.body};
    // if (update.password)
    //     update.password = await bcrypt.hash(update.password, 10);
    // User.updateOne({username: req.params.name}, update)

    User
        .findOne({username: req.params.name})
        .then(async user => {
            currentUpdates.forEach(item => user[item] = req.body[item]);
            // autorun password hashing middleware on save
            if (user)
                await user.save();
            else
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
