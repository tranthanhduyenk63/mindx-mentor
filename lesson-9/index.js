import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./config/db.js";
import accountRouter from "./routes/account.route.js";

dotenv.config();

const app = express();
connectToDb();

app.use(express.json());

app.use("/accounts", accountRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
