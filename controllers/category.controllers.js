import Category from "../models/category.model.js";
import { errorHandler } from "../lib/error.js";
import { v4 as uuidv4 } from "uuid";

export const addCategory = async (req, res) => {
  try {
    const { name, description, active } = req.body;
    const image = req.file?.filename;

    const existing = await Category.findOne({ name });
    if (existing) throw { statusCode: 400, message: "Category already exists" };

    const category = await Category.create({
      name,
      description,
      active: active !== undefined ? active : true,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Category added successfully",
      category,
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, active } = req.body;
    const image = req.file?.filename;

    const category = await Category.findById(id);
    if (!category) throw { statusCode: 404, message: "Category not found" };

    if (name) category.name = name;
    if (description) category.description = description;
    if (active !== undefined) category.active = active;
    if (image) category.image = image;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) throw { statusCode: 404, message: "Category not found" };

    res.status(200).json({
      success: true,
      category,
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) throw { statusCode: 404, message: "Category not found" };

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

