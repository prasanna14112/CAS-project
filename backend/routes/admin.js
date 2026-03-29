/*const router = require("express").Router();
const User = require("../models/User");
const Alert = require("../models/Alert");
const Case = require("../models/Case");
const Activity = require("../models/Activity");

// Advanced engines
const { computeIntentScore } = require("../engine/intentEngine");
const { computeAnomalyScore } = require("../engine/anomalyEngine");
const { evaluatePolicies } = require("../engine/policyEvaluator");
const { fuseRisk } = require("../engine/riskFusionEngine");

// ==========================
// 📊 BASIC ANALYTICS
// ==========================

router.get("/analytics", async (req, res) => {
  const totalActivities = await Activity.countDocuments();
  const restrictedCount = await Activity.countDocuments({ isRestricted: true });

  const low = await User.countDocuments({ riskLevel: "LOW" });
  const medium = await User.countDocuments({ riskLevel: "MEDIUM" });
  const high = await User.countDocuments({ riskLevel: "HIGH" });

  res.json({
    totalActivities,
    restrictedCount,
    riskStats: { low, medium, high }
  });
});


router.get("/stats", async (req, res) => {
  const users = await User.countDocuments();
  const alerts = await Alert.countDocuments();
  const high = await User.countDocuments({ riskLevel: "HIGH" });

  res.json({ users, alerts, high });
});

// ==========================
// 👤 USER BASIC INFO
// ==========================

router.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  const activities = await Activity.find({ userId: req.params.id });

  res.json({ user, activitiesCount: activities.length });
});

// ==========================
// 📁 CASE MANAGEMENT
// ==========================

router.post("/update-case", async (req, res) => {
  const { caseId, status, remarks } = req.body;
  await Case.findByIdAndUpdate(caseId, { status, remarks });
  res.json({ message: "Case updated" });
});

router.get("/cases", async (req, res) => {
  res.json(await Case.find());
});

router.post("/create-case", async (req, res) => {
  const { alertId } = req.body;
  await Case.create({ alertId });
  res.json({ message: "Case created" });
});

// ==========================
// 🔐 USER CONTROL
// ==========================

router.post("/lock-user", async (req, res) => {
  await User.findByIdAndUpdate(req.body.userId, { blocked: true });
  res.json({ message: "User locked" });
});

router.post("/unlock-user", async (req, res) => {
  await User.findByIdAndUpdate(req.body.userId, {
    blocked: false,
    warnings: 0,
    riskLevel: "LOW",
    riskScore: 0
  });
  res.json({ message: "User unlocked" });
});

router.get("/users", async (req, res) => {
  res.json(await User.find());
});

// ==========================
// 🚨 ALERTS
// ==========================

router.get("/alerts", async (req, res) => {
  res.json(await Alert.find().sort({ timestamp: -1 }));
});

// ==========================
// 🧠 1️⃣ RISK BREAKDOWN PER USER (EXPLAINABLE AI)
// ==========================

router.get("/risk-breakdown/:userId", async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);
  const activities = await Activity.find({ userId })
    .sort({ timestamp: -1 })
    .limit(50);

  const intentScore = computeIntentScore(activities, user);
  const anomalyScore = computeAnomalyScore(activities);

  const { policyScore, reasons } =
    await evaluatePolicies("ANY", activities);

  const { finalScore, riskLevel } =
    fuseRisk(intentScore, anomalyScore, policyScore);

  res.json({
    user: user.username,
    intentScore,
    anomalyScore,
    policyScore,
    finalScore,
    riskLevel,
    reasons
  });
});

// ==========================
// 📈 2️⃣ TREND ANALYTICS
// ==========================

// Risk trend over time (for graph)
router.get("/risk-trend/:userId", async (req, res) => {
  const logs = await Activity.find({ userId: req.params.userId })
    .sort({ timestamp: 1 });

  const points = logs.map((l, i) => ({
    time: l.timestamp,
    value: l.isRestricted ? 2 : 1
  }));

  res.json(points);
});

// Violation heatmap (0–23 hours)
router.get("/violation-heatmap", async (req, res) => {
  const logs = await Activity.find({ isRestricted: true });
  const map = Array(24).fill(0);

  logs.forEach(l => {
    const h = new Date(l.timestamp).getHours();
    map[h]++;
  });

  res.json(map);
});

// User risk snapshot
router.get("/risk-snapshots", async (req, res) => {
  const users = await User.find();

  res.json(users.map(u => ({
    user: u.username,
    risk: u.riskScore || 0
  })));
});

// ==========================
// 🕵️ 3️⃣ INVESTIGATION: WHY THIS USER IS RISKY?
// ==========================

router.get("/investigate/:userId", async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);
  const activities = await Activity.find({ userId })
    .sort({ timestamp: -1 })
    .limit(100);
  const alerts = await Alert.find({ userId })
    .sort({ timestamp: -1 });

  res.json({
    user,
    recentActivities: activities,
    alerts
  });
});

router.get("/user-details/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  const activities = await Activity.find({ userId: req.params.id }).sort({ timestamp: -1 });

  const total = activities.length;
  const restricted = activities.filter(a => a.isRestricted).length;

  res.json({
    user,
    stats: {
      totalActivities: total,
      restrictedActivities: restricted,
      warnings: user.warnings,
      riskLevel: user.riskLevel
    },
    activities
  });
});

// ==========================
// 🔍 SAFE GLOBAL SEARCH
// ==========================

router.get("/search", async (req, res) => {
  try {
    const q = (req.query.q || "").toLowerCase();

    // fetch small datasets
    const usersAll = await User.find().limit(20);
    const alertsAll = await Alert.find().limit(20);
    const casesAll = await Case.find().limit(20);

    // filter safely in JS
    const users = usersAll.filter(u =>
      u.username?.toLowerCase().includes(q)
    );

    const alerts = alertsAll.filter(a =>
      a.message?.toLowerCase().includes(q)
    );

    const cases = casesAll.filter(c =>
      String(c._id).includes(q)
    );

    res.json({ users, alerts, cases });

  } catch (err) {
    console.log("Search crash:", err);
    res.json({ users: [], alerts: [], cases: [] }); // NEVER 500
  }
});


// 📈 Risk over time (daily)
router.get("/analytics/risk-trend", async (req, res) => {
  const Activity = require("../models/Activity");

  const data = await Activity.aggregate([
    {
      $group: {
        _id: { $substr: ["$timestamp", 0, 10] },
        total: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  res.json(data);
});

// 👤 User risk timeline
router.get("/analytics/user/:id", async (req, res) => {
  const Alert = require("../models/Alert");

  const alerts = await Alert.find({ userId: req.params.id }).sort({ timestamp: 1 });

  res.json(alerts);
});

// 🔥 Violation heatmap
router.get("/analytics/heatmap", async (req, res) => {
  const Activity = require("../models/Activity");

  const data = await Activity.aggregate([
    {
      $project: {
        hour: { $hour: "$timestamp" }
      }
    },
    {
      $group: {
        _id: "$hour",
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  res.json(data);
});

// 🧠 Explain user risk
router.get("/explain/user/:id", async (req, res) => {
  const User = require("../models/User");
  const Activity = require("../models/Activity");
  const Alert = require("../models/Alert");

  const user = await User.findById(req.params.id);

  const activities = await Activity.find({ userId: user._id });
  const alerts = await Alert.find({ userId: user._id });

  const restricted = activities.filter(a => a.isRestricted).length;

  const explanation = {
    riskLevel: user.riskLevel,
    reasons: [
      restricted > 0 ? `${restricted} restricted accesses` : null,
      alerts.length > 0 ? `${alerts.length} alerts generated` : null,
      user.warnings > 0 ? `${user.warnings} warnings` : null
    ].filter(Boolean)
  };

  res.json(explanation);
});


module.exports = router;
*/

