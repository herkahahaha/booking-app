const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const graphqlHttp = require("express-graphql");

// auth-here as middleware
const isAuth = require("./middleware/auth-here");
app.use(isAuth);

//import graphql file
const graphqlSchema = require("./graphql/schema/index");
const rootResolver = require("./graphql/resolver/index");

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: rootResolver,
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
