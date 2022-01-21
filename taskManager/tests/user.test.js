global.isTest = true;

const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../app/app');
const User = require('../app/models/user');

const testUserId = new mongoose.Types.ObjectId();
const testUser = {
    _id: testUserId,
    username: 'testuser',
    password: 'passfork',
    mail: 'test@mail.com',
    tokens: [{
        token: jwt.sign({_id: testUserId}, process.env.JWT_SECRET || 'jwtsecret'),
    }],
};

beforeEach(async () => {
    await User.deleteMany({});
    await User.create(testUser);
    // alternative
    // await new User(testUser).save();
});

test('user signup', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            username: 'unique',
            password: 'passfork',
            mail: 'test@uniq.com',
        })
        .expect(201);

    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
    expect(response.body).toMatchObject({
        user: {
            username: 'unique',
            mail: 'test@uniq.com',
        },
        token: user.tokens[0].token,
    });
    expect(user.password).not.toBe('passfork');
});

test('user login', async () => {
    const response = await request(app)
        .post('/users/login')
        .send(testUser)
        .expect(200);

    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
    expect(user.tokens.length).toBe(2);
    expect(response.body.token).toBe(user.tokens[1].token);
});

test('user login with wrong password', async () => {
    await request(app)
        .post('/users/login')
        .send({
            ...testUser,
            password: 'wrong',
        }).expect(401);
});

test('user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .send()
        .expect(200);
});

test('user profile with no auth', async () => {
    await request(app)
        .get('/users/me')
        .expect(401);
});

test('delete user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .send()
        .expect(204);

    const user = await User.findById(testUserId);
    expect(user).toBeNull();
});

test('delete user with no auth', async () => {
    await request(app)
        .delete('/users/me')
        .expect(401);
});
