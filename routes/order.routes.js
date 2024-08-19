const express = require("express");
const {
  addOrder,
  getClientOrders,
  getAdminOrders,
  changeStatus,
} = require("../controllers/order.controller");
const authorization = require("../middlewares/auth");
const orderRoutes = express.Router();

orderRoutes.post("/add", authorization, addOrder);
orderRoutes.get("/clientOrders", authorization, getClientOrders);
orderRoutes.get("/adminOrders", getAdminOrders);
orderRoutes.patch("/status/:orderId", changeStatus);

module.exports = orderRoutes;
