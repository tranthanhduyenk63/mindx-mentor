import { Product } from "../models/product.model.js";

export const ProductController = {
  findAll: async (req, res) => {
    const { minPrice, maxPrice } = req.query;

    const products = await Product.find();
    const productsResult = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    res.send(productsResult);
  },
};
