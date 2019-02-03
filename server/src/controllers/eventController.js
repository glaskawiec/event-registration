const boom = require('boom');

const getNextId = require('../utils/getNextId');
const Event = require('../models/Event');

exports.addEvent = async (req, reply) => {
  try {
    const id = await getNextId('eventId');
    const event = await new Event({ _id: id, ...req.body }).save();
    return reply.status(201).send(event);
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getEvents = async (req, reply) => {
  try {
    const event = await Event.find();
    return reply.status(200).send(event);
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getSingleEvent = async (req, reply) => {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id });

    if (!event) {
      reply.status(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: 'Not Found',
      });
    }

    return reply.status(200).send(event);
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.updateEvent = async (req, reply) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findOneAndUpdate({ _id: id }, req.body, { new: true });

    if (!updatedEvent) {
      reply.status(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: 'Not Found',
      });
    }

    return reply.status(200).send(updatedEvent);
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.deleteEvent = async (req, reply) => {
  try {
    const { id } = req.params;
    const event = await Event.findOneAndDelete({ _id: id });

    if (!event) {
      reply.status(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: 'Not Found',
      });
    }

    return reply.status(200).send();
  } catch (err) {
    throw boom.boomify(err);
  }
};
