import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolvers.js";

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect("mongodb://localhost:27017/kartana", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen(4000, () => {
    console.log("Server running at http://localhost:4000/graphql");
  });
};

startServer();