/*
const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

router.get("/alerts", async (req, res) => {
  const data = await Activity.find().sort({ createdAt: -1 });
  res.json(data);
});

module.exports = router;
*/


// const router = require("express").Router();
// const User = require("../models/User");
// const Activity = require("../models/Activity");
// const detectRisk = require("../utils/riskEngine");



// /* ================= USER RISK TREND ================= */




// router.get("/explain/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const records = await Activity.find({ userId }).sort({ createdAt: -1 });

//     if (!records.length) {
//       return res.json({
//         userId,
//         email: "Unknown",
//         lastSeen: new Date(),
//         overallRisk: "LOW",
//         summary: "No activity found for this user.",
//         signals: [],
//         timeline: []
//       });
//     }

//     let high = 0, medium = 0, low = 0;
//     const keywordMap = {};

//     const keywords = ["otp", "click", "link", "bank", "win", "prize", "download"];

//     records.forEach(r => {
//       const risk = r.risk || detectRisk(r.message);

//       if (risk === "HIGH") high++;
//       else if (risk === "MEDIUM") medium++;
//       else low++;

//       const msg = r.message.toLowerCase();
//       keywords.forEach(k => {
//         if (msg.includes(k)) {
//           keywordMap[k] = (keywordMap[k] || 0) + 1;
//         }
//       });
//     });

//     let overallRisk = "LOW";
//     if (high > 0) overallRisk = "HIGH";
//     else if (medium > 1) overallRisk = "MEDIUM";

//     const signals = Object.entries(keywordMap).map(([term, count]) => ({
//       term,
//       count
//     }));

//     const timeline = records
//       .slice(0, 20)
//       .reverse()
//       .map(r => ({
//         risk: r.risk || detectRisk(r.message),
//         time: r.createdAt
//       }));

//     const summary = `This user has sent ${records.length} total messages. The system detected ${high} high-risk and ${medium} medium-risk messages. Common risk patterns include ${
//       signals.map(s => s.term).join(", ") || "no significant keywords"
//     }.`;

//     res.json({
//       userId,
//       email: records[0].email || "Unknown",
//       userName: records[0].userName || "Unknown",
//       lastSeen: records[0].createdAt,
//       overallRisk,
//       summary,
//       signals,
//       timeline
//     });
//   } catch (err) {
//     console.error("Explain error:", err);
//     res.status(500).json({ message: "Explain failed" });
//   }
// });
// /** warning*/
// router.post("/warn", async (req, res) => {
//   try {
//     const { userId, message, adminEmail } = req.body;

//     const activity = new Activity({
//       userId,
//       userName: "ADMIN",
//       email: adminEmail || "admin",
//       role: "admin",
//       message: `⚠ ADMIN WARNING: ${message}`,
//       risk: "HIGH",
//       severity: "HIGH"
//     });

//     await activity.save();
//     res.json({ success: true });
//   } catch (err) {
//     console.error("Warn error:", err);
//     res.status(500).json({ message: "Failed to send warning" });
//   }
// });


