import express from "express";
import { authorize } from "../middlewares/authorize.js";
import { createProduct, getMyProducts, toggleProductStatus, uploadProductImages } from "../controllers/product.controllers.js";
import { uploadMultiple, uploadSingle } from "../middlewares/upload.js";
import { isProductOwner } from "../middlewares/productOwner.js";

const productRoutes = express.Router();

productRoutes.post("/", authorize(["admin", "seller"]), uploadSingle(["admin", "seller"]), createProduct);
productRoutes.post("/:id/images", authorize(["admin", "seller"]), isProductOwner, uploadMultiple("images"), uploadProductImages);
productRoutes.get("/", authorize(["admin", "seller"]), getMyProducts);
productRoutes.put("/:id/toggle-status", authorize(["admin", "seller"]), isProductOwner, toggleProductStatus);

export default productRoutes;