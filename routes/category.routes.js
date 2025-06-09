import express from "express";
import { authorize } from "../middlewares/authorize.js";
import { uploadSingle } from "../middlewares/upload.js";
import { addCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/category.controllers.js";
import { getCipherInfo } from "crypto";

const categoryRoutes = express.Router();

categoryRoutes.post(
  "/",
  authorize(["admin"]),
  uploadSingle("image"),
  addCategory
);
categoryRoutes.get("/", authorize(["buyer", "seller", "admin"]), getCategories);
categoryRoutes.put("/:id", authorize(["admin"]), updateCategory);
categoryRoutes.get("/:id", authorize(["admin"]), getCategoryById);
categoryRoutes.delete("/:id", authorize(["admin"]), deleteCategory );

export default categoryRoutes;
