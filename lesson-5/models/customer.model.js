import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

export const Customer = mongoose.model("Customer", CustomerSchema);
