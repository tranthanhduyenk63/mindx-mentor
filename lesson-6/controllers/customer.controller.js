import { Customer } from "../models/customer.model.js";
import { Order } from "../models/order.model.js";
import { v4 as uuidv4 } from "uuid";

export const sessions = [];

export const CustomerController = {
  findAll: async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
  },
  findById: async (req, res) => {
    const { id } = req.params;
    const customer = await Customer.findOne({ id: id });
    res.send(customer);
  },
  findOrders: async (req, res) => {
    const { id } = req.params;
    const orders = await Order.find({ customerId: id });
    res.send(orders);
  },
  create: async (req, res) => {
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
  },
  deleteById: async (req, res) => {
    const { id } = req.params;

    await Customer.deleteOne({ id: id });

    res.send({ message: "Customer deleted successfully" });
  },
  getApiKey: async (req, res) => {
    const { id } = req.params;
    const customer = await Customer.findOne({ id: id }).lean();
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const newSession = uuidv4();
    const apiKey = `web ${customer.id} ${customer.email} ${newSession}`;
    sessions.push({
      id: newSession,
      customerId: customer.id,
      email: customer.email,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    res.send({ apiKey, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) });
  },
};
