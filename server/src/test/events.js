process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const getNextSequence = require('../utils/getNextId');
const Counter = require('../models/Counter');
const Event = require('../models/Event');
const server = require('../index');

const { expect } = chai;

chai.use(chaiHttp);

describe('Event controller', () => {
  let dbEvent;
  let event;

  beforeEach(async () => {
    await Counter.deleteMany({});

    dbEvent = {
      _id: await getNextSequence('eventId'),
      firstName: 'Robert',
      lastName: 'Smith',
      email: 'robertsmith@gmail.com',
      date: '2/1/2019',
    };

    event = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      date: '10/10/2018',
    };

    await Event.deleteMany({});
    await Event.create(dbEvent);
  });

  const expectResponse = (res, expectedResBody) => {
    const { body, status } = res;
    expect(status).to.be.equal(expectedResBody.statusCode);
    expect(body.statusCode).to.be.equal(expectedResBody.statusCode);
    expect(body.error).to.be.equal(expectedResBody.error);
    expect(body.message).to.be.equal(expectedResBody.message);
  };

  describe('GET /api/events', () => {
    it('should return all events when request is valid', () => {
      chai.request(server)
        .get('/api/events')
        .end((err, res) => {
          const { status, body } = res;

          expect(status).to.be.equal(200);
          expect(body).to.be.an('array');
          expect(body).to.have.lengthOf(1);

          expect(body[0].firstName).to.be.equal(dbEvent.firstName);
          expect(body[0].lastName).to.be.equal(dbEvent.lastName);
          expect(body[0].email).to.be.equal(dbEvent.email);
          expect(body[0]._id).to.be.equal(dbEvent._id);
        });
    });
  });


  describe('POST /api/events', () => {
    it('should create event when request is valid', async () => {
      const res = await chai.request(server)
        .post('/api/events')
        .send(event);

      const { status, body } = res;
      const createdEvent = await Event.findOne({ _id: body._id });

      expect(status).to.be.equal(201);
      expect(body.firstName).to.be.equal(event.firstName);
      expect(body.lastName).to.be.equal(event.lastName);
      expect(body.email).to.be.equal(event.email);
      expect(createdEvent.firstName).to.be.equal(event.firstName);
      expect(createdEvent.lastName).to.be.equal(event.lastName);
      expect(createdEvent.email).to.be.equal(event.email);
    });

    it('should not create event while request body is empty', () => {
      const requestBody = {};
      const expectedResponseBody = {
        statusCode: 400,
        error: 'Bad Request',
        message: 'child "firstName" fails because ["firstName" is required]',
      };

      chai.request(server)
        .post('/api/events')
        .send(requestBody)
        .end((err, res) => {
          expectResponse(res, expectedResponseBody);
        });
    });

    it('should not create event while firstName is empty', () => {
      const requestBody = { ...event, firstName: '' };
      const expectedResponseBody = {
        statusCode: 400,
        error: 'Bad Request',
        message: 'child "firstName" fails because ["firstName" is not allowed to be empty]',
      };

      chai.request(server)
        .post('/api/events')
        .send(requestBody)
        .end((err, res) => {
          expectResponse(res, expectedResponseBody);
        });
    });

    it('should not create event while lastName is empty', () => {
      const requestBody = { ...event, lastName: '' };
      const expectedResponseBody = {
        statusCode: 400,
        error: 'Bad Request',
        message: 'child "lastName" fails because ["lastName" is not allowed to be empty]',
      };

      chai.request(server)
        .post('/api/events')
        .send(requestBody)
        .end((err, res) => {
          expectResponse(res, expectedResponseBody);
        });
    });

    it('should not create event while email is empty', () => {
      const requestBody = { ...event, email: '' };
      const expectedResponseBody = {
        statusCode: 400,
        error: 'Bad Request',
        message: 'child "email" fails because ["email" is not allowed to be empty]',
      };

      chai.request(server)
        .post('/api/events')
        .send(requestBody)
        .end((err, res) => {
          expectResponse(res, expectedResponseBody);
        });
    });

    it('should not create event while email is invalid', () => {
      const requestBody = { ...event, email: 'wrong.email@' };
      const expectedResponseBody = {
        statusCode: 400,
        error: 'Bad Request',
        message: 'child "email" fails because ["email" must be a valid email]',
      };

      chai.request(server)
        .post('/api/events')
        .send(requestBody)
        .end((err, res) => {
          expectResponse(res, expectedResponseBody);
        });
    });

    it('should not create event while date is empty', () => {
      const requestBody = { ...event, date: '' };
      const expectedResponseBody = {
        statusCode: 400,
        error: 'Bad Request',
        message: 'child "date" fails because ["date" is not allowed to be empty]',
      };

      chai.request(server)
        .post('/api/events')
        .send(requestBody)
        .end((err, res) => {
          expectResponse(res, expectedResponseBody);
        });
    });
  });

  describe('PUT /api/events', () => {
    it('should update event when request is valid', () => {
      const { _id } = dbEvent;
      const valuesToUpdate = { firstName: 'Eric', email: 'ericdoe@gmail.com' };
      const requestBody = { ...event, ...valuesToUpdate };

      chai.request(server)
        .put(`/api/events/${_id}`)
        .send(requestBody)
        .end(async (err, res) => {
          const { status, body } = res;
          const updatedEvent = await Event.findOne({ _id: body._id });

          expect(status).to.be.equal(200);
          expect(body.firstName).to.be.equal(valuesToUpdate.firstName);
          expect(body.lastName).to.be.equal(event.lastName);
          expect(body.email).to.be.equal(valuesToUpdate.email);

          expect(updatedEvent.firstName).to.be.equal(valuesToUpdate.firstName);
          expect(updatedEvent.lastName).to.be.equal(event.lastName);
          expect(updatedEvent.email).to.be.equal(valuesToUpdate.email);
        });
    });

    it('should not update event while request body is empty', () => {
      const { _id } = dbEvent;
      const requestBody = {};
      const expectedResponseBody = {
        statusCode: 400,
        error: 'Bad Request',
        message: 'child "firstName" fails because ["firstName" is required]',
      };

      chai.request(server)
        .put(`/api/events/${_id}`)
        .send(requestBody)
        .end((err, res) => {
          expectResponse(res, expectedResponseBody);
        });
    });

    it('should not update event while firstName is empty', () => {
      const { _id } = dbEvent;
      const requestBody = { ...event, firstName: '' };
      const expectedResponseBody = {
        statusCode: 400,
        error: 'Bad Request',
        message: 'child "firstName" fails because ["firstName" is not allowed to be empty]',
      };

      chai.request(server)
        .put(`/api/events/${_id}`)
        .send(requestBody)
        .end((err, res) => {
          expectResponse(res, expectedResponseBody);
        });
    });

    it('should not update event while lastName is empty', () => {
      const { _id } = dbEvent;
      const requestBody = { ...event, lastName: '' };
      const expectedResponseBody = {
        statusCode: 400,
        error: 'Bad Request',
        message: 'child "lastName" fails because ["lastName" is not allowed to be empty]',
      };

      chai.request(server)
        .put(`/api/events/${_id}`)
        .send(requestBody)
        .end((err, res) => {
          expectResponse(res, expectedResponseBody);
        });
    });

    it('should not update event while email is empty', () => {
      const { _id } = dbEvent;
      const requestBody = { ...event, email: '' };
      const expectedResponseBody = {
        statusCode: 400,
        error: 'Bad Request',
        message: 'child "email" fails because ["email" is not allowed to be empty]',
      };

      chai.request(server)
        .put(`/api/events/${_id}`)
        .send(requestBody)
        .end((err, res) => {
          expectResponse(res, expectedResponseBody);
        });
    });

    it('should not update event while email is invalid', () => {
      const { _id } = dbEvent;
      const requestBody = { ...event, email: 'wrong.email@' };
      const expectedResponseBody = {
        statusCode: 400,
        error: 'Bad Request',
        message: 'child "email" fails because ["email" must be a valid email]',
      };

      chai.request(server)
        .put(`/api/events/${_id}`)
        .send(requestBody)
        .end((err, res) => {
          expectResponse(res, expectedResponseBody);
        });
    });

    it('should not update event while date is empty', () => {
      const { _id } = dbEvent;
      const requestBody = { ...event, date: '' };
      const expectedResponseBody = {
        statusCode: 400,
        error: 'Bad Request',
        message: 'child "date" fails because ["date" is not allowed to be empty]',
      };

      chai.request(server)
        .put(`/api/events/${_id}`)
        .send(requestBody)
        .end((err, res) => {
          expectResponse(res, expectedResponseBody);
        });
    });


    it('should not update event while id is invalid', () => {
      const _id = 'invalid';
      const requestBody = { ...event };
      const expectedResponseBody = {
        statusCode: 400,
        error: 'Bad Request',
        message: 'child "id" fails because ["id" must be a number]',
      };

      chai.request(server)
        .put(`/api/events/${_id}`)
        .send(requestBody)
        .end((err, res) => {
          expectResponse(res, expectedResponseBody);
        });
    });

    it('should not update event while id is missing', () => {
      const requestBody = { ...event };
      const expectedResponseBody = {
        statusCode: 400,
        error: 'Bad Request',
        message: 'child "id" fails because ["id" must be a number]',
      };

      chai.request(server)
        .put('/api/events/')
        .send(requestBody)
        .end((err, res) => {
          expectResponse(res, expectedResponseBody);
        });
    });

    it('should not update event while id do not match', () => {
      const requestBody = { ...event };
      const expectedResponseBody = {
        statusCode: 404,
        error: 'Not Found',
        message: 'Not Found',
      };

      chai.request(server)
        .put('/api/events/999')
        .send(requestBody)
        .end((err, res) => {
          expectResponse(res, expectedResponseBody);
        });
    });
  });

  describe('DELETE /api/events/:id', () => {
    it('should delete event when request is valid', async () => {
      const { _id } = dbEvent;

      chai.request(server)
        .delete(`/api/events/${_id}`)
        .end(async (err, res) => {
          const { status } = res;
          const events = await Event.find({});

          expect(status).to.be.equal(200);
          expect(events).to.have.lengthOf(0);
        });
    });


    it('should not delete event when id is invalid', async () => {
      const _id = 'wrongId';

      chai.request(server)
        .delete(`/api/events/${_id}`)
        .end(async (err, res) => {
          const { status } = res;
          const { statusCode, error, message } = res.body;

          expect(status).to.be.equal(400);
          expect(statusCode).to.be.equal(400);
          expect(error).to.be.equal('Bad Request');
          expect(message).to.be.equal('child "id" fails because ["id" must be a number]');
        });
    });

    it('should not delete event when id is missing', async () => {
      chai.request(server)
        .delete('/api/events/')
        .end(async (err, res) => {
          const { status } = res;
          const { statusCode, error, message } = res.body;

          expect(status).to.be.equal(400);
          expect(statusCode).to.be.equal(400);
          expect(error).to.be.equal('Bad Request');
          expect(message).to.be.equal('child "id" fails because ["id" must be a number]');
        });
    });

    it('should not delete event with id do not match', async () => {
      const _id = '999';

      chai.request(server)
        .delete(`/api/events/${_id}`)
        .end(async (err, res) => {
          const { status } = res;
          const { statusCode, error, message } = res.body;

          expect(status).to.be.equal(404);
          expect(statusCode).to.be.equal(404);
          expect(error).to.be.equal('Not Found');
          expect(message).to.be.equal('Not Found');
        });
    });
  });
});
