import bcrypt from "bcrypt";
import { Customer } from "../models/customer.model.js";
import jwt from "jsonwebtoken";

export const CustomerController = {
  register: async (req, res) => {
    const { name, email, age, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const emailExisted = await Customer.findOne({ email });
    if (emailExisted) {
      return res.status(400).json({ message: "Email da ton tai" });
    }

    const customer = await Customer.create({
      name,
      email,
      age,
      password: hashedPassword,
      salt: salt.toString(),
    });
    res.send(customer);
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }
    const hashedPassword = await bcrypt.hash(password, customer.salt);
    const isPasswordValid = hashedPassword === customer.password;
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }

    // const apiKey = `web-${customer.id}-${customer.email}-${process.env.SECRET_KEY}`;
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      {
        customerId: customer.id,
        name: customer.name,
        role: "customer",
        email: customer.email,
      },
      secretKey,
      {
        expiresIn: "1h",
        algorithm: "HS256",
      },
    );

    res.send({ token });
  },
};
