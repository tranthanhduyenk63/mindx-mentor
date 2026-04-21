import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      require: true,
    },
    productId: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", OrderSchema);
