import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controllers.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);

export default authRoutes;
