// // // // // /*const router = require("express").Router();
// // // // // const Activity = require("../models/Activity");
// // // // // const User = require("../models/User");
// // // // // const Alert = require("../models/Alert");

// // // // // // New advanced engines
// // // // // const { computeIntentScore } = require("../engine/intentEngine");
// // // // // const { computeAnomalyScore } = require("../engine/anomalyEngine");
// // // // // const { evaluatePolicies } = require("../engine/policyEvaluator");
// // // // // const { fuseRisk } = require("../engine/riskFusionEngine");

// // // // // // LOG ACTIVITY (ADVANCED)
// // // // // router.post("/log", async (req, res) => {
// // // // //   try {
// // // // //     const { userId, action, isRestricted } = req.body;

// // // // //     // Save activity
// // // // //     await Activity.create({ userId, action, isRestricted });

// // // // //     const user = await User.findById(userId);

// // // // //     // Fetch recent activities
// // // // //     const activities = await Activity.find({ userId })
// // // // //       .sort({ timestamp: -1 })
// // // // //       .limit(50);

// // // // //     // 1️⃣ Compute Intent Score
// // // // //     const intentScore = computeIntentScore(activities, user);

// // // // //     // 2️⃣ Compute Anomaly Score
// // // // //     const anomalyScore = computeAnomalyScore(activities);

// // // // //     // 3️⃣ Evaluate Policies
// // // // //     const { policyScore, reasons: policyReasons } =
// // // // //       await evaluatePolicies(action, activities);

// // // // //     // 4️⃣ Fuse Risk
// // // // //     const { finalScore, riskLevel } =
// // // // //       fuseRisk(intentScore, anomalyScore, policyScore);

// // // // //     // Update user
// // // // //     user.riskScore = finalScore;
// // // // //     user.riskLevel = riskLevel;

// // // // //     if (user.riskLevel === "HIGH") {
// // // // //   user.blocked = true;
// // // // //   reasons.push("Too many violations");

// // // // //   const Case = require("../models/Case");
// // // // //   const existing = await Case.findOne({ userId: user._id, status: "OPEN" });

// // // // //   if (!existing) {
// // // // //     await Case.create({
// // // // //       userId: user._id,
// // // // //       alertId: null,
// // // // //       status: "OPEN",
// // // // //       remarks: "Auto-created due to high risk"
// // // // //     });
// // // // //   }
// // // // // }


// // // // //     await user.save();

// // // // //     // Build alert reasons
// // // // //     let reasons = [];

// // // // //     if (isRestricted) reasons.push("Restricted resource access");
// // // // //     if (intentScore > 60) reasons.push("High malicious intent score");
// // // // //     if (anomalyScore > 60) reasons.push("Abnormal behavior pattern detected");
// // // // //     reasons.push(...policyReasons);

// // // // //     // Create alert if risky
// // // // //     if (riskLevel !== "LOW") {
// // // // //       await Alert.create({
// // // // //         userId,
// // // // //         message: "Risky activity detected",
// // // // //         riskLevel,
// // // // //         reasons
// // // // //       });
// // // // //     }

// // // // //     res.json({
// // // // //       message: "Logged",
// // // // //       risk: {
// // // // //         intentScore,
// // // // //         anomalyScore,
// // // // //         policyScore,
// // // // //         finalScore,
// // // // //         riskLevel
// // // // //       },
// // // // //       user
// // // // //     });
// // // // //   } catch (err) {
// // // // //     console.error("ACTIVITY LOG ERROR:", err);
// // // // //     res.status(500).json({ message: "Server error" });
// // // // //   }
// // // // // });

// // // // // // HISTORY
// // // // // router.get("/history/:userId", async (req, res) => {
// // // // //   const logs = await Activity.find({ userId: req.params.userId })
// // // // //     .sort({ timestamp: -1 });
// // // // //   res.json(logs);
// // // // // });

// // // // // module.exports = router;
// // // // // */

// // // // // // const router = require("express").Router();
// // // // // // const Activity = require("../models/Activity");
// // // // // // const Alert = require("../models/Alert");
// // // // // // const User = require("../models/User");



// // // // // // const { computeIntentScore } = require("../engine/intentEngine");
// // // // // // const { computeAnomalyScore } = require("../engine/anomalyEngine");
// // // // // // const { evaluatePolicies } = require("../engine/policyEvaluator");
// // // // // // const { fuseRisk } = require("../engine/riskFusionEngine");

// // // // // /*
// // // // // router.post("/send-message", async (req, res) => {
// // // // //   const { userId, message, severity } = req.body;

// // // // //   // 1️⃣ Save activity
// // // // //   const activity = await Activity.create({
// // // // //     userId,
// // // // //     action: "User Message",
// // // // //     message,
// // // // //     severity,
// // // // //     isRestricted: severity !== "LOW"
// // // // //   });

// // // // //   // 2️⃣ Fetch recent activities
// // // // //   const activities = await Activity.find({ userId })
// // // // //     .sort({ timestamp: -1 });

// // // // //   const user = await User.findById(userId);

// // // // //   // 3️⃣ Risk engine
// // // // //   const intentScore = computeIntentScore(activities, user);
// // // // //   const anomalyScore = computeAnomalyScore(activities);
// // // // //   const { policyScore, reasons } =
// // // // //     await evaluatePolicies("User Message", activities);

// // // // //   const { finalScore, riskLevel } =
// // // // //     fuseRisk(intentScore, anomalyScore, policyScore);

// // // // //   // 4️⃣ Update user risk
// // // // //   user.riskScore = finalScore;
// // // // //   user.riskLevel = riskLevel;
// // // // //   await user.save();

// // // // //   // 5️⃣ Create alert for admin
// // // // //   await Alert.create({
// // // // //     userId,
// // // // //     message,
// // // // //     riskLevel,
// // // // //     reasons: [
// // // // //       `Severity: ${severity}`,
// // // // //       `Intent score: ${intentScore}`,
// // // // //       `Anomaly score: ${anomalyScore}`,
// // // // //       ...reasons
// // // // //     ]
// // // // //   });

// // // // //   res.send({ success: true });
// // // // // });

// // // // // module.exports = router;
// // // // // */

// // // // // /*
// // // // // const express = require("express");
// // // // // const router = express.Router();
// // // // // const Activity = require("../models/Activity");

// // // // // // auto severity logic
// // // // // function detectSeverity(message) {
// // // // //   const msg = message.toLowerCase();

// // // // //   // HIGH RISK – Fraud / Financial / Credential theft
// // // // //   const highRiskKeywords = [
// // // // //     "otp",
// // // // //     "one time password",
// // // // //     "send otp",
// // // // //     "bank",
// // // // //     "account",
// // // // //     "upi",
// // // // //     "money",
// // // // //     "transfer",
// // // // //     "credit card",
// // // // //     "debit card",
// // // // //     "pin",
// // // // //     "password",
// // // // //     "confidential",
// // // // //     "leak"
// // // // //   ];

// // // // //   // MEDIUM RISK – Internal / Policy violations
// // // // //   const mediumRiskKeywords = [
// // // // //     "restricted",
// // // // //     "internal",
// // // // //     "company data",
// // // // //     "policy",
// // // // //     "private"
// // // // //   ];

// // // // //   for (let word of highRiskKeywords) {
// // // // //     if (msg.includes(word)) return "HIGH";
// // // // //   }

// // // // //   for (let word of mediumRiskKeywords) {
// // // // //     if (msg.includes(word)) return "MEDIUM";
// // // // //   }

