const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  items: { type: Object, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: "processing", required: true },
  userId: { type: String, required: true },
  clientInformation: { type: Object, required: true },
});

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
