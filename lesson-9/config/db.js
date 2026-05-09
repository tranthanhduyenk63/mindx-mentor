import mongoose from "mongoose";
export const connectToDb = async () => {
  try {
    console.log("mongodb uri ==== ", process.env.MONGODB_URL);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
