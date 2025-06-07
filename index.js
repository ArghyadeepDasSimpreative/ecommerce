import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connection.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

// Enable CORS (default allows all origins)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded form data (from HTML forms)
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

connectDB();

app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);