// // // // //   return "LOW";
// // // // // }


// // // // // router.post("/log", async (req, res) => {
// // // // //   const { userId, message } = req.body;

// // // // //   const severity = detectSeverity(message);

// // // // //   let riskLevel = "LOW";
// // // // //   if (severity === "HIGH") riskLevel = "HIGH";
// // // // //   else if (severity === "MEDIUM") riskLevel = "MEDIUM";

// // // // //   const activity = await Activity.create({
// // // // //     userId,
// // // // //     userName,
// // // // //     message,
// // // // //     severity,
// // // // //     riskLevel
// // // // //   });

// // // // //   res.json({ success: true });
// // // // // });

// // // // // module.exports = router;

// // // // // */

// // // // // /*
// // // // // const express = require("express");
// // // // // const router = express.Router();
// // // // // const Activity = require("../models/Activity");

// // // // // /* ================= AUTO SEVERITY ENGINE ================= */
// // // // // // function detectSeverity(message) {
// // // // // //   const msg = message.toLowerCase();

// // // // // //   const highRiskKeywords = [
// // // // // //     "otp", "one time password", "bank", "account",
// // // // // //     "upi", "money", "transfer", "credit card",
// // // // // //     "debit card", "pin", "password", "confidential", "leak"
// // // // // //   ];

// // // // // //   const mediumRiskKeywords = [
// // // // // //     "restricted", "internal", "company data", "policy", "private"
// // // // // //   ];

// // // // // //   for (let word of highRiskKeywords) {
// // // // // //     if (msg.includes(word)) return "HIGH";
// // // // // //   }

// // // // // //   for (let word of mediumRiskKeywords) {
// // // // // //     if (msg.includes(word)) return "MEDIUM";
// // // // // //   }

// // // // // //   return "LOW";
// // // // // // }

// // // // // // /* ================= USER SEND MESSAGE ================= */
// // // // // // router.post("/message", async (req, res) => {
// // // // // //   try {
// // // // // //     const { userId, userName, message } = req.body;

// // // // // //     if (!userId || !message) {
// // // // // //       return res.status(400).json({ message: "Missing fields" });
// // // // // //     }

// // // // // //     const severity = detectSeverity(message);

// // // // // //     let riskLevel = "LOW";
// // // // // //     if (severity === "HIGH") riskLevel = "HIGH";
// // // // // //     else if (severity === "MEDIUM") riskLevel = "MEDIUM";

// // // // // //     const activity = await Activity.create({
// // // // // //       userId,
// // // // // //       userName,
// // // // // //       message,
// // // // // //       severity,
// // // // // //       riskLevel,
// // // // // //       createdAt: new Date()
// // // // // //     });

// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       activity
// // // // // //     });
// // // // // //   } catch (err) {
// // // // // //     console.error("MESSAGE ERROR:", err);
// // // // // //     res.status(500).json({ message: "Server error" });
// // // // // //   }
// // // // // // });

// // // // // // /* ================= ADMIN GET MESSAGES ================= */
// // // // // // router.get("/messages", async (req, res) => {
// // // // // //   try {
// // // // // //     const data = await Activity.find().sort({ createdAt: -1 });
// // // // // //     res.json(data);
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ message: "Failed to fetch messages" });
// // // // // //   }
// // // // // // });

// // // // // // module.exports = router;
// // // // // // */



// // // // // // const express = require("express");
// // // // // // const router = express.Router();
// // // // // // const Activity = require("../models/Activity");

// // // // // // /* =====================================================
// // // // // //    🔍 AUTO SEVERITY DETECTION ENGINE
// // // // // // ===================================================== */
// // // // // // function detectSeverity(message) {
// // // // // //   const msg = message.toLowerCase();

// // // // // //   // HIGH RISK — Fraud / Financial / Credential theft
// // // // // //   const highRiskKeywords = [
// // // // // //     "otp",
// // // // // //     "one time password",
// // // // // //     "bank",
// // // // // //     "account",
// // // // // //     "upi",
// // // // // //     "money",
// // // // // //     "transfer",
// // // // // //     "credit card",
// // // // // //     "debit card",
// // // // // //     "pin",
// // // // // //     "password",
// // // // // //     "confidential",
// // // // // //     "leak",
// // // // // //     "verify account",
// // // // // //     "security code"
// // // // // //   ];

// // // // // //   // MEDIUM RISK — Internal / Policy violations
// // // // // //   const mediumRiskKeywords = [
// // // // // //     "restricted",
// // // // // //     "internal",
// // // // // //     "company data",
// // // // // //     "policy",
// // // // // //     "private",
// // // // // //     "internal use"
// // // // // //   ];

// // // // // //   for (let word of highRiskKeywords) {
// // // // // //     if (msg.includes(word)) return "HIGH";
// // // // // //   }

// // // // // //   for (let word of mediumRiskKeywords) {
// // // // // //     if (msg.includes(word)) return "MEDIUM";
// // // // // //   }

// // // // // //   return "LOW";
// // // // // // }

// // // // // // /* =====================================================
// // // // // //    📩 USER SEND MESSAGE
// // // // // //    POST /api/activity/message
// // // // // // ===================================================== */
// // // // // // router.post("/message", async (req, res) => {
// // // // // //   try {
// // // // // //     const { userId, userName, message } = req.body;

// // // // // //     if (!userId || !message) {
// // // // // //       return res.status(400).json({
// // // // // //         success: false,
// // // // // //         message: "userId and message are required"
// // // // // //       });
// // // // // //     }

// // // // // //     const severity = detectSeverity(message);

// // // // // //     let riskLevel = "LOW";
// // // // // //     if (severity === "HIGH") riskLevel = "HIGH";
// // // // // //     else if (severity === "MEDIUM") riskLevel = "MEDIUM";

// // // // // //     const activity = await Activity.create({
// // // // // //       userId,
// // // // // //       userName: userName || "Unknown User",
// // // // // //       message,
// // // // // //       severity,
// // // // // //       riskLevel,
// // // // // //       createdAt: new Date()
// // // // // //     });

// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       activity
// // // // // //     });
// // // // // //   } catch (err) {
// // // // // //     console.error("SEND MESSAGE ERROR:", err);
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: "Server error"
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // /* =====================================================
// // // // // //    📥 ADMIN GET ALL MESSAGES
// // // // // //    GET /api/activity/messages
// // // // // // ===================================================== */
// // // // // // router.get("/messages", async (req, res) => {
// // // // // //   try {
// // // // // //     const data = await Activity.find().sort({ createdAt: -1 });
// // // // // //     res.json(data);
// // // // // //   } catch (err) {
// // // // // //     console.error("FETCH MESSAGES ERROR:", err);
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: "Failed to fetch messages"
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // /* =====================================================
// // // // // //    🗑 ADMIN DELETE MESSAGE
// // // // // //    DELETE /api/activity/:id
// // // // // // ===================================================== */
// // // // // // router.delete("/:id", async (req, res) => {
// // // // // //   try {
// // // // // //     const { id } = req.params;

// // // // // //     const deleted = await Activity.findByIdAndDelete(id);

// // // // // //     if (!deleted) {
// // // // // //       return res.status(404).json({
// // // // // //         success: false,
// // // // // //         message: "Message not found"
// // // // // //       });
// // // // // //     }

// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       message: "Message deleted"
// // // // // //     });
// // // // // //   } catch (err) {
// // // // // //     console.error("DELETE MESSAGE ERROR:", err);
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: "Delete failed"
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // module.exports = router;



