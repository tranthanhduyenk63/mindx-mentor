import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["MANAGER", "CUSTOMER", "EMPLOYEE"],
      default: "CUSTOMER",
    },
  },
  {
    timestamps: true,
  }
);

export const AccountModel = mongoose.model("account", AccountSchema);
