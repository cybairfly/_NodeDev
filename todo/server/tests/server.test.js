const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {ToDo} = require('./../db/models');

const {ObjectID: OID} = require('mongodb');

const mockToDo = [
  {
    _id: OID(),
    text: `todo 1`
  },
  {
    _id: OID(),
    text: `todo 2`
  }
];

// init db before every test case below
beforeEach(done => {
  ToDo.remove({})
  .then(() => {
    return ToDo.insertMany(mockToDo);
  })
  .then(() => done());
});

describe('GET /todo', () => {
  it('should get 2 todo items', (done) => {
    request(app)
    .get('/todo')
    .expect(200)
    .expect(response => {
      expect(response.body.data.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET /todo/:id', () => {
  it('should get todo by id', (done) => {
    // generate string from hex buffer
    let id = mockToDo[0]._id.toString();

    request(app)
    .get(`/todo/${id}`)
    .expect(200)
    .expect(response => {
      expect(response.body.data.text).toEqual(mockToDo[0].text);
    })
    .end(done);
  });

  it('should return error 404', (done) => {
    // generate new random id
    let id = OID().toString();

    request(app)
    .get(`/todo/${id}`)
    .expect(404)
    .expect(response => {
      expect(response.text).toEqual(`Not found: id ${id}`)
    })
    .end(done);
  });

  it('should return error 400', (done) => {
    // generate hex id
    let id = OID()._id;

    request(app)
    .get(`/todo/${id}`)
    .expect(400)
    .expect(response => {
      expect(response.text).toEqual(`Invalid ID`);
    })
    .end(done);
  });

});

describe('POST /todo', () => {
  it('should create new todo', done => {
    let text = `Do stuff`;

    request(app)
    .post('/todo')
    .send({
      text
    })
    .expect(200)
    .expect(response => expect(response.body.text).toBe(text))
    .end((error, response) => {
      if (error) return done(error);
      ToDo.find({
        text
      })
      .then(data => {
        expect(data[0].done).toBe(false);
        expect(data[0].text).toBe(text);
        done();
      })
      .catch(e => done(e));
    });
  });

  it('should fail adding todo', done => {
    request(app)
    .post('/todo')
    .send('fail')
    .expect(400)
    .expect(response => {
      expect(response.body.errors).toBeTruthy();
    })
    .end((error, response) => {
      if (error) return done(error);
      ToDo.find()
      .then(data => {
        expect(data.length).toBe(2);
        done();
      })
      .catch(e => done(e));
    });
  });
});
