import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://admin:WboJlsz3gkCS63il@mindx.epabq0y.mongodb.net/web95"
    );
    console.log("Connect to db succesfully");
  } catch (error) {
    console.log("Connect to db failed");
  }
};
