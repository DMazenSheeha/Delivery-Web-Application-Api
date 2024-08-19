const JWT = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncWrapper = require("../utils/asyncWrapper");
const appError = require("../utils/appError");
const validator = require("validator");
const secret = process.env.JWT_SECRET_KEY;

// data
//   {
//     success: true,
//     message: "Item Added Successfully",
//     data: null,
//     code: 200,
//   }

const createToken = (user) => {
  const { _id, name, password, email, cart } = user;
  const token = JWT.sign({ id: _id, name, email, password, cart }, secret);
  return token;
};

const register = asyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    const newError = appError.create(false, "User already exist", 400);
    return next(newError);
  }
  if (!validator.isEmail(email)) {
    const newError = appError.create(false, "This is not email", 400);
    return next(newError);
  }
  if (password.length < 8) {
    const newError = appError.create(false, "Enter a strong password", 400);
    return next(newError);
  }
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  try {
    const user = await User.create({
      name,
      email,
      password: hashed,
    });
    const token = createToken(user);
    res.json({
      success: true,
      message: "Registered successfully",
      data: token,
      code: 200,
    });
  } catch (err) {
    const newError = appError.create(false, err.message, 400);
    return next(newError);
  }
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const newError = appError.create(false, "User doesn't exist", 404);
    return next(newError);
  }
  const correctPass = await bcrypt.compare(password, user.password);
  if (!correctPass) {
    const newError = appError.create(false, "Wrong password", 400);
    return next(newError);
  }
  const token = createToken(user);
  res.json({
    success: true,
    message: "Logged in successfully",
    data: token,
    code: 200,
  });
});

const getProfile = asyncWrapper(async (req, res, next) => {
  const { token } = req.headers;
  JWT.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json({
      success: true,
      message: "Profile data",
      data: info,
      code: 200,
    });
  });
});

module.exports = {
  register,
  login,
  getProfile,
};
