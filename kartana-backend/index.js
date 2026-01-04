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
    console.log("🔥 INDEX.JS IS RUNNING 🔥");

    const app = express();

    app.use(
      cors({
        origin: [
          "http://localhost:3000",
          "https://kartana-iota.vercel.app",
        ],
        credentials: true,
      })
    );

    // 🔹 Health check (VERY IMPORTANT FOR RENDER)
    app.get("/", (req, res) => {
      res.send("Kartana GraphQL API is running 🚀");
    });

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    server.applyMiddleware({
      app,
      path: "/graphql",
      cors: false,
    });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`GraphQL endpoint: /graphql`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

startServer();
