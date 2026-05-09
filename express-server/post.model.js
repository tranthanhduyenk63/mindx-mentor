import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    author: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

export const PostModel = mongoose.Model(PostSchema);