// /* =====================================================
//    ⚠ ADMIN SEND WARNING
//    POST /api/admin/warn-user
// ===================================================== */
// router.post("/warn-user", async (req, res) => {
//   try {
//     const { userId, message } = req.body;

//     if (!userId || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "userId and message required"
//       });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     // Increase warning count
//     user.warnings += 1;
//     user.lastWarning = message;

//     // Force high risk
//     user.riskLevel = "HIGH";
//     user.riskScore = 100;

//     await user.save();

//     // Log as activity (audit trail)
//     await Activity.create({
//       userId,
//       userName: user.username,
//       message: `⚠ ADMIN WARNING: ${message}`,
//       severity: "HIGH",
//       riskLevel: "HIGH"
//     });

//     res.json({
//       success: true,
//       message: "Warning sent to user"
//     });
//   } catch (err) {
//     console.error("WARN USER ERROR:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send warning"
//     });
//   }
// });

// /* =====================================================
//    👥 GET ALL USERS
//    GET /api/admin/users
// ===================================================== */
// router.get("/users", async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json(users);
//   } catch (err) {
//     console.error("FETCH USERS ERROR:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch users"
//     });
//   }
// });

// /* =====================================================
//    🔒 BLOCK USER
//    POST /api/admin/block-user
// ===================================================== */
// router.post("/block-user", async (req, res) => {
//   try {
//     const { userId } = req.body;

//     await User.findByIdAndUpdate(userId, {
//       blocked: true
//     });

//     res.json({
//       success: true,
//       message: "User blocked"
//     });
//   } catch (err) {
//     console.error("BLOCK USER ERROR:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to block user"
//     });
//   }
// });

// /* =====================================================
//    🔓 UNBLOCK USER
//    POST /api/admin/unblock-user
// ===================================================== */
// router.post("/unblock-user", async (req, res) => {
//   try {
//     const { userId } = req.body;

//     await User.findByIdAndUpdate(userId, {
//       blocked: false
//     });

//     res.json({
//       success: true,
//       message: "User unblocked"
//     });
//   } catch (err) {
//     console.error("UNBLOCK USER ERROR:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to unblock user"
//     });
//   }
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const Activity = require("../models/Activity");
// const User = require("../models/User");

// /* ================= RISK DETECTION ================= */

// function detectSeverity(message = "") {
//   const msg = String(message).toLowerCase().trim();

//   const highRisk = [
//     "otp",
//     "bank",
//     "account",
//     "upi",
//     "credit card",
//     "debit card",
//     "pin",
//     "password",
//     "click",
//     "link",
//     "free",
//     "money",
//     "win",
//     "prize",
//     "gift",
//     "verify",
//     "urgent",
//     "bonus",
//     "transfer"
//   ];

//   const mediumRisk = [
//     "download",
//     "internal",
//     "company",
//     "restricted",
//     "private",
//     "policy",
//     "file",
//     "document"
//   ];

//   for (const word of highRisk) {
//     if (msg.includes(word)) return "HIGH";
//   }

//   for (const word of mediumRisk) {
//     if (msg.includes(word)) return "MEDIUM";
//   }

//   return "LOW";
// }

// /* ================= ADMIN: SEND WARNING ================= */
// /*
//   POST /api/admin/warn
//   Body: { userId, adminName, message }
// */
// router.post("/warn", async (req, res) => {
//   try {
//     const { userId, adminName, message } = req.body;

//     if (!userId || !message) {
//       return res.status(400).json({ message: "Missing userId or message" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const activity = await Activity.create({
//       userId,
//       userName: adminName || "Admin",
//       email: "admin@system",
//       role: "admin",
//       message: `⚠ ADMIN WARNING: ${message}`,
//       severity: "HIGH",
//       risk: "HIGH",
//       createdAt: new Date()
//     });

//     // Increase user warnings count
//     user.warnings = (user.warnings || 0) + 1;
//     user.riskLevel = "HIGH";
//     await user.save();

//     res.json({ success: true, activity });
//   } catch (err) {
//     console.error("WARN ERROR:", err);
//     res.status(500).json({ message: "Failed to send warning" });
//   }
// });

// /* ================= ADMIN: BLOCK USER ================= */
// /*
//   POST /api/admin/block
//   Body: { userId }
// */
// router.post("/block", async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.blocked = true;
//     user.riskLevel = "HIGH";
//     await user.save();

//     // Log admin action
//     await Activity.create({
//       userId,
//       userName: "Admin",
//       email: "admin@system",
//       role: "admin",
//       message: "🚫 User account blocked by admin",
//       severity: "HIGH",
//       risk: "HIGH",
//       createdAt: new Date()
//     });

//     res.json({ success: true, message: "User blocked" });
//   } catch (err) {
//     console.error("BLOCK ERROR:", err);
//     res.status(500).json({ message: "Failed to block user" });
//   }
// });

// /* ================= ADMIN: UNBLOCK USER ================= */
// /*
//   POST /api/admin/unblock
//   Body: { userId }
// */
// router.post("/unblock", async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.blocked = false;
//     user.riskLevel = "LOW";
//     await user.save();

//     // Log admin action
//     await Activity.create({
//       userId,
//       userName: "Admin",
//       email: "admin@system",
//       role: "admin",
//       message: "✅ User account unblocked by admin",
//       severity: "LOW",
//       risk: "LOW",
//       createdAt: new Date()
//     });

//     res.json({ success: true, message: "User unblocked" });
//   } catch (err) {
//     console.error("UNBLOCK ERROR:", err);
//     res.status(500).json({ message: "Failed to unblock user" });
//   }
// });

