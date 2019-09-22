const express = require("express");
const app = express();
app.use(express.json());

/* ------------------
        CORS 
---------------------*/
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
    return res.status(200).json({});
  }
  next();
});

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

    input EventInput {
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
    createUser: args => {
      return bcrypt
        .hash(args.userInput.password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: args.userInput.email,
            password: hashedPassword
          });
          return user.save();
        })
        .then(result => {
          console.log(result);
          return {
            ...result._doc,
            password: null,
            _id: result._id
          };
        })
        .catch(err => {
          console.log(err);
        });
    },
    graphiql: true
  })
);

/* connect to monggodb*/
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
