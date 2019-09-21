const express = require("express");
const app = express();
app.use(express.json());

const { buildSchema } = require("graphql");
const graphqlHttp = require("express-graphql");
// temporary data store
const events = [];
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
        return events;
      },
      createEvent: args => {
        const event = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          delete: args.eventInput.delete
        };
        // console.log(args);
        events.push(event);
        return event;
      }
    },
    graphiql: true
  })
);
app.listen(5000);
