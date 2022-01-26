global.isTest = true;

const request = require('supertest');
const app = require('../app/app');
const Task = require('../app/models/task');
const {testUsers, testTasks, initializeDatabase} = require('./fixtures/db');

const [testUser1, testUser2] = testUsers;

beforeEach(initializeDatabase);

test('create task', async () => {
    const name = 'test task';
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${testUser1.tokens[0].token}`)
        .send({
            name,
        })
        .expect(201);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.name).toBe(name);
    expect(task.done).toBe(false);
});

test('get tasks of one user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${testUser1.tokens[0].token}`)
        .send()
        .expect(200);

    const tasks = await Task.find({user: testUser1._id});
    expect(tasks.length).toBe(testTasks.filter(task => task.user === testUser1._id).length);
    // expect(response.body.length).toBe(testTasks.filter(task => task.user === testUser1._id).length);
});

test('fail to delete task of another user', async () => {
    const response = await request(app)
        .delete('/tasks/testTask3')
        .set('Authorization', `Bearer ${testUser1.tokens[0].token}`)
        .send()
        .expect(404);

    const tasks = await Task.find({user: testUser2._id});
    expect(tasks.length).toBe(testTasks.filter(task => task.user === testUser2._id).length);
    // expect(response.body.length).toBe(testTasks.filter(task => task.user === testUser2._id).length);
});
