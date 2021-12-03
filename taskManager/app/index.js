const express = require('express');

// requests get stuck w/o this!!!
const db = require('./db');

const routers = {
  users: require('./routers/users'),
  tasks: require('./routers/tasks'),
}

const app = express();

// automatic parsing of json
// must come before router to work!!!
app.use(express.json());

app.use(routers.users);
app.use(routers.tasks);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});