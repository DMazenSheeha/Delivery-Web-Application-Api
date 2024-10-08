const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../controllers/user.controller");
const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.get("/profile", getProfile);

module.exports = userRoutes;
