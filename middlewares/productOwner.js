// middlewares/isProductOwner.js
import Product from "../models/product.model.js";

export const isProductOwner = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.addedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to modify this product",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
