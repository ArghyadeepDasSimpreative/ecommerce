import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    active: { type: Boolean, default: true },
    image: { type: String }, // file path or URL
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
