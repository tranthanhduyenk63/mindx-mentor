import bcrypt from "bcrypt";
import { AccountModel } from "../models/account.model.js";

export const AccountController = {
  register: async (req, res) => {
    const { email, password, isActive, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const account = await AccountModel.create({
      email,
      password: hashedPassword,
      isActive,
      role,
    });

    res.send(account);
  },
};
