const db = require('mongoose');

const urlDB = `mongodb://admin:3n73rin9@ds141068.mlab.com:41068/cloudb`;

//make mongoose use Promise
db.Promise = global.Promise;

db.connect(urlDB);

module.exports = {
  db
}
