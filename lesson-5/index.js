import express from "express";
import { Customer } from "./models/customer.model.js";
import { connectToDb } from "./configs/db.js";
import { Order } from "./models/order.model.js";
import { Product } from "./models/product.model.js";
import { CustomerController } from "./controllers/customer.controller.js";
import { OrderController } from "./controllers/order.controller.js";
import { ProductController } from "./controllers/product.controller.js";
import customerRouter from "./routes/customer.route.js";
import orderRouter from "./routes/order.route.js";
import productRouter from "./routes/product.route.js";

const app = express();
app.use(express.json());

connectToDb();

app.use("/customers", customerRouter);
app.use("/orders", orderRouter);
app.use("/products", productRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