// // // // // // const express = require("express");
// // // // // // const router = express.Router();
// // // // // // const Activity = require("../models/Activity");
// // // // // // const User = require("../models/User");

// // // // // // /* =====================================================
// // // // // //    🔍 AUTO SEVERITY DETECTION ENGINE
// // // // // // ===================================================== */
// // // // // // function detectSeverity(message) {
// // // // // //   const msg = message.toLowerCase();

// // // // // //   // HIGH RISK — Fraud / Financial / Credential theft
// // // // // //   const highRiskKeywords = [
// // // // // //     "otp",
// // // // // //     "one time password",
// // // // // //     "bank",
// // // // // //     "account",
// // // // // //     "upi",
// // // // // //     "money",
// // // // // //     "transfer",
// // // // // //     "credit card",
// // // // // //     "debit card",
// // // // // //     "pin",
// // // // // //     "password",
// // // // // //     "confidential",
// // // // // //     "leak",
// // // // // //     "verify account",
// // // // // //     "security code",
// // // // // //      "click here",
// // // // // //     "click this link",
// // // // // //     "open this link",
// // // // // //     "verify now",
// // // // // //     "claim now",
// // // // // //     "free gift",
// // // // // //     "win prize",
// // // // // //     "winner",
// // // // // //     "congratulations",
// // // // // //     "limited time",
// // // // // //     "urgent action",
// // // // // //     "act now",
// // // // // //     "reward",
// // // // // //     "bonus"
// // // // // //   ];

// // // // // //   // MEDIUM RISK — Internal / Policy violations
// // // // // //   const mediumRiskKeywords = [
// // // // // //    "restricted",
// // // // // //     "internal",
// // // // // //     "company data",
// // // // // //     "policy",
// // // // // //     "private",
// // // // // //     "confidential info",
// // // // // //     "not for sharing",
// // // // // //     "screenshot",
// // // // // //     "download file"
// // // // // //   ];

// // // // // //   for (let word of highRiskKeywords) {
// // // // // //     if (msg.includes(word)) return "HIGH";
// // // // // //   }

// // // // // //   for (let word of mediumRiskKeywords) {
// // // // // //     if (msg.includes(word)) return "MEDIUM";
// // // // // //   }

// // // // // //   return "LOW";
// // // // // // }

// // // // // // /* =====================================================
// // // // // //    📩 USER SEND MESSAGE
// // // // // //    POST /api/activity/message
// // // // // // ===================================================== */
// // // // // // router.post("/message", async (req, res) => {
// // // // // //   try {
// // // // // //     const { userId, userName, message } = req.body;

// // // // // //     if (!userId || !message) {
// // // // // //       return res.status(400).json({
// // // // // //         success: false,
// // // // // //         message: "userId and message are required"
// // // // // //       });
// // // // // //     }

// // // // // //     // 🔒 CHECK IF USER IS BLOCKED
// // // // // //     const user = await User.findById(userId);
// // // // // //     if (!user) {
// // // // // //       return res.status(404).json({
// // // // // //         success: false,
// // // // // //         message: "User not found"
// // // // // //       });
// // // // // //     }

// // // // // //     if (user.blocked) {
// // // // // //       return res.status(403).json({
// // // // // //         success: false,
// // // // // //         message: "You are blocked by admin"
// // // // // //       });
// // // // // //     }

// // // // // //     const severity = detectSeverity(message);

// // // // // //     let riskLevel = "LOW";
// // // // // //     if (severity === "HIGH") riskLevel = "HIGH";
// // // // // //     else if (severity === "MEDIUM") riskLevel = "MEDIUM";

// // // // // //     const activity = await Activity.create({
// // // // // //       userId,
// // // // // //       userName: userName || user.username,
// // // // // //       message,
// // // // // //       severity,
// // // // // //       riskLevel,
// // // // // //       createdAt: new Date()
// // // // // //     });

// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       activity
// // // // // //     });
// // // // // //   } catch (err) {
// // // // // //     console.error("SEND MESSAGE ERROR:", err);
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: "Server error"
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // /* =====================================================
// // // // // //    📥 ADMIN GET ALL MESSAGES
// // // // // //    GET /api/activity/messages
// // // // // // ===================================================== */
// // // // // // // router.get("/messages", async (req, res) => {
// // // // // // //   try {
// // // // // // //     const data = await Activity.find().sort({ createdAt: -1 });
// // // // // // //     res.json(data);
// // // // // // //   } catch (err) {
// // // // // // //     console.error("FETCH MESSAGES ERROR:", err);
// // // // // // //     res.status(500).json({
// // // // // // //       success: false,
// // // // // // //       message: "Failed to fetch messages"
// // // // // // //     });
// // // // // // //   }
// // // // // // // });
// // // // // // router.get("/messages", async (req, res) => {
// // // // // //   try {
// // // // // //     const data = await Activity.find().sort({ createdAt: -1 });

// // // // // //     const enriched = await Promise.all(
// // // // // //       data.map(async (a) => {
// // // // // //         const user = await User.findById(a.userId).select("blocked");
// // // // // //         return {
// // // // // //           ...a.toObject(),
// // // // // //           blocked: user ? user.blocked : false
// // // // // //         };
// // // // // //       })
// // // // // //     );

// // // // // //     res.json(enriched);
// // // // // //   } catch (err) {
// // // // // //     console.error("FETCH MESSAGES ERROR:", err);
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: "Failed to fetch messages"
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // /* =====================================================
// // // // // //    🗑 ADMIN DELETE MESSAGE
// // // // // //    DELETE /api/activity/:id
// // // // // // ===================================================== */
// // // // // // router.delete("/:id", async (req, res) => {
// // // // // //   try {
// // // // // //     const { id } = req.params;

// // // // // //     const deleted = await Activity.findByIdAndDelete(id);

// // // // // //     if (!deleted) {
// // // // // //       return res.status(404).json({
// // // // // //         success: false,
// // // // // //         message: "Message not found"
// // // // // //       });
// // // // // //     }

// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       message: "Message deleted"
// // // // // //     });
// // // // // //   } catch (err) {
// // // // // //     console.error("DELETE MESSAGE ERROR:", err);
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: "Delete failed"
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // module.exports = router;



// // // // // const express = require("express");
// // // // // const router = express.Router();
// // // // // const Activity = require("../models/Activity");
// // // // // const User = require("../models/User"); // ✅ THIS WAS MISSING

// // // // // /* =====================================================
// // // // //    🔍 AUTO SEVERITY DETECTION
// // // // // ===================================================== */
// // // // // function detectSeverity(message) {
// // // // //   const msg = message.toLowerCase();

// // // // //   const highRiskKeywords = [
// // // // //     "otp",
// // // // //     "bank",
// // // // //     "account",
// // // // //     "upi",
// // // // //     "money",
// // // // //     "transfer",
// // // // //     "credit card",
// // // // //     "debit card",
// // // // //     "pin",
// // // // //     "password",
// // // // //     "confidential",
// // // // //     "leak",
// // // // //     "click here",
// // // // //     "click this link",
// // // // //     "verify now",
// // // // //     "claim now",
// // // // //     "free gift",
// // // // //     "win prize",
// // // // //     "winner",
// // // // //     "congratulations",
// // // // //     "urgent",
// // // // //     "bonus"
// // // // //   ];

// // // // //   const mediumRiskKeywords = [
// // // // //     "restricted",
// // // // //     "internal",
// // // // //     "company data",
// // // // //     "policy",
// // // // //     "private",
// // // // //     "download",
// // // // //     "attachment"
// // // // //   ];

