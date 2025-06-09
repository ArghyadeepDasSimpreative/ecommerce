import Brand from "../models/brand.model.js";
import { errorHandler } from "../lib/error.js";

export const addBrand = async (req, res) => {
  try {
    const { name, description } = req.body;
    const logo = req.file?.filename;

    console.log(req.user)

    const brand = new Brand({
      name,
      description,
      logo,
      createdBy: req.user.id,
    });

    await brand.save();

    res.status(201).json({
      success: true,
      message: "Brand added successfully",
      brand,
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};


export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({
      success: true,
      count: brands.length,
      brands,
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};


export const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) throw { statusCode: 404, message: "Brand not found" };

    res.status(200).json({
      success: true,
      brand,
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};


export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, active } = req.body;

    const brand = await Brand.findById(id);
    if (!brand) throw { statusCode: 404, message: "Brand not found" };

    if (name) brand.name = name;
    if (description) brand.description = description;
    if (active !== undefined) brand.active = active;

    await brand.save();

    res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      brand,
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};


export const updateBrandLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const logo = req.file?.filename;
    if (!logo) throw { statusCode: 400, message: "Logo file is required" };

    const brand = await Brand.findById(id);
    if (!brand) throw { statusCode: 404, message: "Brand not found" };

    brand.logo = logo;
    await brand.save();

    res.status(200).json({
      success: true,
      message: "Brand logo updated",
      brand,
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};


export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) throw { statusCode: 404, message: "Brand not found" };

    res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};
