import express from "express";
import { Customer } from "./models/customer.model.js";
import { connectToDb } from "./configs/db.js";
import { Order } from "./models/order.model.js";
import { Product } from "./models/product.model.js";

const app = express();
app.use(express.json());

connectToDb();

app.get("/customers", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

app.get("/customers/:id", async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findOne({ id: id });
  res.send(customer);
});

app.get("/customers/:id/orders", async (req, res) => {
  const { id } = req.params;
  const orders = await Order.find({ customerId: id });
  res.send(orders);
});

app.get("/orders/highvalue", async (req, res) => {
  const orders = await Order.find();

  const highvalueOrders = orders.filter(
    (order) => order.totalPrice >= 10000000
  );
  res.send(highvalueOrders);
});

app.get("/products", async (req, res) => {
  const { minPrice, maxPrice } = req.query;

  const products = await Product.find();
  const productsResult = products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );
  res.send(productsResult);
});

app.post("/customers", async (req, res) => {
  const { name, email, age } = req.body;

  const customers = await Customer.find();

  const emailExisted = customers.find((customer) => customer.email === email);
  if (emailExisted) {
    return res.status(400).json({ message: "Email da ton tai" });
  }

  const newCustomer = await Customer.create({
    name,
    email,
    age,
  });

  return res.send(newCustomer);
});

app.post("/orders", async (req, res) => {
  const { customerId, productId, quantity } = req.body;

  const products = await Product.find();
  const product = products.find((p) => p.id === productId);

  const isValidQuantity = quantity <= product.quantity;
  if (!isValidQuantity) {
    return res.status(400).json({ message: "Quantity khong hop le" });
  }

  const order = await Order.create({
    customerId,
    productId,
    quantity,
    price: quantity * product.price,
  });

  res.send(order);
});

app.put("/orders/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { quantity } = req.body;

  const order = await Order.findOne({ id: orderId });
  const product = await Product.findOne({ id: order.productId });

  if (quantity > product.quantity + order.quantity) {
    return res.status(400).json({ message: "Not enough stock" });
  }

  const updatedOrder = await Order.updateOne(
    { id: orderId },
    {
      quantity,
      price: product.price * quantity,
    }
  );

  res.send(updatedOrder);
});

app.delete("/customers/:id", async (req, res) => {
  const { id } = req.params;

  await Customer.deleteOne({ id: id });

  res.send({ message: "Customer deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