// // // // //   for (let word of highRiskKeywords) {
// // // // //     if (msg.includes(word)) return "HIGH";
// // // // //   }

// // // // //   for (let word of mediumRiskKeywords) {
// // // // //     if (msg.includes(word)) return "MEDIUM";
// // // // //   }

// // // // //   return "LOW";
// // // // // }

// // // // // /* =====================================================
// // // // //    📩 USER SEND MESSAGE
// // // // //    POST /api/activity/message
// // // // // ===================================================== */
// // // // // router.post("/message", async (req, res) => {
// // // // //   try {
// // // // //     const { userId, userName, message } = req.body;

// // // // //     if (!userId || !message) {
// // // // //       return res.status(400).json({
// // // // //         success: false,
// // // // //         message: "userId and message required"
// // // // //       });
// // // // //     }

// // // // //     const user = await User.findById(userId);

// // // // //     if (!user) {
// // // // //       return res.status(404).json({
// // // // //         success: false,
// // // // //         message: "User not found"
// // // // //       });
// // // // //     }

// // // // //     // 🚫 Blocked users cannot send messages
// // // // //     if (user.blocked) {
// // // // //       return res.status(403).json({
// // // // //         success: false,
// // // // //         message: "Your account is blocked. You cannot send messages."
// // // // //       });
// // // // //     }

// // // // //     const severity = detectSeverity(message);
// // // // //     const riskLevel = severity === "HIGH"
// // // // //       ? "HIGH"
// // // // //       : severity === "MEDIUM"
// // // // //       ? "MEDIUM"
// // // // //       : "LOW";

// // // // //     const activity = await Activity.create({
// // // // //       userId,
// // // // //       userName: user.username,
// // // // //       message,
// // // // //       severity,
// // // // //       riskLevel,
// // // // //       createdAt: new Date()
// // // // //     });

// // // // //     res.json({
// // // // //       success: true,
// // // // //       activity
// // // // //     });
// // // // //   } catch (err) {
// // // // //     console.error("SEND MESSAGE ERROR:", err);
// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: "Server error"
// // // // //     });
// // // // //   }
// // // // // });

// // // // // /* =====================================================
// // // // //    📥 ADMIN GET ALL MESSAGES
// // // // //    GET /api/activity/messages
// // // // // ===================================================== */
// // // // // router.get("/messages", async (req, res) => {
// // // // //   try {
// // // // //     const data = await Activity.find().sort({ createdAt: -1 });
// // // // //     res.json(data);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: "Failed to fetch messages"
// // // // //     });
// // // // //   }
// // // // // });

// // // // // /* =====================================================
// // // // //    🗑 ADMIN DELETE MESSAGE
// // // // //    DELETE /api/activity/:id
// // // // // ===================================================== */
// // // // // router.delete("/:id", async (req, res) => {
// // // // //   try {
// // // // //     const deleted = await Activity.findByIdAndDelete(req.params.id);

// // // // //     if (!deleted) {
// // // // //       return res.status(404).json({
// // // // //         success: false,
// // // // //         message: "Message not found"
// // // // //       });
// // // // //     }

// // // // //     res.json({
// // // // //       success: true,
// // // // //       message: "Message deleted"
// // // // //     });
// // // // //   } catch {
// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: "Delete failed"
// // // // //     });
// // // // //   }
// // // // // });

// // // // // /* =====================================================
// // // // //    👤 USER GET MY WARNINGS
// // // // //    GET /api/activity/warnings/:userId
// // // // // ===================================================== */
// // // // // router.get("/warnings/:userId", async (req, res) => {
// // // // //   try {
// // // // //     const user = await User.findById(req.params.userId).select(
// // // // //       "warnings lastWarning riskLevel"
// // // // //     );

// // // // //     if (!user) {
// // // // //       return res.status(404).json({
// // // // //         success: false,
// // // // //         message: "User not found"
// // // // //       });
// // // // //     }

// // // // //     res.json(user);
// // // // //   } catch (err) {
// // // // //     console.error("FETCH WARNING ERROR:", err);
// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: "Failed to fetch warnings"
// // // // //     });
// // // // //   }
// // // // // });

// // // // // module.exports = router;



// // // // const express = require("express");
// // // // const router = express.Router();
// // // // const Activity = require("../models/Activity");
// // // // const User = require("../models/User");

// // // // /* ================= SEVERITY ENGINE ================= */

// // // // function detectSeverity(message = "") {
// // // //   const msg = message.toLowerCase();

// // // //   const highRisk = [
// // // //     "otp",
// // // //     "one time password",
// // // //     "bank",
// // // //     "account",
// // // //     "upi",
// // // //     "credit card",
// // // //     "debit card",
// // // //     "pin",
// // // //     "password",
// // // //     "click this link",
// // // //     "free money",
// // // //     "win",
// // // //     "prize",
// // // //     "gift",
// // // //     "confidential",
// // // //     "otp",
// // // //     "bank",
// // // //     "account",
// // // //     "upi",
// // // //     "money",
// // // //     "transfer",
// // // //     "credit card",
// // // //     "debit card",
// // // //     "pin",
// // // //     "password",
// // // //     "confidential",
// // // //     "leak",
// // // //     "click here",
// // // //     "click this link",
// // // //     "verify now",
// // // //     "claim now",
// // // //     "free gift",
// // // //     "win prize",
// // // //     "winner",
// // // //     "congratulations",
// // // //     "urgent",
// // // //     "bonus"
// // // //   ];

// // // //   const mediumRisk = [
// // // //     "internal",
// // // //     "company",
// // // //     "restricted",
// // // //     "download",
// // // //     "private",
// // // //     "policy"
// // // //   ];

// // // //   for (let word of highRisk) {
// // // //     if (msg.includes(word)) return "HIGH";
// // // //   }

// // // //   for (let word of mediumRisk) {
// // // //     if (msg.includes(word)) return "MEDIUM";
// // // //   }

// // // //   return "LOW";
// // // // }

// // // // /* ================= USER SEND MESSAGE ================= */

// // // // router.post("/message", async (req, res) => {
// // // //   try {
// // // //     const { userId, userName, message } = req.body;

// // // //     const user = await User.findById(userId);
// // // //     if (!user) return res.status(404).json({ message: "User not found" });

// // // //     // 🚫 Blocked users cannot send messages
// // // //     if (user.blocked) {
// // // //       return res.status(403).json({
// // // //         message: "Your account is blocked. You cannot send messages."
// // // //       });
// // // //     }

// // // //     const severity = detectSeverity(message);
// // // //     const riskLevel = severity;

// // // //     const activity = await Activity.create({
// // // //       userId,
// // // //       userName,
// // // //       message,
// // // //       severity,
// // // //       riskLevel,
// // // //       createdAt: new Date()
// // // //     });

// // // //     res.json({ success: true, activity });
// // // //   } catch (err) {
// // // //     console.error("MESSAGE ERROR:", err);
// // // //     res.status(500).json({ message: "Server error" });
// // // //   }
// // // // });

// // // // /* ================= USER ACTIVITY ================= */
// // // // /* Used by: /user/activity page */

// // // // router.get("/user/:userId", async (req, res) => {
// // // //   try {
// // // //     const logs = await Activity.find({
// // // //       userId: req.params.userId
// // // //     }).sort({ createdAt: -1 });

// // // //     res.json(logs);
// // // //   } catch (err) {
// // // //     console.error("ACTIVITY LOAD ERROR:", err);
// // // //     res.status(500).json({ message: "Failed to load activity" });
// // // //   }
// // // // });

