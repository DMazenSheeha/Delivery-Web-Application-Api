const Order = require("../models/orderModel");
const User = require("../models/userModel");
const asyncWrapper = require("../utils/asyncWrapper");

const addOrder = asyncWrapper(async (req, res, next) => {
  const { items, total, clientInformation, userId } = req.body;
  const order = new Order({
    items,
    total,
    clientInformation,
    userId,
  });
  order.save();
  const user = await User.findOne({ _id: userId });
  await User.findOneAndUpdate(
    { _id: userId },
    {
      name: user.name,
      email: user.email,
      password: user.password,
      cart: user.cart,
      orders: [...user.orders, order],
    }
  );
  res.json({
    success: true,
    message: "Order have deliverd to owner",
    data: null,
    code: 200,
  });
});

const getClientOrders = asyncWrapper(async (req, res, next) => {
  const { userId } = req.body;
  const user = await User.findOne(
    { _id: userId },
    { __v: false, clientInformation: false }
  );
  const orders = await user.orders;
  res.json({
    success: true,
    message: "Orders",
    data: orders,
    code: 200,
  });
});

const getAdminOrders = asyncWrapper(async (req, res, next) => {
  const orders = await Order.find({}, { __v: false });
  res.json({
    success: true,
    message: "Orders",
    data: orders,
    code: 200,
  });
});

const changeStatus = asyncWrapper(async (req, res, next) => {
  const { orderId } = req.params;
  const { newStatus } = req.body;
  const order = await Order.findOne({ _id: orderId });
  const userId = await order.userId;
  await Order.findOneAndUpdate(
    { _id: orderId },
    {
      items: order.items,
      total: order.total,
      status: newStatus,
      clientInformation: order.clientInformation,
      userId,
    }
  );
  const user = await User.findOne({ _id: userId });
  let userOrders = await user.orders;
  const newOrder = userOrders.find((order) => order._id.toString() === orderId);
  newOrder.status = newStatus;
  await User.findOneAndUpdate(
    { _id: userId },
    {
      name: user.name,
      email: user.email,
      password: user.password,
      cart: user.cart,
      orders: userOrders,
    }
  );
  res.json({
    success: true,
    message: "Status changed successfully",
    data: newStatus,
    code: 200,
  });
});

module.exports = {
  addOrder,
  getAdminOrders,
  getClientOrders,
  changeStatus,
};
