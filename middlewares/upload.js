import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure upload directory exists
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// File filter (optional: only allow images, pdfs, etc.)
const fileFilter = (req, file, cb) => {
  cb(null, true); // Allow all for now
};

const upload = multer({ storage, fileFilter });

// 🧩 Middleware to upload a single file
export const uploadSingle = (fieldName) => upload.single(fieldName);

// 🧩 Middleware to upload multiple files
export const uploadMultiple = (fieldName, maxCount = 5) =>
  upload.array(fieldName, maxCount);