// // // // /* ================= ADMIN VIEW ALL ================= */

// // // // router.get("/admin/all", async (req, res) => {
// // // //   try {
// // // //     const logs = await Activity.find().sort({ createdAt: -1 });
// // // //     res.json(logs);
// // // //   } catch (err) {
// // // //     res.status(500).json({ message: "Failed to load logs" });
// // // //   }
// // // // });

// // // // /* ================= ADMIN DELETE MESSAGE ================= */

// // // // router.delete("/:id", async (req, res) => {
// // // //   try {
// // // //     await Activity.findByIdAndDelete(req.params.id);
// // // //     res.json({ success: true });
// // // //   } catch {
// // // //     res.status(500).json({ message: "Delete failed" });
// // // //   }
// // // // });
// // // // /* ================= USER RISK TREND ================= */
// // // // /* Returns daily risk counts for chart */

// // // // router.get("/risk-trend/:userId", async (req, res) => {
// // // //   try {
// // // //     const userId = req.params.userId;

// // // //     const trend = await Activity.aggregate([
// // // //       { $match: { userId } },
// // // //       {
// // // //         $group: {
// // // //           _id: {
// // // //             day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
// // // //             severity: "$severity"
// // // //           },
// // // //           count: { $sum: 1 }
// // // //         }
// // // //       },
// // // //       { $sort: { "_id.day": 1 } }
// // // //     ]);

// // // //     // Format for frontend chart
// // // //     const map = {};

// // // //     trend.forEach(t => {
// // // //       const day = t._id.day;
// // // //       if (!map[day]) {
// // // //         map[day] = {
// // // //           date: day,
// // // //           HIGH: 0,
// // // //           MEDIUM: 0,
// // // //           LOW: 0
// // // //         };
// // // //       }
// // // //       map[day][t._id.severity] = t.count;
// // // //     });

// // // //     res.json(Object.values(map));
// // // //   } catch (err) {
// // // //     console.error("TREND ERROR:", err);
// // // //     res.status(500).json({ message: "Failed to load trend" });
// // // //   }
// // // // });


// // // // module.exports = router;
// // // const express = require("express");
// // // const router = express.Router();
// // // const Activity = require("../models/Activity");
// // // const User = require("../models/User");

// // // /* ================= RISK ENGINE ================= */

// // // function detectRisk(message = "") {
// // //   const msg = message.toLowerCase();

// // //   const highRisk = [
// // //     "otp",
// // //     "one time password",
// // //     "bank",
// // //     "account",
// // //     "upi",
// // //     "credit card",
// // //     "debit card",
// // //     "pin",
// // //     "password",
// // //     "click this link",
// // //     "click here",
// // //     "free money",
// // //     "win",
// // //     "prize",
// // //     "gift",
// // //     "confidential",
// // //     "verify now",
// // //     "claim now",
// // //     "winner",
// // //     "congratulations",
// // //     "urgent",
// // //     "bonus",
// // //     "transfer"
// // //   ];

// // //   const mediumRisk = [
// // //     "internal",
// // //     "company",
// // //     "restricted",
// // //     "download",
// // //     "private",
// // //     "policy",
// // //     "document",
// // //     "file"
// // //   ];

// // //   for (let word of highRisk) {
// // //     if (msg.includes(word)) return "HIGH";
// // //   }

// // //   for (let word of mediumRisk) {
// // //     if (msg.includes(word)) return "MEDIUM";
// // //   }

// // //   return "LOW";
// // // }

// // // /* ================= USER SEND MESSAGE ================= */

// // // router.post("/message", async (req, res) => {
// // //   try {
// // //     const { userId, userName, email, message } = req.body;

// // //     if (!userId || !message) {
// // //       return res.status(400).json({ message: "Missing userId or message" });
// // //     }

// // //     const user = await User.findById(userId);
// // //     if (!user) return res.status(404).json({ message: "User not found" });

// // //     // 🚫 Blocked users cannot send messages
// // //     if (user.blocked) {
// // //       return res.status(403).json({
// // //         message: "Your account is blocked. You cannot send messages."
// // //       });
// // //     }

// // //     const risk = detectRisk(message);

// // //     const activity = await Activity.create({
// // //       userId,
// // //       userName: userName || user.name || "Unknown",
// // //       email: email || user.email || "Unknown",
// // //       role: "user",
// // //       message,
// // //       risk,
// // //       severity: risk
// // //     });

// // //     res.json({ success: true, activity, risk });
// // //   } catch (err) {
// // //     console.error("MESSAGE ERROR:", err);
// // //     res.status(500).json({ message: "Server error" });
// // //   }
// // // });

// // // /* ================= USER ACTIVITY ================= */
// // // /* Used by: /user/activity page */

// // // router.get("/user/:userId", async (req, res) => {
// // //   try {
// // //     const logs = await Activity.find({
// // //       userId: req.params.userId,
// // //       role: "user" // ❗ Hide admin warnings from normal user message list
// // //     }).sort({ createdAt: -1 });

// // //     res.json(logs);
// // //   } catch (err) {
// // //     console.error("ACTIVITY LOAD ERROR:", err);
// // //     res.status(500).json({ message: "Failed to load activity" });
// // //   }
// // // });

// // // /* ================= ADMIN VIEW ALL ================= */

// // // router.get("/admin/all", async (req, res) => {
// // //   try {
// // //     const logs = await Activity.find().sort({ createdAt: -1 });
// // //     res.json(logs);
// // //   } catch (err) {
// // //     console.error("ADMIN LOAD ERROR:", err);
// // //     res.status(500).json({ message: "Failed to load logs" });
// // //   }
// // // });

// // // /* ================= ADMIN DELETE MESSAGE ================= */

// // // router.delete("/:id", async (req, res) => {
// // //   try {
// // //     await Activity.findByIdAndDelete(req.params.id);
// // //     res.json({ success: true });
// // //   } catch (err) {
// // //     console.error("DELETE ERROR:", err);
// // //     res.status(500).json({ message: "Delete failed" });
// // //   }
// // // });

// // // /* ================= USER RISK TREND ================= */
// // // /* Returns FULL timeline for curved graph */

// // // /* ================= USER RISK TREND ================= */
// // // /* Returns FULL timeline for curved graph */

// // // router.get("/risk-trend/:userId", async (req, res) => {
// // //   try {
// // //     const userId = req.params.userId;

// // //     const records = await Activity.find({ userId })
// // //       .sort({ createdAt: 1 });

// // //     const timeline = records.map(r => {
// // //       let risk = r.risk || r.severity;

// // //       // If missing or corrupted, recalculate
// // //       if (!risk || !["LOW", "MEDIUM", "HIGH"].includes(risk)) {
// // //         risk = detectRisk(r.message || "");
// // //       }

// // //       return {
// // //         time: r.createdAt,
// // //         level: risk,
// // //         role: r.role || "user",
// // //         message: r.message
// // //       };
// // //     });

// // //     res.json(timeline);
// // //   } catch (err) {
// // //     console.error("TREND ERROR:", err);
// // //     res.status(500).json({ message: "Failed to load trend" });
// // //   }
// // // });


// // // module.exports = router;
// // const express = require("express");
// // const router = express.Router();
// // const Activity = require("../models/Activity");
// // const User = require("../models/User");

// // /* ================= SEVERITY ENGINE ================= */

// // function detectSeverity(message = "") {
// //   const msg = message.toLowerCase();

