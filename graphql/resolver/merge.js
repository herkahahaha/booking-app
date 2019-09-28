const Event = require("../../models/event");
const User = require("../../models/booking");

// refactoring
const eventTransform = event => {
  return {
    ...event._doc,
    _id: event.id,
    creator: user.bind(this, event.creator)
  };
};

// user logic parsing data
const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};
// events logic parsing data
const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => {
      return eventTransform(event);
      /* {
        ...event._doc,
        _id: event.id,
        creator: user.bind(this, event.creator) 
      };*/
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return eventTransform(event);
  } catch (err) {
    throw err;
  }
};

exports.user = user;
exports.events = events;
exports.singleEvent = singleEvent;
