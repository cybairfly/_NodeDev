const express = require('express');

// requests get stuck w/o this!!!
const db = require('./db');

const routers = {};
routers.users = require('./routers/users');
routers.tasks = require('./routers/tasks');

const app = express();

// middleware to stop exectution with no call to next()
// app.use((req, res, next) =>
//     res
//         .status(503)
//         .send('Website is under maintenance.'));

// automatic parsing of json
// must come before router to work!!!
app.use(express.json());

app.use(routers.users);
app.use(routers.tasks);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
