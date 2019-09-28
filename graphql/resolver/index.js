const eventsResolver = require("./events");
const bookingsResolver = require("./bookings");
const authResolver = require("./auth");

const rootResolver = {
  ...eventsResolver,
  ...bookingsResolver,
  ...authResolver
};
module.exports = rootResolver;
