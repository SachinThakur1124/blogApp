import mongoose from "mongoose";
import { MONGO_URI } from "./envVars.config.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log("Database connection established at", conn.connection.host);
  } catch (error) {
    console.log("Error : while connecting to Database", error);
    process.exit(1);
  }
};

export default connectDB;
