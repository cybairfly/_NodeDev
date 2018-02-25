const request = require('supertest');
const expect = require('expect');

const server = require('./server.js');
var app = server.app;

describe('server', () => {
  describe('GET /', () => {
    it('should return up and running', (done) => {
      request(app)
      .get('/')
      .expect(404)
      .expect((res) => {
        expect(res.body).toInclude({
          error: 'Down and stopping'
        });
      })
      .end(done);
    });
  });

  describe('GET /', () => {
    it('should return users object', (done) => {
      request(app)
      .get('/users')
      .expect(200)
      .expect(function(res) {
        expect(res.body).toInclude({
          name: 'Tobey',
          type: 'human'
        });
      })
      .end(done);
    });
  });
});