// /* ================= ADMIN: LIST USERS ================= */
// /*
//   GET /api/admin/users
// */
// router.get("/users", async (req, res) => {
//   try {
//     const users = await User.find().select(
//       "username role warnings riskLevel blocked"
//     );
//     res.json(users);
//   } catch (err) {
//     console.error("USERS ERROR:", err);
//     res.status(500).json({ message: "Failed to load users" });
//   }
// });

// /* ================= ADMIN: EXPLAIN USER RISK ================= */
// /*
//   GET /api/admin/explain/:userId
// */
// router.get("/explain/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const records = await Activity.find({ userId }).sort({
//       createdAt: -1
//     });

//     if (!records.length) {
//       return res.json({
//         userId,
//         userName: "Unknown",
//         email: "Unknown",
//         lastSeen: new Date(),
//         overallRisk: "LOW",
//         summary: "No activity found for this user.",
//         signals: [],
//         timeline: []
//       });
//     }

//     let high = 0,
//       medium = 0,
//       low = 0;

//     const keywordMap = {};
//     const keywords = [
//       "otp",
//       "click",
//       "link",
//       "bank",
//       "win",
//       "prize",
//       "download",
//       "money",
//       "free",
//       "verify"
//     ];

//     records.forEach((r) => {
//       const risk = detectSeverity(r.message || "");

//       if (risk === "HIGH") high++;
//       else if (risk === "MEDIUM") medium++;
//       else low++;

//       const msg = (r.message || "").toLowerCase();
//       keywords.forEach((k) => {
//         if (msg.includes(k)) {
//           keywordMap[k] = (keywordMap[k] || 0) + 1;
//         }
//       });
//     });

//     let overallRisk = "LOW";
//     if (high > 0) overallRisk = "HIGH";
//     else if (medium > 1) overallRisk = "MEDIUM";

//     const signals = Object.entries(keywordMap).map(
//       ([term, count]) => ({
//         term,
//         count
//       })
//     );

//     const timeline = records
//       .slice(0, 20)
//       .reverse()
//       .map((r) => ({
//         risk: detectSeverity(r.message || ""),
//         time: r.createdAt,
//         message: r.message
//       }));

//     const summary = `This user has sent ${
//       records.length
//     } total messages. The system detected ${high} high-risk and ${medium} medium-risk messages. Common risk indicators include ${
//       signals.map((s) => s.term).join(", ") || "no significant keywords"
//     }.`;

//     res.json({
//       userId,
//       userName: records[0].userName || "Unknown",
//       email: records[0].email || "Unknown",
//       lastSeen: records[0].createdAt,
//       overallRisk,
//       summary,
//       signals,
//       timeline
//     });
//   } catch (err) {
//     console.error("EXPLAIN ERROR:", err);
//     res.status(500).json({ message: "Explain failed" });
//   }
// });

// /* ================= ADMIN: AUDIT LOGS ================= */
// /*
//   GET /api/admin/audit
//   Returns only admin actions
// */
// router.get("/audit", async (req, res) => {
//   try {
//     const logs = await Activity.find({ role: "admin" }).sort({
//       createdAt: -1
//     });
//     res.json(logs);
//   } catch (err) {
//     console.error("AUDIT ERROR:", err);
//     res.status(500).json({ message: "Failed to load audit logs" });
//   }
// });

// module.exports = router;






// const express = require("express");
// const router = express.Router();
// const Activity = require("../models/Activity");
// const User = require("../models/User");

// /* ================= RISK DETECTION ================= */

// function detectSeverity(message = "") {
//   const msg = String(message).toLowerCase().trim();

//   const highRisk = [
//     "otp",
//     "bank",
//     "account",
//     "upi",
//     "credit card",
//     "debit card",
//     "pin",
//     "password",
//     "click",
//     "link",
//     "free",
//     "money",
//     "win",
//     "prize",
//     "gift",
//     "verify",
//     "urgent",
//     "bonus",
//     "transfer",
//     "kill",
//     "threat"
//   ];

//   const mediumRisk = [
//     "download",
//     "internal",
//     "company",
//     "restricted",
//     "private",
//     "policy",
//     "file",
//     "document",
//     "share"
//   ];

//   for (const word of highRisk) {
//     if (msg.includes(word)) return "HIGH";
//   }

//   for (const word of mediumRisk) {
//     if (msg.includes(word)) return "MEDIUM";
//   }

//   return "LOW";
// }

// /* ================= ADMIN: SEND WARNING ================= */
// /*
//   POST /api/admin/warn-user
//   Body: { userId, message }
// */
// router.post("/warn-user", async (req, res) => {
//   try {
//     const { userId, message } = req.body;

//     if (!userId || !message) {
//       return res
//         .status(400)
//         .json({ message: "Missing userId or message" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Create admin warning activity
//     const activity = await Activity.create({
//       userId: user._id.toString(),
//       userName: user.username || "User",
//       email: user.email || "unknown@email.com",
//       role: "admin",
//       source: "ADMIN",
//       message: `⚠ ADMIN WARNING: ${message}`,
//       severity: "HIGH",
//       riskLevel: "HIGH"
//     });

//     // Update user risk & warnings
//     user.warnings = (user.warnings || 0) + 1;
//     user.riskLevel = "HIGH";
//     await user.save();

//     res.json({
//       success: true,
//       message: "Warning sent successfully",
//       activity
//     });
//   } catch (err) {
//     console.error("WARN ERROR:", err);
//     res.status(500).json({ message: "Failed to send warning" });
//   }
// });

