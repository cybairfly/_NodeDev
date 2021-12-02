const db = require('../app/db');
const User = require('../app/models/user');
const Task = require('../app/models/task');

(async () => {

    const user = new User({username: ' Tobey ', password: 'passfork', age: 33, mail: 'TesT@TesT.COM'});

    await user
        .save()
        .then(result => {
            console.log('User saved', result);
        }).catch((error) => {
            console.log('Error saving user', error);
        });

    await User
        .findOne({username: 'Tobey'})
        .then(result => console.log(result))
        .then(() => User.updateOne({age: 33}, {age: 34}))
        .then(() => User.findOne({age: 34}))
        .then(result => console.log(result))
        .then(() => User.countDocuments({age: 34}))
        .then(result => console.log(result))


    const tasks = [
        new Task({name: 'Do stuff', done: true}),
        new Task({name: 'Do thing', done: true}),
        new Task({name: 'Do more', done: false})
    ]

    await Promise.all(tasks.map(task => task
        .save()
        .then(result => {
            console.log('Task saved', result);
        }).catch((error) => {
            console.log('Error saving task', error);
        })));

    await Task
        // .deleteMany({done: true})
        .findOneAndDelete({done: false})
        .then(result => console.log(result))
        .then(() => Task.countDocuments())
        .then(result => console.log(result))

})();