// //   const highRisk = [
// //     "otp",
// //     "one time password",
// //     "bank",
// //     "account",
// //     "upi",
// //     "credit card",
// //     "debit card",
// //     "pin",
// //     "password",
// //     "click this link",
// //     "free money",
// //     "win",
// //     "prize",
// //     "gift",
// //     "confidential",
// //     "money",
// //     "transfer",
// //     "leak",
// //     "click here",
// //     "verify now",
// //     "claim now",
// //     "free gift",
// //     "win prize",
// //     "winner",
// //     "congratulations",
// //     "urgent",
// //     "bonus"
// //   ];

// //   const mediumRisk = [
// //     "internal",
// //     "company",
// //     "restricted",
// //     "download",
// //     "private",
// //     "policy"
// //   ];

// //   for (let word of highRisk) {
// //     if (msg.includes(word)) return "HIGH";
// //   }

// //   for (let word of mediumRisk) {
// //     if (msg.includes(word)) return "MEDIUM";
// //   }

// //   return "LOW";
// // }

// // /* ================= USER SEND MESSAGE ================= */

// // router.post("/message", async (req, res) => {
// //   try {
// //     const { userId, userName, message } = req.body;

// //     const user = await User.findById(userId);
// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     // 🚫 Blocked users cannot send messages
// //     if (user.blocked) {
// //       return res.status(403).json({
// //         message: "Your account is blocked. You cannot send messages."
// //       });
// //     }

// //     const severity = detectSeverity(message);

// //     const activity = await Activity.create({
// //       userId,
// //       userName,
// //       message,
// //       severity,
// //       risk: severity, // store consistent field
// //       role: "user",
// //       createdAt: new Date()
// //     });

// //     res.json({ success: true, activity });
// //   } catch (err) {
// //     console.error("MESSAGE ERROR:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // /* ================= ADMIN SEND WARNING ================= */

// // router.post("/admin/warn", async (req, res) => {
// //   try {
// //     const { userId, adminName, message } = req.body;

// //     const activity = await Activity.create({
// //       userId,
// //       userName: adminName || "Admin",
// //       message: `⚠ ADMIN WARNING: ${message}`,
// //       severity: "HIGH",
// //       risk: "HIGH",
// //       role: "admin",
// //       createdAt: new Date()
// //     });

// //     res.json({ success: true, activity });
// //   } catch (err) {
// //     console.error("ADMIN WARN ERROR:", err);
// //     res.status(500).json({ message: "Failed to send warning" });
// //   }
// // });

// // /* ================= USER ACTIVITY ================= */

// // router.get("/user/:userId", async (req, res) => {
// //   try {
// //     const logs = await Activity.find({
// //       userId: req.params.userId
// //     }).sort({ createdAt: -1 });

// //     res.json(logs);
// //   } catch (err) {
// //     console.error("ACTIVITY LOAD ERROR:", err);
// //     res.status(500).json({ message: "Failed to load activity" });
// //   }
// // });

// // /* ================= ADMIN VIEW ALL ================= */

// // router.get("/admin/all", async (req, res) => {
// //   try {
// //     const logs = await Activity.find().sort({ createdAt: -1 });
// //     res.json(logs);
// //   } catch (err) {
// //     res.status(500).json({ message: "Failed to load logs" });
// //   }
// // });

// // /* ================= ADMIN DELETE ================= */

// // router.delete("/:id", async (req, res) => {
// //   try {
// //     await Activity.findByIdAndDelete(req.params.id);
// //     res.json({ success: true });
// //   } catch {
// //     res.status(500).json({ message: "Delete failed" });
// //   }
// // });

// // /* ================= USER RISK TREND ================= */
// // /* Returns FULL TIMELINE for curved graph */

// // // router.get("/risk-trend/:userId", async (req, res) => {
// // //   try {
// // //     const userId = req.params.userId;

// // //     const records = await Activity.find({ userId })
// // //       .sort({ createdAt: 1 });

// // //     const timeline = records.map(r => {
// // //       let risk = r.risk || r.severity;

// // //       // If missing, recalculate
// // //       if (!risk || !["LOW", "MEDIUM", "HIGH"].includes(risk)) {
// // //         risk = detectSeverity(r.message || "");
// // //       }

// // //       return {
// // //         time: r.createdAt,
// // //         level: risk,
// // //         role: r.role || "user",
// // //         message: r.message
// // //       };
// // //     });

// // //     res.json(timeline);
// // //   } catch (err) {
// // //     console.error("TREND ERROR:", err);
// // //     res.status(500).json({ message: "Failed to load trend" });
// // //   }
// // // });

// // // module.exports = router;
// // router.get("/risk-trend/:userId", async (req, res) => {
// //   try {
// //     const userId = req.params.userId;

// //     const records = await Activity.find({ userId })
// //       .sort({ createdAt: 1 });

// //     const timeline = records.map(r => {
// //       const risk = detectSeverity(r.message || "");

// //       return {
// //         time: r.createdAt,
// //         level: risk,
// //         role: r.role || "user",
// //         message: r.message
// //       };
// //     });

// //     res.json(timeline);
// //   } catch (err) {
// //     console.error("TREND ERROR:", err);
// //     res.status(500).json({ message: "Failed to load trend" });
// //   }
// // });

// const express = require("express");
// const router = express.Router();
// const Activity = require("../models/Activity");
// const User = require("../models/User");

// /* ================= SEVERITY ENGINE ================= */

// function detectSeverity(message = "") {
//   const msg = message.toLowerCase();

//   const highRisk = [
//     "otp",
//     "one time password",
//     "bank",
//     "account",
//     "upi",
//     "credit card",
//     "debit card",
//     "pin",
//     "password",
//     "click this link",
//     "free money",
//     "win",
//     "prize",
//     "gift",
//     "confidential",
//     "money",
//     "transfer",
//     "leak",
//     "click here",
//     "verify now",
//     "claim now",
//     "free gift",
//     "win prize",
//     "winner",
//     "congratulations",
//     "urgent",
//     "bonus"
//   ];

//   const mediumRisk = [
//     "internal",
//     "company",
//     "restricted",
//     "download",
//     "private",
//     "policy"
//   ];

//   for (let word of highRisk) {
//     if (msg.includes(word)) return "HIGH";
//   }

//   for (let word of mediumRisk) {
//     if (msg.includes(word)) return "MEDIUM";
//   }

//   return "LOW";
// }

// /* ================= USER SEND MESSAGE ================= */

// router.post("/message", async (req, res) => {
//   try {
//     const { userId, userName, message } = req.body;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Blocked users cannot send messages
//     if (user.blocked) {
//       return res.status(403).json({
//         message: "Your account is blocked. You cannot send messages."
//       });
//     }

//     const severity = detectSeverity(message);

//     const activity = await Activity.create({
//       userId,
//       userName,
//       message,
//       severity,
//       riskLevel: severity,
//       createdAt: new Date()
//     });

//     res.json({ success: true, activity });
//   } catch (err) {
//     console.error("MESSAGE ERROR:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* ================= USER ACTIVITY ================= */

// router.get("/user/:userId", async (req, res) => {
//   try {
//     const logs = await Activity.find({
//       userId: req.params.userId
//     }).sort({ createdAt: -1 });

//     res.json(logs);
//   } catch (err) {
//     console.error("ACTIVITY LOAD ERROR:", err);
//     res.status(500).json({ message: "Failed to load activity" });
//   }
// });

// /* ================= ADMIN VIEW ALL ================= */

