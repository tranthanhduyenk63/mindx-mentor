import mongoose from "mongoose";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";

export const OrderController = {
  create: async (req, res) => {
    const { productId, quantity } = req.body;
    const customerId = req.customerId;

    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

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
  },

  getOrdersByUser: async (req, res) => {
    const { id } = req.params;
    if (id !== req.customerId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const orders = await Order.find({ customerId: id });
    res.send(orders);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { orderId, productId, quantity } = req.body;

    if (orderId !== id) {
      return res.status(400).json({ message: "orderId must match URL" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.customerId !== req.customerId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const newProduct = await Product.findOne({ id: productId });
    if (!newProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const oldProductId = order.productId;
    const oldQty = order.quantity;

    if (oldProductId === productId) {
      const delta = quantity - oldQty;
      if (delta > 0 && newProduct.quantity < delta) {
        return res.status(400).json({ message: "Quantity khong hop le" });
      }
      await Product.updateOne(
        { id: productId },
        { $inc: { quantity: -delta } },
      );
    } else {
      const oldProduct = await Product.findOne({ id: oldProductId });
      if (!oldProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (newProduct.quantity < quantity) {
        return res.status(400).json({ message: "Quantity khong hop le" });
      }

      await Product.updateOne({ id: oldProductId }, { $inc: { quantity: oldQty } });
      await Product.updateOne(
        { id: productId },
        { $inc: { quantity: -quantity } },
      );
    }

    order.productId = productId;
    order.quantity = quantity;
    order.price = quantity * newProduct.price;
    await order.save();

    res.send(order);
  },

  remove: async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.customerId !== req.customerId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await Order.deleteOne({ _id: id });
    res.send({ message: "Order deleted" });
  },
};
