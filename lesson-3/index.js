import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const BASE_URL = "http://localhost:3000";

app.get("/customers", async (req, res) => {
  const response = await axios.get(`${BASE_URL}/customers`);
  const customers = response.data;
  res.send(customers);
});

app.get("/customers/:id", async (req, res) => {
  const { id } = req.params;
  const response = await axios.get(`${BASE_URL}/customers/${id}`);
  const customer = response.data;
  res.send(customer);
});

app.get("/customers/:id/orders", async (req, res) => {
  const { id } = req.params;
  const response = await axios.get(`${BASE_URL}/orders?customerId=${id}`);
  const orders = response.data;
  res.send(orders);
});

app.get("/orders/highvalue", async (req, res) => {
  const response = await axios.get(`${BASE_URL}/orders`);
  const orders = response.data;

  const highvalueOrders = orders.filter(
    (order) => order.totalPrice >= 10000000
  );
  res.send(highvalueOrders);
});

app.get("/products", async (req, res) => {
  const { minPrice, maxPrice } = req.query;

  const response = await axios.get(`${BASE_URL}/products`);
  const products = response.data;

  const productsResult = products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );
  res.send(productsResult);
});

app.post("/customers", async (req, res) => {
  const { name, email, age } = req.body;

  const response = await axios.get(`${BASE_URL}/customers`);
  const customers = response.data;

  const emailExisted = customers.find((customer) => customer.email === email);
  if (emailExisted) {
    return res.status(400).json({ message: "Email da ton tai" });
  }

  const newResponse = await axios.post(`${BASE_URL}/customers`, {
    name,
    email,
    age,
  });
  const newCustomer = newResponse.data;
  return res.send(newCustomer);
});

app.post("/orders", async (req, res) => {
  const { customerId, productId, quantity } = req.body;

  const productResponse = await axios.get(`${BASE_URL}/products`);
  const products = productResponse.data;
  const product = products.find((p) => p.id === productId);

  const isValidQuantity = quantity <= product.quantity;
  if (!isValidQuantity) {
    return res.status(400).json({ message: "Quantity khong hop le" });
  }

  const orderResponse = await axios.post(`${BASE_URL}/orders`, {
    customerId,
    productId,
    quantity,
    totalPrice: quantity * product.price,
  });
  const order = orderResponse.data;
  res.send(order);
});

app.put("/orders/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { quantity } = req.body;

  const orderResponse = await axios.get(`${BASE_URL}/orders/${orderId}`);
  const order = orderResponse.data;

  const productResponse = await axios.get(
    `${BASE_URL}/products/${order.productId}`
  );
  const product = productResponse.data;

  if (quantity > product.quantity + order.quantity) {
    return res.status(400).json({ message: "Not enough stock" });
  }

  const updatedOrder = await axios.patch(`${BASE_URL}/orders/${orderId}`, {
    quantity,
    totalPrice: product.price * quantity,
  });

  res.send(updatedOrder.data);
});

app.delete("/customers/:id", async (req, res) => {
  const { id } = req.params;

  await axios.delete(`${BASE_URL}/customers/${id}`);

  res.send({ message: "Customer deleted successfully" });
});

app.listen(8080, () => {
  console.log("server is running");
});
