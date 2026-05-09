import express from "express";
import postRouter from "./post.route.js";

const app = express();

app.use(express.json());

app.use("/posts", postRouter);

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
