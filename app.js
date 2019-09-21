const express = require("express");
const app = express();
app.use(express.json());

const { buildSchema } = require("graphql");
const graphqlHttp = require("express-graphql");
// import event from models folder to parsing event input data
const Event = require("./models/event");

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    type RootQuery {
        events: [Event!]!
    }

    type RootMutation {
        createEvent(eventInput: EventInput):Event
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
      events: () => {
        return Event.find()
          .then(events => {
            return events.map(event => {
              return { ...event._doc, _id: event.doc._id.toString() };
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
          date: new Date(args.eventInput.date)
        });
        // console.log(args);
        // events.push(event);
        return event
          .save()
          .then(result => {
            console.log(result);
            return { ...result._doc };
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    graphiql: true
  })
);

// connect to monggodb
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/react-booking-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(5000);
    console.log("mongodb onfire");
  })
  .catch(err => {
    console.log(err);
  });
