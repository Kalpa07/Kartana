import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    const conn = await mongoose.connect((process.env.MONGO_URI), {
    useNewUrlParser: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
    console.log("✅ CONNECTED TO DB:", mongoose.connection.name);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
