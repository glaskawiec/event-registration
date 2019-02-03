const joiToJsonSchema = require('joi-to-json-schema');

module.exports = {
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Event registration',
      description: 'Brainhub recruitment task Node.JS API',
      version: '1.0.0',
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  transform: (schema) => {
    const {
      params = undefined,
      body = undefined,
      querystring = undefined,
      ...others
    } = schema;
    const transformed = { ...others };
    if (params) transformed.params = joiToJsonSchema(params);
    if (body) transformed.body = joiToJsonSchema(body);
    if (querystring) transformed.querystring = joiToJsonSchema(querystring);
    return transformed;
  },
};
