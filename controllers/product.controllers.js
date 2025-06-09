import Product from "../models/product.model.js";
import Brand from "../models/brand.model.js";
import Category from "../models/category.model.js";
import { errorHandler } from "../lib/error.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, categories, brandId } = req.body;

        if (!name || !price || !categories) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        let categoriesArray = [];
        if (typeof categories === "string") {
            categoriesArray = categories.split(",").map((cat) => cat.trim());
        } else if (Array.isArray(categories)) {
            categoriesArray = categories;
        }

        if (brandId) {
            const brandExists = await Brand.exists({ _id: brandId });
            if (!brandExists) {
                return res.status(400).json({ success: false, message: "Invalid brandId" });
            }
        }


        const checkCategories = await Promise.all(
            categoriesArray.map(async (categoryItem) => {
                console.log("category item is ", categoryItem)
                const categoryFound = await Category.findById(categoryItem);
                console.log("category foiund is ", categoryFound)
                return !!categoryFound;
            })
        );

        const allCategoriesValid = checkCategories.every((valid) => valid === true);

        if (!allCategoriesValid) {
            return res.status(400).json({
                success: false,
                message: "One or more categories are invalid",
            });
        }

        if (!allCategoriesValid) {
            return res.status(400).json({
                message: "Some categories are not valid"
            })
        }

        const images = req.files?.images?.map((file) => file.filename) || [];


        const product = new Product({
            name,
            description,
            price,
            categories: categoriesArray,
            brandId,
            images,
            addedBy: req.user.id,
        });

        await product.save();

        res.status(201).json({ success: true, message: "Product created successfully", product });
    } catch (err) {

        errorHandler(err, req, res);
    }
};

export const uploadProductImages = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    const filenames = req.files.map((file) => file.filename);

    product.images.push(...filenames);
    await product.save();

    const urls = filenames.map((name) => `/uploads/${name}`);

    res.status(200).json({
      success: true,
      message: "Images uploaded and product updated successfully",
      images: filenames,
      urls,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    const userId = req.user.id;

    const products = await Product.find({ addedBy: userId })
      .populate("categories", "name")
      .populate("brandId", "name logo");

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

export const toggleProductStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    if (req.user.role !== "admin" && product.addedBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    product.active = !product.active;
    await product.save();

    res.status(200).json({
      success: true,
      message: `Product ${product.active ? "activated" : "deactivated"} successfully`
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};



