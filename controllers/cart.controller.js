const User = require("../models/userModel");
const asyncWrapper = require("../utils/asyncWrapper");

const addCartItem = asyncWrapper(async (req, res, next) => {
  const { userId, itemId } = req.body;
  const user = await User.findOne({ _id: userId }, { __v: false });
  const cart = await user.cart;
  if (!cart[itemId]) {
    cart[itemId] = 1;
  } else {
    cart[itemId] += 1;
  }
  await User.findOneAndUpdate(
    { _id: userId },
    {
      name: user.name,
      email: user.email,
      password: user.password,
      cart,
    }
  );
  res.json({
    success: true,
    message: "Item added successfully",
    data: null,
    code: 200,
  });
});
const removeFromCartItem = asyncWrapper(async (req, res, next) => {
  const { userId, itemId } = req.body;
  const user = await User.findOne({ _id: userId }, { __v: false });
  const cart = await user.cart;
  cart[itemId] = cart[itemId] > 0 ? cart[itemId] - 1 : 0;
  await User.findOneAndUpdate(
    { _id: userId },
    {
      name: user.name,
      email: user.email,
      password: user.password,
      cart,
    }
  );
  res.json({
    success: true,
    message: "Item removed successfully",
    data: null,
    code: 200,
  });
});

const removeCartItem = asyncWrapper(async (req, res, next) => {
  const { userId, itemId } = req.body;
  const user = await User.findOne({ _id: userId });
  const cart = await user.cart;
  delete cart[itemId];
  await User.findOneAndUpdate(
    { _id: userId },
    {
      name: user.name,
      email: user.email,
      password: user.password,
      cart,
    }
  );
  res.json({
    success: true,
    message: "Item deleted successfully",
    data: null,
    code: 204,
  });
});
const getCartItems = asyncWrapper(async (req, res, next) => {
  const { userId } = req.body;
  const user = await User.findOne({ _id: userId });
  const cart = await user.cart;
  res.json({
    success: true,
    message: "Cart items",
    data: cart,
    code: 200,
  });
});

const removeAllClientCartItems = asyncWrapper(async (req, res, next) => {
  const { userId } = req.body;
  const user = await User.findOne({ _id: userId });
  await User.findByIdAndUpdate(userId, {
    name: user.name,
    email: user.email,
    password: user.password,
    cart: {},
  });
  res.json({
    success: true,
    message: "All cart items removed successfully",
    data: null,
    code: 200,
  });
});

module.exports = {
  getCartItems,
  addCartItem,
  removeCartItem,
  removeFromCartItem,
  removeAllClientCartItems,
};
