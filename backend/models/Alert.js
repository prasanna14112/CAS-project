const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  userId: String,
  message: String,
  riskLevel: String,
  reasons: [String],
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Alert", alertSchema);
