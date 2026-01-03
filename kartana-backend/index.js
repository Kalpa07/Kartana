import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolvers.js";

dotenv.config();

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const app = express();

    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await server.start();
    server.applyMiddleware({ app });

    app.listen(4000, () => {
      console.log("Server running on http://localhost:4000/graphql");
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

startServer();
