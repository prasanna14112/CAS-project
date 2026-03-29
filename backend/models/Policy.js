const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  action: String,
  maxAllowed: Number,
  riskWeight: Number
});

module.exports = mongoose.model("Policy", policySchema);
