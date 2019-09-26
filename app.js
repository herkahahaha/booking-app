const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();

const { buildSchema } = require("graphql");
const graphqlHttp = require("express-graphql");
// import event from models folder to parsing event input data
const Event = require("./models/event");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
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
    type User {
        _id: ID!
        email: String!
        password: String
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    
    input UserInput {
        email: String!
        password: String!
    }

    type RootQuery {
        events: [Event!]!
    }

    type RootMutation {
        createEvent(eventInput: EventInput):Event
        createUser(userInput: UserInput):User
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
              return { ...event._doc, _id: event._doc._id.toString() };
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
        });
        let createdEvent;
        // console.log(args);
        // events.push(event);
        return event
          .save()
          .then(result => {
            createdEvent = { ...result._doc, _id: result._doc._id.toString() };
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
    },
    graphiql: true
  })
);

/* connect to monggodb*/
const mongoose = require("mongoose");
// const db = process.env.MONGO_URL;
const localhost = "mongodb://localhost:27017/react-booking-app";
mongoose
  .connect(localhost, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    app.listen(5000);
    console.log("mongodb onfire");
  })
  .catch(err => {
    console.log(err);
  });
