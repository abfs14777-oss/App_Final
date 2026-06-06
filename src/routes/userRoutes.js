const express = require("express");
const User = require("../models/userModel");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddlewares");
const router = express.Router();

// Admin - view all users
router.get("/all-users", verifyToken, authorizeRoles("admin"), async (req, res) => {
    const users = await User.find({}, "_id role createdAt");
    res.json({ users });
});

// User - view own profile
router.get("/profile", verifyToken, authorizeRoles("admin", "manager", "user"), (req, res) => {
    res.json({ id: req.user.id, role: req.user.role });
});

// Only admin
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" });
});

// Admin and manager
router.get("/manager", verifyToken, authorizeRoles("admin", "manager"), (req, res) => {
    res.json({ message: "Welcome Manager" });
});

// All roles
router.get("/user", verifyToken, authorizeRoles("admin", "manager", "user"), (req, res) => {
    res.json({ message: "Welcome User" });
});

module.exports = router;