import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connection.js";

dotenv.config();

const app = express();
connectDB();


app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));