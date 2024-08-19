const express = require("express");
const {
  addItem,
  allItems,
  removeItem,
} = require("../controllers/food.controller");
const multer = require("multer");
const foodRoutes = express.Router();

// image upload engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now().toString() + file.originalname}`);
  },
});
const upload = multer({ storage: storage });

foodRoutes.post("/add", upload.single("image"), addItem);
foodRoutes.get("/list", allItems);
foodRoutes.delete("/remove/:id", removeItem);

module.exports = foodRoutes;
