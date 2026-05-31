const express = require("express");

const User = require("../models/User");
const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    message: "User profile fetched successfully",
    user: req.user,
  });
});

router.get(
  "/",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

      res.status(200).json({
        message: "Users fetched successfully",
        users,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch users",
      });
    }
  }
);

router.patch(
  "/:id/role",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const { role } = req.body;

      const allowedRoles = [
        "admin",
         "member",
      ];

      if (!allowedRoles.includes(role)) {
        return res.status(400).json({
          message: "Invalid role",
        });
      }

      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      user.role = role;
      await user.save();

      const updatedUser = await User.findById(user._id).select(
        "-password"
      );

      res.status(200).json({
        message: "User role updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update user role",
      });
    }
  }
);

module.exports = router;


