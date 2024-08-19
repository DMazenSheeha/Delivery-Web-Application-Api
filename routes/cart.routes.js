const express = require("express");
const authorization = require("../middlewares/auth");
const {
  getCartItems,
  addCartItem,
  removeCartItem,
  removeFromCartItem,
  removeAllClientCartItems,
} = require("../controllers/cart.controller");
const cartRoutes = express.Router();

cartRoutes.get("/items", authorization, getCartItems);
cartRoutes.post("/removeFromCart", authorization, removeFromCartItem);
cartRoutes.post("/remove", authorization, removeCartItem);
cartRoutes.post("/removeAll", authorization, removeAllClientCartItems);
cartRoutes.post("/add", authorization, addCartItem);

module.exports = cartRoutes;
