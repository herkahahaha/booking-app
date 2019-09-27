// import event from models folder to parsing event input data
const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/booking");
const bcrypt = require("bcryptjs");

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
      return {
        ...event._doc,
        _id: event.id,
        creator: user.bind(this, event.creator)
      };
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return {
      ...event._doc,
      _id: event.id,
      creator: user.bind(this, event._doc.creator)
    };
  } catch (err) {
    throw err;
  }
};
module.exports = {
  events: async () => {
    try {
      const events = await Event.find().populate("creator");
      return events.map(event => {
        return {
          ...event._doc,
          _id: event._doc._id.toString(),
          creator: user.bind(this, event._doc.creator)
          //  {
          //   ...event._doc.creator._doc,
          //   _id: event._doc.creator.id
          // }
        };
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "5d8e045c4494b73c3076ce93"
      // creator: "5d8c2a5125f37d3a7c63c29f"
    });
    let createdEvent;
    // console.log(args);
    // events.push(event);
    try {
      const result = await event.save();
      createdEvent = {
        ...result._doc,
        _id: result._doc._id.toString(),
        creator: user.bind(this, result._doc.creator)
      };
      const creator = await User.findById("5d8e045c4494b73c3076ce93");
      if (!creator) {
        throw new Error("User Not Found!");
      }
      creator.createdEvent.push(event);
      await creator.save();
      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  // create user
  createUser: async args => {
    try {
      const userExist = await User.findOne({ email: args.userInput.email });
      if (userExist) {
        {
          throw new Error("user already exixst");
        }
      }
      const hashedPasword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPasword
      });
      const result = await user.save();
      console.log(result);
      return { ...result._doc, _id: result.id, password: null };
    } catch (err) {
      throw err;
    }
  },
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return {
          ...booking._doc,
          _id: booking.id,
          user: user.bind(this, booking._doc.user),
          event: singleEvent.bind(this, booking._doc.event),
          createdAt: new Date(booking._doc.createdAt).toISOString(),
          updatedAt: new Date(booking._doc.updatedAt).toISOString()
        };
      });
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async args => {
    const fetchEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: "5d8e045c4494b73c3076ce93",
      event: fetchEvent
    });
    const result = await booking.save();
    return {
      ...result._doc,
      _id: result.id,
      user: user.bind(this, result._doc.user),
      event: singleEvent.bind(this, result._doc.event),
      createdAt: new Date(result._doc.createdAt).toISOString(),
      updatedAt: new Date(result._doc.updatedAt).toISOString()
    };
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = {
        ...booking.event._doc,
        _id: booking.event.id,
        creator: user.bind(this, booking.event._doc.creator)
      };
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  }
};