// /* ================= ADMIN: BLOCK USER ================= */
// /*
//   POST /api/admin/lock-user
//   Body: { userId }
// */
// router.post("/lock-user", async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.blocked = true;
//     user.riskLevel = "HIGH";
//     await user.save();

//     // Log admin action
//     await Activity.create({
//       userId: user._id.toString(),
//       userName: user.username || "User",
//       email: user.email || "unknown@email.com",
//       role: "admin",
//       source: "ADMIN",
//       message: "🚫 User account blocked by admin",
//       severity: "HIGH",
//       riskLevel: "HIGH"
//     });

//     res.json({ success: true, message: "User blocked" });
//   } catch (err) {
//     console.error("BLOCK ERROR:", err);
//     res.status(500).json({ message: "Failed to block user" });
//   }
// });

// /* ================= ADMIN: UNBLOCK USER ================= */
// /*
//   POST /api/admin/unlock-user
//   Body: { userId }
// */
// router.post("/unlock-user", async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.blocked = false;
//     user.riskLevel = "LOW";
//     await user.save();

//     // Log admin action
//     await Activity.create({
//       userId: user._id.toString(),
//       userName: user.username || "User",
//       email: user.email || "unknown@email.com",
//       role: "admin",
//       source: "ADMIN",
//       message: "✅ User account unblocked by admin",
//       severity: "LOW",
//       riskLevel: "LOW"
//     });

//     res.json({ success: true, message: "User unblocked" });
//   } catch (err) {
//     console.error("UNBLOCK ERROR:", err);
//     res.status(500).json({ message: "Failed to unblock user" });
//   }
// });

// /* ================= ADMIN: LIST USERS ================= */
// /*
//   GET /api/admin/users
// */
// router.get("/users", async (req, res) => {
//   try {
//     const users = await User.find().select(
//       "username email role warnings riskLevel blocked"
//     );
//     res.json(users);
//   } catch (err) {
//     console.error("USERS ERROR:", err);
//     res.status(500).json({ message: "Failed to load users" });
//   }
// });

// /* ================= ADMIN: EXPLAIN USER RISK ================= */
// /*
//   GET /api/admin/explain/:userId
// */
// router.get("/explain/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const records = await Activity.find({ userId }).sort({
//       createdAt: -1
//     });

//     if (!records.length) {
//       return res.json({
//         userId,
//         userName: "Unknown",
//         email: "Unknown",
//         lastSeen: new Date(),
//         overallRisk: "LOW",
//         summary: "No activity found for this user.",
//         signals: [],
//         timeline: []
//       });
//     }

//     let high = 0,
//       medium = 0,
//       low = 0;

//     const keywordMap = {};
//     const keywords = [
//       "otp",
//       "click",
//       "link",
//       "bank",
//       "win",
//       "prize",
//       "download",
//       "money",
//       "free",
//       "verify",
//       "kill",
//       "threat"
//     ];

//     records.forEach((r) => {
//       const risk = detectSeverity(r.message || "");

//       if (risk === "HIGH") high++;
//       else if (risk === "MEDIUM") medium++;
//       else low++;

//       const msg = (r.message || "").toLowerCase();
//       keywords.forEach((k) => {
//         if (msg.includes(k)) {
//           keywordMap[k] = (keywordMap[k] || 0) + 1;
//         }
//       });
//     });

//     let overallRisk = "LOW";
//     if (high > 0) overallRisk = "HIGH";
//     else if (medium > 1) overallRisk = "MEDIUM";

//     const signals = Object.entries(keywordMap).map(
//       ([term, count]) => ({
//         term,
//         count
//       })
//     );

//     const timeline = records
//       .slice(0, 20)
//       .reverse()
//       .map((r) => ({
//         risk: r.riskLevel || detectSeverity(r.message || ""),
//         time: r.createdAt,
//         message: r.message
//       }));

//     const summary = `This user has sent ${
//       records.length
//     } total messages. The system detected ${high} high-risk and ${medium} medium-risk messages. Common risk indicators include ${
//       signals.map((s) => s.term).join(", ") || "no significant keywords"
//     }.`;

//     res.json({
//       userId,
//       userName: records[0].userName || "Unknown",
//       email: records[0].email || "Unknown",
//       lastSeen: records[0].createdAt,
//       overallRisk,
//       summary,
//       signals,
//       timeline
//     });
//   } catch (err) {
//     console.error("EXPLAIN ERROR:", err);
//     res.status(500).json({ message: "Explain failed" });
//   }
// });

// /* ================= ADMIN: AUDIT LOGS ================= */
// /*
//   GET /api/admin/audit
// */
// router.get("/audit", async (req, res) => {
//   try {
//     const logs = await Activity.find({
//       role: "admin"
//     }).sort({ createdAt: -1 });

//     res.json(logs);
//   } catch (err) {
//     console.error("AUDIT ERROR:", err);
//     res.status(500).json({ message: "Failed to load audit logs" });
//   }
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const Activity = require("../models/Activity");
// const User = require("../models/User");

// /* ================= RISK DETECTION ================= */

// function detectSeverity(message = "") {
//   const msg = String(message).toLowerCase().trim();

//   const highRisk = [
//     "otp",
//     "bank",
//     "account",
//     "upi",
//     "credit card",
//     "debit card",
//     "pin",
//     "password",
//     "click",
//     "link",
//     "free",
//     "money",
//     "win",
//     "prize",
//     "gift",
//     "verify",
//     "urgent",
//     "bonus",
//     "transfer",
//     "kill",
//     "threat"
//   ];

