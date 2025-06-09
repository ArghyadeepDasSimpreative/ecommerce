import User from "../models/user.model.js";
import { errorHandler } from "../lib/error.js";

export const getAllNonAdminUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }, {firstName: 1 , lastName: 1, email: 1, role: 1, phoneNumber: 1});

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};
