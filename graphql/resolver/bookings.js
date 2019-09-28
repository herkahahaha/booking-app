// import event from models folder to parsing event input data
const Event = require("../../models/event");
const Booking = require("../../models/booking");
const { dateToString } = require("../../helper/date");
const { user, singleEvent } = require("./merge");

// refactoring
const eventTransform = event => {
  return {
    ...event._doc,
    _id: event.id,
    creator: user.bind(this, event.creator)
  };
};
const bookingTransform = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return bookingTransform(booking);
        /*{
          ...booking._doc,
          _id: booking.id,
          user: user.bind(this, booking._doc.user),
          event: singleEvent.bind(this, booking._doc.event),
          createdAt: dateToString(booking._doc.createdAt),
          updatedAt: dateToString(booking._doc.updatedAt)
        };*/
      });
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async args => {
    const fetchEvent = await Event.findOne({
      _id: args.eventId
    });
    const booking = new Booking({
      user: "5d8e045c4494b73c3076ce93",
      event: fetchEvent
    });
    const result = await booking.save();
    return bookingTransform(result);
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = eventTransform(booking._doc.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  }
};
