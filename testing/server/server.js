const express = require('express');

var app = express();

app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Down and stopping',
    type: 'test'
  });
});

app.get('/users', (req, res) => {
  res.send([
    {
      name: 'Tobey',
      type: 'human'
    },
    {
      name: 'Vasek',
      type: 'human'
    }
  ])
});

app.listen(3000);

module.exports = {
  app
};
