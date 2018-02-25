const express = require('express');
const handle = require('hbs');
const fs = require('fs');

const port = process.env.port || 3000;

var app = express();

handle.registerPartials(`${__dirname}/views/partials`);
handle.registerHelper('getYear', () => {
  return new Date().getFullYear() + 1;
});
handle.registerHelper('toUpper', (text) => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('log.txt', log + '\n');
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     title: 'Maintenance'
//   });
// });

app.use(express.static(`${__dirname}/public`)); //last due to routing priority

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name: 'Tobey',
  //   likes: [
  //     'rain',
  //     'butterflies'
  //   ]
  // });
  res.render('root.hbs', {
    title: 'Root',
    name: 'Tobey'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    title: 'Projects'
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
