import express from "express";
import {
  addBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  updateBrandLogo,
  deleteBrand,
} from "../controllers/brand.controllers.js";
import { authorize } from "../middlewares/authorize.js";
import { uploadSingle } from "../middlewares/upload.js";

const brandRoutes = express.Router();

brandRoutes.post("/", authorize(["admin", "seller"]), uploadSingle("logo"), addBrand);
brandRoutes.get("/", getAllBrands);
brandRoutes.get("/:id", getBrandById);
brandRoutes.put("/:id", authorize(["admin", "seller"]), updateBrand);
brandRoutes.patch("/:id/logo", authorize(["admin", "seller"]), uploadSingle("logo"), updateBrandLogo);
brandRoutes.delete("/:id", authorize(["admin"]), deleteBrand);

export default brandRoutes;
