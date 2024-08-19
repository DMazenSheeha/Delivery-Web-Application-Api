require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./config/mongodb");
const appError = require("./utils/appError");
const foodRoutes = require("./routes/food.routes");
const path = require("path");
const userRoutes = require("./routes/user.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");

// app config
const app = express();
const port = process.env.PORT;

// Mongodb Connection
dbConnection();

// middleware
app.use(express.json());
app.use(cors());

// API endpoints
app.use("/api/food", foodRoutes);
app.use("/api/food/image", express.static(path.join(__dirname, "uploads")));
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.use("*", (req, res, next) => {
  const newError = appError.create(false, "Route Not Found", 404);
  next(newError);
});

app.use((err, req, res, next) => {
  if (err) {
    res.json({
      success: false,
      message: err.message,
      data: null,
      code: err.code || 400,
    });
  }
});

app.listen(port, () => {
  console.log(`Hello, Iam The Serve ... Iam Running Now On Port ${port} <3 `);
});
