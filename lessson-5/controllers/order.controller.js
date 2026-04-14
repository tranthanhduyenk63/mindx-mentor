import { Order } from "../models/order.model.js";

export const OrderController = {
  findHighValueOrders: async (req, res) => {
    const orders = await Order.find();

    const highvalueOrders = orders.filter(
      (order) => order.totalPrice >= 10000000
    );
    res.send(highvalueOrders);
  },
  create: async (req, res) => {
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
  },
  updateOrder: async (req, res) => {
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
  },
};
