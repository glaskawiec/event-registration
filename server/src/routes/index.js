const joi = require('joi');
const eventController = require('../controllers/eventController');

const commonResponses = {
  400: {
    description: 'Bad Request',
    type: 'object',
    properties: {
      statusCode: { type: 'number' },
      error: { type: 'string' },
      message: { type: 'string' },
    },
  },
  500: {
    description: 'Internal Server Error',
    type: 'object',
    properties: {
      statusCode: { type: 'number' },
      error: { type: 'string' },
      message: { type: 'string' },
    },
  },
};

const routes = [
  {
    method: 'GET',
    url: '/api/events',
    schema: {
      summary: 'Get all events',
      response: {
        200: {
          description: 'OK',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'number' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              email: { type: 'string' },
              date: { type: 'string' },
              _v: { type: 'number' },
            },
          },
        },
        ...commonResponses,
      },
    },
    handler: eventController.getEvents,
  },
  {
    method: 'GET',
    url: '/api/events/:id',
    schema: {
      summary: 'Get event by id',
      params: joi.object().keys({
        id: joi.number().required(),
      }).required(),
      response: {
        200: {
          description: 'OK',
          type: 'object',
          properties: {
            _id: { type: 'number' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            date: { type: 'string' },
            _v: { type: 'number' },
          },
        },
        ...commonResponses,
      },
    },
    schemaCompiler: schema => data => joi.validate(data, schema),
    handler: eventController.getSingleEvent,
  },
  {
    method: 'POST',
    url: '/api/events',
    schema: {
      summary: 'Create new event',
      body: joi.object().keys({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().required().email(),
        date: joi.string().required(),
      }).required(),
      response: {
        201: {
          description: 'Created',
          type: 'object',
          properties: {
            _id: { type: 'number' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            date: { type: 'string' },
            _v: { type: 'number' },
          },
        },
        ...commonResponses,
      },
    },
    schemaCompiler: schema => data => joi.validate(data, schema),
    handler: eventController.addEvent,
  },
  {
    method: 'PUT',
    url: '/api/events/:id',
    schema: {
      summary: 'Update event',
      params: joi.object().keys({
        id: joi.number().required(),
      }).required(),
      body: joi.object().keys({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().required().email(),
        date: joi.string().required(),
      }).required(),
      response: {
        200: {
          description: 'OK',
          type: 'object',
          properties: {
            _id: { type: 'number' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            date: { type: 'string' },
            _v: { type: 'number' },
          },
        },
        ...commonResponses,
      },
    },
    schemaCompiler: schema => data => joi.validate(data, schema),
    handler: eventController.updateEvent,
  },
  {
    method: 'DELETE',
    url: '/api/events/:id',
    schema: {
      summary: 'Delete event',
      params: joi.object().keys({
        id: joi.number().required(),
      }).required(),
      response: {
        200: {
          description: 'OK',
          type: 'object',
          properties: {
            _id: { type: 'number' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            date: { type: 'string' },
            _v: { type: 'number' },
          },
        },
        ...commonResponses,
      },
    },
    schemaCompiler: schema => data => joi.validate(data, schema),
    handler: eventController.deleteEvent,
  },
];

module.exports = routes;
