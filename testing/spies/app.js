const db = require('./db.js');

let mail = 'test@test.net', pass = 'test';

module.exports.handleSignup = (mail, pass) => {
  db.saveUser({
    mail,
    pass
  });
};
