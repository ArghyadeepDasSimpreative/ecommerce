import jwt from "jsonwebtoken";
import { errorHandler } from "../lib/error.js";

export const authorize = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw { statusCode: 401, message: "No token provided" };
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded || !decoded.role || !allowedRoles.includes(decoded.role)) {
        throw { statusCode: 403, message: "Access denied" };
      }

      req.user = decoded; // Store user info (id, role, etc.)
      next();
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
};
