const expect = require('expect');
const rewire = require('rewire');

const app = rewire('./app.js');

describe('App', () => {
  var db = {
    saveUser: expect.createSpy()
  };

  app.__set__('db', db);

  it('should call the spy', () => {
    var spy = expect.createSpy();
    spy('Tobey');
    expect(spy).toHaveBeenCalledWith('Tobey');
  });

  it('should call saveUser with user object argument', () => {
    var mail = 'test@test.net', pass = 'test';

    app.handleSignup(mail, pass);
    expect(db.saveUser).toHaveBeenCalledWith({
      mail,
      pass
    });
  });

});
