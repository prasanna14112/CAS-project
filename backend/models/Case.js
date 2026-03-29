// const mongoose = require("mongoose");

// const caseSchema = new mongoose.Schema({
//   alertId: String,
//   status: { type: String, default: "OPEN" },
//   remarks: String
// });

// module.exports = mongoose.model("Case", caseSchema);


const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  alertId: String,
  status: { type: String, default: "OPEN" }, // OPEN, REVIEW, CLOSED
  remarks: { type: String, default: "" }
});

module.exports = mongoose.model("Case", caseSchema);
