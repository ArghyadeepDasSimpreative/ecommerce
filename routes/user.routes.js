import express from "express";
import { authorize } from "../middlewares/authorize.js";
import { getAllNonAdminUsers } from "../controllers/user.controllers.js";

const userRoutes = express.Router();

userRoutes.get("/", authorize(["admin"]), getAllNonAdminUsers);

export default userRoutes;