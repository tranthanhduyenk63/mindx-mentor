import { Customer } from "../models/customer.model.js";
import { Order } from "../models/order.model.js";

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
};
