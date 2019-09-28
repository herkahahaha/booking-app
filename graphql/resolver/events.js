// import event from models folder to parsing event input data
const Event = require("../../models/event");
const User = require("../../models/user");
const dateToString = require("../../helper/date");
const { eventTransform } = require("./merge");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find().populate("creator");
      return events.map(event => {
        return eventTransform(event);
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
    try {
      const result = await event.save();
      createdEvent = eventTransform(result);
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
  }
};