//   const mediumRisk = [
//     "download",
//     "internal",
//     "company",
//     "restricted",
//     "private",
//     "policy",
//     "file",
//     "document",
//     "share"
//   ];

//   for (const word of highRisk) {
//     if (msg.includes(word)) return "HIGH";
//   }

//   for (const word of mediumRisk) {
//     if (msg.includes(word)) return "MEDIUM";
//   }

//   return "LOW";
// }

// /* ================================================= */
// /* ================= SEND WARNING =================== */
// /* ================================================= */
// /*
//   POST /api/admin/warn-user
//   Body: { userId, message }
// */
// router.post("/warn-user", async (req, res) => {
//   try {
//     const { userId, message } = req.body;

//     if (!userId || !message) {
//       return res
//         .status(400)
//         .json({ message: "Missing userId or message" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     /* ===== UPDATE USER RECORD ===== */
//     user.warnings = (user.warnings || 0) + 1;
//     user.lastWarning = message;
//     user.riskLevel = "HIGH";
//     user.riskScore = (user.riskScore || 0) + 25;

//     await user.save();

//     /* ===== LOG ADMIN ACTION (AUDIT) ===== */
//     const activity = await Activity.create({
//       userId: user._id.toString(),
//       userName: user.username || "User",
//       email: user.email || "unknown@email.com",
//       role: "admin",
//       message: `⚠ ADMIN WARNING SENT: ${message}`,
//       severity: "HIGH",
//       risk: "HIGH",
//       createdAt: new Date()
//     });

//     res.json({
//       success: true,
//       message: "Warning sent successfully",
//       user: {
//         id: user._id,
//         warnings: user.warnings,
//         lastWarning: user.lastWarning,
//         riskLevel: user.riskLevel
//       },
//       activity
//     });
//   } catch (err) {
//     console.error("WARN ERROR:", err);
//     res.status(500).json({ message: "Failed to send warning" });
//   }
// });

// /* ================================================= */
// /* ================= BLOCK USER ===================== */
// /* ================================================= */
// /*
//   POST /api/admin/lock-user
//   Body: { userId }
// */
// router.post("/lock-user", async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.blocked = true;
//     user.riskLevel = "HIGH";
//     await user.save();

//     await Activity.create({
//       userId: user._id.toString(),
//       userName: user.username || "User",
//       email: user.email || "unknown@email.com",
//       role: "admin",
//       message: "🚫 USER BLOCKED BY ADMIN",
//       severity: "HIGH",
//       risk: "HIGH",
//       createdAt: new Date()
//     });

//     res.json({ success: true, message: "User blocked" });
//   } catch (err) {
//     console.error("BLOCK ERROR:", err);
//     res.status(500).json({ message: "Failed to block user" });
//   }
// });

// /* ================================================= */
// /* ================= UNBLOCK USER =================== */
// /* ================================================= */
// /*
//   POST /api/admin/unlock-user
//   Body: { userId }
// */
// router.post("/unlock-user", async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.blocked = false;
//     user.riskLevel = "LOW";
//     await user.save();

//     await Activity.create({
//       userId: user._id.toString(),
//       userName: user.username || "User",
//       email: user.email || "unknown@email.com",
//       role: "admin",
//       message: "✅ USER UNBLOCKED BY ADMIN",
//       severity: "LOW",
//       risk: "LOW",
//       createdAt: new Date()
//     });

//     res.json({ success: true, message: "User unblocked" });
//   } catch (err) {
//     console.error("UNBLOCK ERROR:", err);
//     res.status(500).json({ message: "Failed to unblock user" });
//   }
// });

// /* ================================================= */
// /* ================= LIST USERS ===================== */
// /* ================================================= */
// /*
//   GET /api/admin/users
// */
// router.get("/users", async (req, res) => {
//   try {
//     const users = await User.find().select(
//       "username email role warnings lastWarning riskLevel blocked"
//     );
//     res.json(users);
//   } catch (err) {
//     console.error("USERS ERROR:", err);
//     res.status(500).json({ message: "Failed to load users" });
//   }
// });

// /* ================================================= */
// /* ============== EXPLAIN USER RISK ================= */
// /* ================================================= */
// /*
//   GET /api/admin/explain/:userId
// */
// router.get("/explain/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const records = await Activity.find({ userId }).sort({
//       createdAt: -1
//     });

//     if (!records.length) {
//       return res.json({
//         userId,
//         userName: "Unknown",
//         email: "Unknown",
//         lastSeen: new Date(),
//         overallRisk: "LOW",
//         summary: "No activity found for this user.",
//         signals: [],
//         timeline: []
//       });
//     }

//     let high = 0,
//       medium = 0,
//       low = 0;

//     const keywordMap = {};
//     const keywords = [
//       "otp",
//       "click",
//       "link",
//       "bank",
//       "win",
//       "prize",
//       "download",
//       "money",
//       "free",
//       "verify",
//       "kill",
//       "threat"
//     ];

//     records.forEach((r) => {
//       const risk = detectSeverity(r.message || "");

//       if (risk === "HIGH") high++;
//       else if (risk === "MEDIUM") medium++;
//       else low++;

//       const msg = (r.message || "").toLowerCase();
//       keywords.forEach((k) => {
//         if (msg.includes(k)) {
//           keywordMap[k] = (keywordMap[k] || 0) + 1;
//         }
//       });
//     });

