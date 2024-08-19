const Food = require("../models/foodModel");
const appError = require("../utils/appError");
const fs = require("fs");
const asyncWrapper = require("../utils/asyncWrapper");

// data
//   {
//     success: true,
//     message: "Item Added Successfully",
//     data: null,
//     code: 200,
//   }

const addItem = asyncWrapper(async (req, res, next) => {
  const { name, description, price, category } = req.body;
  const image = `${req.file.filename}`;
  await Food.create({
    name,
    description,
    price,
    category,
    image,
  });
  res.json({
    success: true,
    message: "Item Added Successfully",
    data: null,
    code: 201,
  });
});
const allItems = asyncWrapper(async (req, res, next) => {
  const items = await Food.find({}, { __v: false });
  res.json({
    success: true,
    message: "Items Data",
    data: items,
    code: 200,
  });
});
const removeItem = asyncWrapper(async (req, res, next) => {
  const item = await Food.findById(req.params.id);
  fs.unlinkSync(`uploads/${item.image}`);
  await Food.findByIdAndDelete(req.params.id);
  res.json({
    success: true,
    message: "Item Removed",
    data: null,
    code: 200,
  });
});

module.exports = {
  addItem,
  allItems,
  removeItem,
};
