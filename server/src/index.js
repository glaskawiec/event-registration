const fastifyCompress = require('fastify-compress');
const fastifyHelmet = require('fastify-helmet');
const fastifySwagger = require('fastify-swagger');
const mongoose = require('mongoose');
const pino = require('pino');
const fastifyCors = require('fastify-cors');
const config = require('config');

const logger = pino(config.get('logPath'));
const fastify = require('fastify')({ logger });
const swaggerOptions = require('./utils/swaggerOptions');
const routes = require('./routes');

(async () => {
  try {
    const port = config.get('port');
    const mongoDbConnectionString = config.get('mongoDbConnectionString');
    const connectionOptions = {
      useNewUrlParser: true,
      useFindAndModify: false,
    };

    await mongoose.connect(mongoDbConnectionString, connectionOptions);
    await fastify.register(fastifyCors);
    await fastify.register(fastifyHelmet);
    await fastify.register(fastifyCompress);
    await fastify.register(fastifySwagger, swaggerOptions);

    routes.forEach((route) => {
      fastify.route(route);
    });

    await fastify.listen(port);
    console.log(`server listening on ${port}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();

module.exports = fastify.server;
