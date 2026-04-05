import express from "express";
import { v4 as uuidv4 } from "uuid";
import { customers, products, orders } from "./data.js";

const app = express();
app.use(express.json());

/**
 * 1. GET /customers
 */
app.get("/customers", (req, res) => {
  res.send(customers);
});

/**
 * 2. GET /customers/:id
 */
app.get("/customers/:id", (req, res) => {
  const { id } = req.params;
  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.send(customer);
});

/**
 * 3. GET /customers/:customerId/orders
 */
app.get("/customers/:customerId/orders", (req, res) => {
  const { customerId } = req.params;
  const customerOrders = orders.filter((o) => o.customerId === customerId);

  res.send(customerOrders);
});

/**
 * 4. GET /orders/highvalue
 */
app.get("/orders/highvalue", (req, res) => {
  const result = orders.filter((o) => o.totalPrice > 10000000);
  res.send(result);
});

/**
 * 5. GET /products?minPrice=&maxPrice=
 */
app.get("/products", (req, res) => {
  const { minPrice, maxPrice } = req.query;

  const result = products.filter(
    (p) => p.price >= Number(minPrice) && p.price <= Number(maxPrice)
  );

  res.send(result);
});

/**
 * 6. POST /customers
 */
app.post("/customers", (req, res) => {
  const { name, email, age } = req.body;

  // validate
  if (!name || !email || !age) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // unique email
  const exists = customers.find((c) => c.email === email);
  if (exists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newCustomer = {
    id: uuidv4(),
    name,
    email,
    age,
  };

  customers.push(newCustomer);

  res.status(201).json(newCustomer);
});

/**
 * 7. POST /orders
 */
app.post("/orders", (req, res) => {
  const { customerId, productId, quantity } = req.body;

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (quantity > product.quantity) {
    return res.status(400).json({ message: "Not enough stock" });
  }

  const totalPrice = product.price * quantity;

  const newOrder = {
    id: uuidv4(),
    customerId,
    productId,
    quantity,
    totalPrice,
  };

  orders.push(newOrder);

  // giảm tồn kho
  product.quantity -= quantity;

  res.status(201).json(newOrder);
});

/**
 * 8. PUT /orders/:orderId
 */
app.put("/orders/:orderId", (req, res) => {
  const { orderId } = req.params;
  const { quantity } = req.body;

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  const product = products.find((p) => p.id === order.productId);

  if (quantity > product.quantity + order.quantity) {
    return res.status(400).json({ message: "Not enough stock" });
  }

  // update stock
  product.quantity += order.quantity; // trả lại
  product.quantity -= quantity; // trừ mới

  order.quantity = quantity;
  order.totalPrice = product.price * quantity;

  res.send(order);
});

/**
 * 9. DELETE /customers/:id
 */
app.delete("/customers/:id", (req, res) => {
  const { id } = req.params;
  const index = customers.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Customer not found" });
  }

  customers.splice(index, 1);

  res.send({ message: "Customer deleted successfully" });
});

app.listen(3001, () => {
  console.log("Server running at port 3001");
});
