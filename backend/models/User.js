// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: String,
//   password: String,
//   role: { type: String, default: "user" },
//   warnings: { type: Number, default: 0 },
//   riskScore: { type: Number, default: 0 },
//   riskLevel: { type: String, default: "LOW" },
//   blocked: { type: Boolean, default: false }
// });

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  name: { type: String, default: "" },
  password: String,
  role: { type: String, default: "user" },
  warnings: { type: Number, default: 0 },
  lastWarning: { type: String, default: "" }, // ✅ NEW
  riskScore: { type: Number, default: 0 },
  riskLevel: { type: String, default: "LOW" },
  blocked: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);

