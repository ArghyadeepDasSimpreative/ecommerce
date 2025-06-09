import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/connection.js";
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded form data (HTML forms)
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., uploaded images)
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);

// Connect DB and start server
connectDB();

app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);
