// import event from models folder to parsing event input data
const Event = require("../../models/event");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");

// user logic parsing data
const user = userId => {
  return User.findById(userId)
    .then(user => {
      return {
        ...user._doc,
        _id: user.id,
        createdEvents: events.bind(this, user._doc.createdEvents)
      };
    })
    .catch(err => {
      throw err;
    });
};
// events logic parsing data
const events = eventIds => {
  return Event.find({ _id: { $in: eventIds } })
    .then(events => {
      return events.map(event => {
        return {
          ...event._doc,
          _id: event.id,
          creator: user.bind(this, event.creator)
        };
      });
    })
    .catch(err => {
      throw err;
    });
};

module.exports = {
  events: () => {
    return Event.find()
      .populate("creator")
      .then(events => {
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
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  createEvent: args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "5d8c2a5125f37d3a7c63c29f"
      // creator: "5d8c2a5125f37d3a7c63c29f"
    });
    let createdEvent;
    // console.log(args);
    // events.push(event);
    return event
      .save()
      .then(result => {
        createdEvent = {
          ...result._doc,
          _id: result._doc._id.toString(),
          creator: user.bind(this, result._doc.creator)
        };
        return User.findById("5d8c2a5125f37d3a7c63c29f");
      })
      .then(user => {
        if (!user) {
          throw new Error("User Not Found!");
        }
        user.createdEvent.push(event);
        return user.save();
      })
      .then(result => {
        return createdEvent;
      })
      .catch(err => {
        console.log(err);
      });
  },
  // create user
  createUser: args => {
    return User.findOne({ email: args.userInput.email })
      .then(user => {
        if (user) {
          {
            throw new Error("user already exixst");
          }
        }
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then(hashedPasword => {
        const user = new User({
          email: args.userInput.email,
          password: hashedPasword
        });
        return user.save();
      })
      .then(result => {
        console.log(result);
        return { ...result._doc, _id: result.id, password: null };
      })
      .catch(err => {
        throw err;
      });
  }
};