// router.get("/admin/all", async (req, res) => {
//   try {
//     const logs = await Activity.find().sort({ createdAt: -1 });
//     res.json(logs);
//   } catch (err) {
//     console.error("ADMIN LOAD ERROR:", err);
//     res.status(500).json({ message: "Failed to load logs" });
//   }
// });

// /* ================= ADMIN DELETE MESSAGE ================= */

// router.delete("/:id", async (req, res) => {
//   try {
//     await Activity.findByIdAndDelete(req.params.id);
//     res.json({ success: true });
//   } catch (err) {
//     console.error("DELETE ERROR:", err);
//     res.status(500).json({ message: "Delete failed" });
//   }
// });

// /* ================= USER RISK TREND ================= */
// /* Always recalculates risk from message text */

// router.get("/risk-trend/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const records = await Activity.find({ userId })
//       .sort({ createdAt: 1 });

//     const timeline = records.map(r => {
//       const risk = detectSeverity(r.message || "");

//       return {
//         time: r.createdAt,
//         level: risk,
//         message: r.message
//       };
//     });

//     res.json(timeline);
//   } catch (err) {
//     console.error("TREND ERROR:", err);
//     res.status(500).json({ message: "Failed to load trend" });
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
//     "one time password",
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
//     "claim",
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

// /* ================= USER SEND MESSAGE ================= */

// router.post("/message", async (req, res) => {
//   try {
//     const { userId, userName, message } = req.body;

//     if (!userId || !message) {
//       return res.status(400).json({ message: "Missing userId or message" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // 🚫 Blocked users cannot send messages
//     if (user.blocked) {
//       return res.status(403).json({
//         message: "Your account is blocked. You cannot send messages."
//       });
//     }

//     const severity = detectSeverity(message);

//     const activity = await Activity.create({
//       userId,
//       userName: userName || user.username || "Unknown",
//       email: user.username || "Unknown",
//       role: "user",
//       message,
//       severity,
//       risk: severity,
//       createdAt: new Date()
//     });

//     res.json({
//       success: true,
//       activity,
//       detectedRisk: severity
//     });
//   } catch (err) {
//     console.error("MESSAGE ERROR:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* ================= USER ACTIVITY ================= */
// /* Shows only user messages (not admin warnings) */

// router.get("/user/:userId", async (req, res) => {
//   try {
//     const logs = await Activity.find({
//       userId: req.params.userId,
//       role: "user"
//     }).sort({ createdAt: -1 });

//     res.json(logs);
//   } catch (err) {
//     console.error("ACTIVITY LOAD ERROR:", err);
//     res.status(500).json({ message: "Failed to load activity" });
//   }
// });

// /* ================= USER RISK TREND ================= */
// /* Always recalculates risk LIVE from message */

// router.get("/risk-trend/:userId", async (req, res) => {
//   try {
//     const records = await Activity.find({
//       userId: req.params.userId
//     }).sort({ createdAt: 1 });

//     const timeline = records.map((r) => {
//       const risk = detectSeverity(r.message || "");

//       return {
//         time: r.createdAt,
//         level: risk,
//         message: r.message,
//         role: r.role
//       };
//     });

//     res.json(timeline);
//   } catch (err) {
//     console.error("TREND ERROR:", err);
//     res.status(500).json({ message: "Failed to load trend" });
//   }
// });

// /* ================= ADMIN VIEW ALL MESSAGES ================= */

// router.get("/admin/all", async (req, res) => {
//   try {
//     const logs = await Activity.find().sort({ createdAt: -1 });
//     res.json(logs);
//   } catch (err) {
//     console.error("ADMIN LOAD ERROR:", err);
//     res.status(500).json({ message: "Failed to load logs" });
//   }
// });

// /* ================= ADMIN DELETE MESSAGE ================= */

// router.delete("/:id", async (req, res) => {
//   try {
//     await Activity.findByIdAndDelete(req.params.id);
//     res.json({ success: true });
//   } catch (err) {
//     console.error("DELETE ERROR:", err);
//     res.status(500).json({ message: "Delete failed" });
//   }
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const Activity = require("../models/Activity");
// const User = require("../models/User");

// /* ================= RISK DETECTION ================= */

// function detectSeverity(message = "") {
//   const msg = String(message).toLowerCase();

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

// /* ================= USER SEND MESSAGE ================= */

// router.post("/message", async (req, res) => {
//   try {
//     const { userId, userName, message } = req.body;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (user.blocked) {
//       return res.status(403).json({
//         message: "Your account is blocked. You cannot send messages."
//       });
//     }

//     const severity = detectSeverity(message);

//     const activity = await Activity.create({
//       userId,
//       userName: userName || user.username || "Unknown",
//       email: user.email || "unknown@email",
//       role: "user",
//       message,
//       severity,
//       risk: severity,
//       createdAt: new Date()
//     });

//     res.json({ success: true, activity });
//   } catch (err) {
//     console.error("MESSAGE ERROR:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* ================= USER ACTIVITY ================= */

// router.get("/user/:userId", async (req, res) => {
//   try {
//     const logs = await Activity.find({
//       userId: req.params.userId,
//       role: "user" // 🔥 Only user messages, not admin warnings
//     }).sort({ createdAt: -1 });

//     res.json(logs);
//   } catch (err) {
//     console.error("ACTIVITY LOAD ERROR:", err);
//     res.status(500).json({ message: "Failed to load activity" });
//   }
// });

// /* ================= ADMIN VIEW ALL ================= */

// router.get("/admin/all", async (req, res) => {
//   try {
//     const logs = await Activity.find().sort({ createdAt: -1 });
//     res.json(logs);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to load logs" });
//   }
// });

// /* ================= DELETE MESSAGE ================= */

// router.delete("/:id", async (req, res) => {
//   try {
//     await Activity.findByIdAndDelete(req.params.id);
//     res.json({ success: true });
//   } catch {
//     res.status(500).json({ message: "Delete failed" });
//   }
// });

// /* ================= LIVE RISK TREND ================= */
// /*
//   GET /api/activity/risk-trend/:userId
//   Returns ALL user messages with recalculated risk
// */

// router.get("/risk-trend/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const records = await Activity.find({
//       userId,
//       role: "user"
//     }).sort({ createdAt: 1 });

//     const timeline = records.map((r) => {
//       const risk = detectSeverity(r.message || "");

//       return {
//         time: r.createdAt,
//         level: risk,
//         message: r.message
//       };
//     });

//     res.json(timeline);
//   } catch (err) {
//     console.error("TREND ERROR:", err);
//     res.status(500).json({ message: "Failed to load trend" });
//   }
// });

// module.exports = router;




// const express = require("express");
// const mongoose = require("mongoose");
// const router = express.Router();
// const Activity = require("../models/Activity");
// const User = require("../models/User");

// /* ================= SEVERITY ENGINE ================= */

// function detectSeverity(message = "") {
//   const msg = message.toLowerCase();

//   const highRisk = [
//     "otp", "one time password", "bank", "account", "upi",
//     "credit card", "debit card", "pin", "password",
//     "click", "link", "free money", "win", "prize",
//     "confidential", "transfer", "verify", "urgent",
//     "bonus", "kill", "threat", "hack"
//   ];

//   const mediumRisk = [
//     "internal", "company", "restricted", "download",
//     "private", "policy", "file", "document"
//   ];

//   for (let word of highRisk) {
//     if (msg.includes(word)) return "HIGH";
//   }

//   for (let word of mediumRisk) {
//     if (msg.includes(word)) return "MEDIUM";
//   }

//   return "LOW";
// }

// /* ================= USER SEND MESSAGE ================= */

