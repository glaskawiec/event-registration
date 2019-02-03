const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  _id: Number,
  firstName: String,
  lastName: String,
  email: String,
  date: Date,
});

module.exports = mongoose.model('Event', eventSchema);
