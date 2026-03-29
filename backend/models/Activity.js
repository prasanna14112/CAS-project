// // const mongoose = require("mongoose");

// // const activitySchema = new mongoose.Schema({
// //   userId: String,
// //   action: String,
// //   isRestricted: Boolean,
// //   timestamp: { type: Date, default: Date.now }
// // });

// // module.exports = mongoose.model("Activity", activitySchema);

// // const mongoose = require("mongoose");

// // const activitySchema = new mongoose.Schema({
// //   userId: String,
// //   userName: String,
// //   message: String,
// //   severity: String,
// //   riskLevel: String,
// //   createdAt: {
// //     type: Date,
// //     default: Date.now
// //   }
// // });

// // module.exports = mongoose.model("Activity", activitySchema);


// /*
// const mongoose = require("mongoose");

// const activitySchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     required: true
//   },
//   userName: {
//     type: String,
//     default: "Unknown"
//   },
//   email: {
//     type: String,
//     default: "Unknown"
//   },
//   role: {
//     type: String,
//     enum: ["user", "admin"],
//     default: "user"
//   },
//   message: {
//     type: String,
//     required: true
//   },
//   risk: {
//     type: String,
//     enum: ["LOW", "MEDIUM", "HIGH"],
//     default: "LOW"
//   },
//   severity: {
//     type: String,
//     enum: ["LOW", "MEDIUM", "HIGH"],
//     default: "LOW"
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model("Activity", activitySchema);
// */

// const mongoose = require("mongoose");

// const activitySchema = new mongoose.Schema(
//   {
//     /* ================= USER INFO ================= */
//     userId: {
//       type: String,
//       required: true,
//       index: true
//     },

//     userName: {
//       type: String,
//       default: "Unknown"
//     },

//     email: {
//       type: String,
//       default: "Unknown"
//     },

//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user"
//     },

//     /* ================= MESSAGE ================= */
//     message: {
//       type: String,
//       required: true
//     },

//     /* ================= RISK SYSTEM ================= */
//     severity: {
//       type: String,
//       enum: ["LOW", "MEDIUM", "HIGH"],
//       default: "LOW"
//     },

//     riskLevel: {
//       type: String,
//       enum: ["LOW", "MEDIUM", "HIGH"],
//       default: "LOW"
//     },

//     /* ================= SOURCE ================= */
//     source: {
//       type: String,
//       enum: ["SYSTEM", "ADMIN", "USER"],
//       default: "SYSTEM"
//     }
//   },
//   {
//     timestamps: true // adds createdAt + updatedAt
//   }
// );

// module.exports = mongoose.model("Activity", activitySchema);


const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },

  userName: {
    type: String,
    default: "Unknown"
  },

  email: {
    type: String,
    default: "Unknown"
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  message: {
    type: String,
    required: true
  },

  severity: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
    default: "LOW"
  },

  risk: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
    default: "LOW"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Activity", activitySchema);