//     let overallRisk = "LOW";
//     if (high > 0) overallRisk = "HIGH";
//     else if (medium > 1) overallRisk = "MEDIUM";

//     const signals = Object.entries(keywordMap).map(
//       ([term, count]) => ({
//         term,
//         count
//       })
//     );

//     const timeline = records
//       .slice(0, 20)
//       .reverse()
//       .map((r) => ({
//         risk: r.risk || detectSeverity(r.message || ""),
//         time: r.createdAt,
//         message: r.message
//       }));

//     const summary = `This user has sent ${
//       records.length
//     } total messages. The system detected ${high} high-risk and ${medium} medium-risk messages. Common risk indicators include ${
//       signals.map((s) => s.term).join(", ") || "no significant keywords"
//     }.`;

//     res.json({
//       userId,
//       userName: records[0].userName || "Unknown",
//       email: records[0].email || "Unknown",
//       lastSeen: records[0].createdAt,
//       overallRisk,
//       summary,
//       signals,
//       timeline
//     });
//   } catch (err) {
//     console.error("EXPLAIN ERROR:", err);
//     res.status(500).json({ message: "Explain failed" });
//   }
// });

// /* ================================================= */
// /* ================= ADMIN AUDIT ==================== */
// /* ================================================= */
// /*
//   GET /api/admin/audit
// */
// router.get("/audit", async (req, res) => {
//   try {
//     const logs = await Activity.find({
//       role: "admin"
//     }).sort({ createdAt: -1 });

//     res.json(logs);
//   } catch (err) {
//     console.error("AUDIT ERROR:", err);
//     res.status(500).json({ message: "Failed to load audit logs" });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");
const User = require("../models/User");
const Message = require("../models/Message");
const AdminNotification = require("../models/AdminNotification");
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/admin");

router.use(auth);
router.use(adminOnly);

/* ================================================= */
/* ================= RISK DETECTOR ================= */
/* ================================================= */

function detectSeverity(message = "") {
  const msg = String(message).toLowerCase();

  const highRisk = [
    "otp", "bank", "account", "upi", "credit",
    "debit", "pin", "password", "click", "link",
    "free", "money", "win", "prize", "verify",
    "urgent", "bonus", "transfer", "kill", "threat"
  ];

  const mediumRisk = [
    "download", "internal", "company",
    "restricted", "private", "policy",
    "file", "document", "share"
  ];

  if (highRisk.some(w => msg.includes(w))) return "HIGH";
  if (mediumRisk.some(w => msg.includes(w))) return "MEDIUM";
  return "LOW";
}

/* ================================================= */
/* ================= SEND WARNING ================= */
/* ================================================= */
/*
POST /api/admin/warn-user
Body: { userId, message }
*/
router.post("/warn-user", async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ message: "Missing userId or message" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    /* ===== UPDATE USER PROFILE ===== */
    user.warnings = (user.warnings || 0) + 1;
    user.lastWarning = message;
    user.riskScore = (user.riskScore || 0) + 25;
    user.riskLevel = "HIGH";

    await user.save();

    /* ===== LOG ADMIN ACTION ===== */
    const activity = await Activity.create({
      userId: user._id.toString(),
      userName: user.username || "User",
      email: user.email || "unknown@email.com",
      role: "admin",
      message: `⚠ ADMIN WARNING: ${message}`,
      severity: "HIGH",
      risk: "HIGH",
      createdAt: new Date()
    });

    res.json({
      success: true,
      message: "Warning sent successfully",
      user: {
        id: user._id,
        warnings: user.warnings,
        lastWarning: user.lastWarning,
        riskLevel: user.riskLevel,
        blocked: user.blocked
      },
      activity
    });
  } catch (err) {
    console.error("WARN ERROR:", err);
    res.status(500).json({ message: "Failed to send warning" });
  }
});

/* ================================================= */
/* ================= BLOCK USER =================== */
/* ================================================= */
/*
POST /api/admin/lock-user
Body: { userId }
*/
router.post("/lock-user", async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.blocked) {
      return res.json({ success: true, message: "User already blocked" });
    }

    user.blocked = true;
    user.riskLevel = "HIGH";
    await user.save();

    await Activity.create({
      userId: user._id.toString(),
      userName: user.username || "User",
      email: user.email || "unknown@email.com",
      role: "admin",
      message: "🚫 USER BLOCKED BY ADMIN",
      severity: "HIGH",
      risk: "HIGH",
      createdAt: new Date()
    });

    res.json({
      success: true,
      message: "User blocked",
      user: {
        id: user._id,
        blocked: true,
        riskLevel: user.riskLevel
      }
    });
  } catch (err) {
    console.error("BLOCK ERROR:", err);
    res.status(500).json({ message: "Failed to block user" });
  }
});

/* ================================================= */
/* ================= UNBLOCK USER ================= */
/* ================================================= */
/*
POST /api/admin/unlock-user
Body: { userId }
*/
router.post("/unlock-user", async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.blocked) {
      return res.json({ success: true, message: "User already unblocked" });
    }

    user.blocked = false;
    user.riskLevel = user.warnings > 0 ? "MEDIUM" : "LOW";
    await user.save();

    await Activity.create({
      userId: user._id.toString(),
      userName: user.username || "User",
      email: user.email || "unknown@email.com",
      role: "admin",
      message: "✅ USER UNBLOCKED BY ADMIN",
      severity: "LOW",
      risk: "LOW",
      createdAt: new Date()
    });

    res.json({
      success: true,
      message: "User unblocked",
      user: {
        id: user._id,
        blocked: false,
        riskLevel: user.riskLevel
      }
    });
  } catch (err) {
    console.error("UNBLOCK ERROR:", err);
    res.status(500).json({ message: "Failed to unblock user" });
  }
});

