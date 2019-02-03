const Counter = require('../models/Counter');

module.exports = async (name) => {
  let eventCounter = await Counter.findOne({ _id: name });

  if (!eventCounter) {
    eventCounter = await new Counter({ _id: name, seq: 0 }).save();
  } else {
    eventCounter = await Counter.findByIdAndUpdate(name, { $inc: { seq: 1 } }, { new: true });
  }

  return eventCounter.seq;
};
