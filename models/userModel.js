const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: { type: Object, default: {} },
    orders: [],
  },
  { minimize: false }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