/* ================================================= */
/* ================= LIST USERS =================== */
/* ================================================= */
/*
GET /api/admin/users
*/
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select(
      "username email role warnings lastWarning riskLevel blocked"
    );
    res.json(users);
  } catch (err) {
    console.error("USERS ERROR:", err);
    res.status(500).json({ message: "Failed to load users" });
  }
});

/* ================================================= */
/* ============== EXPLAIN USER RISK =============== */
/* ================================================= */
/*
GET /api/admin/explain/:userId
*/
router.get("/explain/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const records = await Activity.find({ userId }).sort({
      createdAt: -1
    });

    if (!records.length) {
      return res.json({
        userId,
        userName: "Unknown",
        email: "Unknown",
        lastSeen: new Date(),
        overallRisk: "LOW",
        summary: "No activity found for this user.",
        signals: [],
        timeline: []
      });
    }

    let high = 0, medium = 0, low = 0;
    const keywordMap = {};

    const keywords = [
      "otp", "click", "link", "bank",
      "win", "prize", "download",
      "money", "free", "verify",
      "kill", "threat"
    ];

    records.forEach(r => {
      const risk = detectSeverity(r.message || "");

      if (risk === "HIGH") high++;
      else if (risk === "MEDIUM") medium++;
      else low++;

      const msg = (r.message || "").toLowerCase();
      keywords.forEach(k => {
        if (msg.includes(k)) {
          keywordMap[k] = (keywordMap[k] || 0) + 1;
        }
      });
    });

    let overallRisk = "LOW";
    if (high > 0) overallRisk = "HIGH";
    else if (medium > 1) overallRisk = "MEDIUM";

    const signals = Object.entries(keywordMap).map(
      ([term, count]) => ({ term, count })
    );

    const timeline = records
      .slice(0, 20)
      .reverse()
      .map(r => ({
        risk: r.risk || detectSeverity(r.message || ""),
        time: r.createdAt,
        message: r.message
      }));

    const summary = `This user has sent ${
      records.length
    } messages. Detected ${high} high-risk and ${medium} medium-risk events. Keywords: ${
      signals.map(s => s.term).join(", ") || "none"
    }`;

    res.json({
      userId,
      userName: records[0].userName || "Unknown",
      email: records[0].email || "Unknown",
      lastSeen: records[0].createdAt,
      overallRisk,
      summary,
      signals,
      timeline
    });
  } catch (err) {
    console.error("EXPLAIN ERROR:", err);
    res.status(500).json({ message: "Explain failed" });
  }
});

/* ================================================= */
/* ================= ADMIN AUDIT ================== */
/* ================================================= */
/*
GET /api/admin/audit
*/
router.get("/audit", async (req, res) => {
  try {
    const logs = await Activity.find({
      role: "admin"
    }).sort({ createdAt: -1 });

    res.json(logs);
  } catch (err) {
    console.error("AUDIT ERROR:", err);
    res.status(500).json({ message: "Failed to load audit logs" });
  }
});

/* ================================================= */
/* ============ FRAUD QUEUE (P2P + LEGACY) ========= */
/* ================================================= */

router.get("/fraud-queue", async (req, res) => {
  try {
    const p2p = await Message.find({
      severity: { $in: ["MEDIUM", "HIGH"] }
    })
      .sort({ createdAt: -1 })
      .limit(250)
      .populate("fromUserId", "username name blocked riskLevel")
      .populate("toUserId", "username name blocked riskLevel")
      .lean();

    const legacy = await Activity.find({
      severity: { $in: ["MEDIUM", "HIGH"] },
      role: { $ne: "admin" }
    })
      .sort({ createdAt: -1 })
      .limit(250)
      .lean();

    const items = [
      ...p2p.map((m) => ({
        kind: "p2p",
        _id: m._id,
        from: m.fromUserId,
        to: m.toUserId,
        message: m.body,
        severity: m.severity,
        createdAt: m.createdAt
      })),
      ...legacy.map((a) => ({
        kind: "legacy",
        _id: a._id,
        from: { _id: a.userId, username: a.userName, name: a.userName },
        to: null,
        message: a.message,
        severity: a.severity,
        createdAt: a.createdAt,
        userId: a.userId
      }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ items });
  } catch (err) {
    console.error("FRAUD QUEUE:", err);
    res.status(500).json({ message: "Failed to load fraud queue" });
  }
});

router.get("/notifications", async (req, res) => {
  try {
    const list = await AdminNotification.find()
      .sort({ createdAt: -1 })
      .limit(150)
      .lean();
    res.json(list);
  } catch (err) {
    console.error("NOTIFICATIONS:", err);
    res.status(500).json({ message: "Failed to load notifications" });
  }
});

router.get("/notifications/unread-count", async (req, res) => {
  try {
    const count = await AdminNotification.countDocuments({ read: false });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ count: 0 });
  }
});

router.post("/notifications/read-all", async (req, res) => {
  try {
    await AdminNotification.updateMany({}, { read: true });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to update" });
  }
});

router.post("/notifications/:id/read", async (req, res) => {
  try {
    await AdminNotification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to update" });
  }
});

router.delete("/p2p-message/:id", async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