// router.post("/message", async (req, res) => {
//   try {
//     const { userId, userName, message } = req.body;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (user.blocked) {
//       return res.status(403).json({
//         message: "Your account is blocked. You cannot send messages."
//       });
//     }

//     const severity = detectSeverity(message);

//     const activity = await Activity.create({
//       userId: new mongoose.Types.ObjectId(userId),
//       userName,
//       message,
//       severity,
//       riskLevel: severity,
//       createdAt: new Date()
//     });

//     res.json({ success: true, activity });
//   } catch (err) {
//     console.error("MESSAGE ERROR:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* ================= USER ACTIVITY ================= */

// router.get("/user/:userId", async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.params.userId);

//     const logs = await Activity.find({ userId })
//       .sort({ createdAt: -1 });

//     res.json(logs);
//   } catch (err) {
//     console.error("ACTIVITY LOAD ERROR:", err);
//     res.status(500).json({ message: "Failed to load activity" });
//   }
// });

// /* ================= ADMIN VIEW ALL ================= */

// router.get("/admin/all", async (req, res) => {
//   try {
//     const logs = await Activity.find().sort({ createdAt: -1 });
//     res.json(logs);
//   } catch {
//     res.status(500).json({ message: "Failed to load logs" });
//   }
// });

// /* ================= DELETE ================= */

// router.delete("/:id", async (req, res) => {
//   try {
//     await Activity.findByIdAndDelete(req.params.id);
//     res.json({ success: true });
//   } catch {
//     res.status(500).json({ message: "Delete failed" });
//   }
// });

// /* ================= RISK TREND (FIXED) ================= */
// /* Returns ALL messages for user with real timestamps */

// // router.get("/risk-trend/:userId", async (req, res) => {
// //   try {
// //     const userId = new mongoose.Types.ObjectId(req.params.userId);

// //     const logs = await Activity.find({ userId })
// //       .sort({ createdAt: 1 });

// //     const formatted = logs.map(log => ({
// //       time: log.createdAt,
// //       riskValue:
// //         log.severity === "HIGH" ? 3 :
// //         log.severity === "MEDIUM" ? 2 : 1,
// //       riskLabel: log.severity
// //     }));

// //     // Stats
// //     const stats = {
// //       total: logs.length,
// //       high: logs.filter(l => l.severity === "HIGH").length,
// //       medium: logs.filter(l => l.severity === "MEDIUM").length,
// //       low: logs.filter(l => l.severity === "LOW").length
// //     };

// //     res.json({ stats, trend: formatted });

// //   } catch (err) {
// //     console.error("TREND ERROR:", err);
// //     res.status(500).json({ message: "Failed to load trend" });
// //   }
// // });

// // module.exports = router;
// router.get("/risk-trend/:userId", async (req, res) => {
//   try {
//     const mongoose = require("mongoose");
//     const userId = new mongoose.Types.ObjectId(req.params.userId);

//     const logs = await Activity.find({ userId }).sort({ createdAt: 1 });

//     if (!logs.length) {
//       return res.json({
//         stats: { total: 0, high: 0, medium: 0, low: 0 },
//         trend: []
//       });
//     }

//     const trend = logs.map(log => ({
//       time: log.createdAt,
//       riskValue:
//         log.severity === "HIGH" ? 3 :
//         log.severity === "MEDIUM" ? 2 : 1,
//       riskLabel: log.severity
//     }));

//     const stats = {
//       total: logs.length,
//       high: logs.filter(l => l.severity === "HIGH").length,
//       medium: logs.filter(l => l.severity === "MEDIUM").length,
//       low: logs.filter(l => l.severity === "LOW").length
//     };

//     res.json({ stats, trend });

//   } catch (err) {
//     console.error("TREND ERROR:", err);
//     res.status(500).json({ message: "Failed to load trend" });
//   }
// });



const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Activity = require("../models/Activity");
const User = require("../models/User");
const AdminNotification = require("../models/AdminNotification");
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/admin");
const { detectSeverity, isFraudSeverity } = require("../utils/fraudDetection");

router.use(auth);

// ===================== USER SEND MESSAGE (legacy: compliance / admin channel) =====================
// router.post("/message", async (req, res) => {
//   try {
//     const { userId, message } = req.body;

//     if (!userId || !message) {
//       return res.status(400).json({ message: "Missing userId or message" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.blocked) {
//       return res.status(403).json({
//         message: "Your account is blocked. You cannot send messages."
//       });
//     }

//     const severity = detectSeverity(message);

//     const activity = await Activity.create({
//       userId: user._id.toString(),
//       userName: user.email || user.name || "Unknown",
//       message,
//       severity,
//       riskLevel: severity,
//       createdAt: new Date()
//     });

//     res.json({ success: true, activity });
//   } catch (err) {
//     console.error("MESSAGE ERROR:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.post("/message", async (req, res) => {
//   try {
//     const { userId, message } = req.body;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // 🚫 Blocked users cannot send messages
//     if (user.blocked) {
//       return res.status(403).json({
//         message: "Your account is blocked. You cannot send messages."
//       });
//     }

//     const severity = detectSeverity(message);

//     const activity = await Activity.create({
//       userId,
//       userName: user.email || user.name || "Unknown", // ✅ SAVE NAME
//       message,
//       severity,
//       riskLevel: severity,
//       createdAt: new Date()
//     });

//     res.json({ success: true, activity });
//   } catch (err) {
//     console.error("MESSAGE ERROR:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });
router.post("/message", async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.blocked) {
      return res.status(403).json({
        message: "Your account is blocked. You cannot send messages."
      });
    }

    if (!message || !String(message).trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    const severity = detectSeverity(message);

    const activity = await Activity.create({
      userId,
      userName: user.name || user.username,
      message: String(message).trim(),
      severity,
      risk: severity,
      role: "user"
    });

    if (isFraudSeverity(severity)) {
      await AdminNotification.create({
        sourceType: "legacy_activity",
        refId: activity._id,
        fromUserId: new mongoose.Types.ObjectId(userId),
        preview: String(message).trim().slice(0, 240),
        severity
      });
    }

    res.json({ success: true, activity });
  } catch (err) {
    console.error("MESSAGE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const uid = req.params.userId;
    if (req.user.role !== "admin" && req.user.id !== uid) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const logs = await Activity.find({ userId: uid }).sort({ createdAt: -1 });

    res.json(logs);
  } catch (err) {
    console.error("ACTIVITY LOAD ERROR:", err);
    res.status(500).json({ message: "Failed to load activity" });
  }
});

router.get("/admin/all", adminOnly, async (req, res) => {
  try {
    const logs = await Activity.find({
      severity: { $in: ["MEDIUM", "HIGH"] }
    })
      .sort({ createdAt: -1 })
      .limit(300);
    res.json(logs);
  } catch (err) {
    console.error("ADMIN LOAD ERROR:", err);
    res.status(500).json({ message: "Failed to load logs" });
  }
});

router.delete("/:id", adminOnly, async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

router.get("/risk-trend/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    if (req.user.role !== "admin" && req.user.id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const logs = await Activity.find({ userId }).sort({ createdAt: 1 });

    const formatted = logs.map((log) => ({
      time: log.createdAt,
      riskValue:
        log.severity === "HIGH" ? 3 : log.severity === "MEDIUM" ? 2 : 1,
      riskLabel: log.severity
    }));

    res.json(formatted);
  } catch (err) {
    console.error("TREND ERROR:", err);
    res.status(500).json({ message: "Failed to load trend" });
  }
});


// ===================== CRITICAL FIX =====================
module.exports = router;
