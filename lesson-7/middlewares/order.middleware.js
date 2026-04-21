export const OrderMiddleware = {
  validateUpdate: async (req, res, next) => {
    const { orderId, productId, quantity } = req.body;
    if (!orderId || !productId || quantity === undefined || quantity === null) {
      return res.status(400).json({
        message: "Missing required fields: orderId, productId, quantity",
      });
    }
    next();
  },
};
