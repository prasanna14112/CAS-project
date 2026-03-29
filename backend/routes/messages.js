const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Message = require("../models/Message");
const User = require("../models/User");
const Contact = require("../models/Contact");
const AdminNotification = require("../models/AdminNotification");
const { detectSeverity, isFraudSeverity } = require("../utils/fraudDetection");

router.use(auth);

router.post("/", async (req, res) => {
  try {
    const { toUserId, body: text } = req.body;
    if (!toUserId || !text || !String(text).trim()) {
      return res.status(400).json({ message: "toUserId and body are required" });
    }

    const fromId = req.user.id;
    const sender = await User.findById(fromId);
    if (!sender) return res.status(404).json({ message: "User not found" });
    if (sender.blocked) {
      return res.status(403).json({ message: "Your account is blocked. You cannot send messages." });
    }

    const hasContact = await Contact.findOne({
      ownerId: new mongoose.Types.ObjectId(fromId),
      contactUserId: new mongoose.Types.ObjectId(toUserId)
    });
    if (!hasContact) {
      return res.status(403).json({
        message: "Add this person to your contacts before messaging."
      });
    }

    const severity = detectSeverity(text);
    const msg = await Message.create({
      fromUserId: new mongoose.Types.ObjectId(fromId),
      toUserId: new mongoose.Types.ObjectId(toUserId),
      body: String(text).trim(),
      severity
    });

    if (isFraudSeverity(severity)) {
      await AdminNotification.create({
        sourceType: "p2p",
        refId: msg._id,
        fromUserId: sender._id,
        toUserId: new mongoose.Types.ObjectId(toUserId),
        preview: String(text).trim().slice(0, 240),
        severity
      });

      const bump = severity === "HIGH" ? 22 : 12;
      sender.riskScore = Math.min(100, (sender.riskScore || 0) + bump);
      if (severity === "HIGH") sender.riskLevel = "HIGH";
      else if (sender.riskLevel === "LOW") sender.riskLevel = "MEDIUM";
      await sender.save();
    }

    res.json({
      success: true,
      message: msg,
      severity,
      fraudFlagged: isFraudSeverity(severity)
    });
  } catch (err) {
    console.error("P2P MESSAGE:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/thread/:otherUserId", async (req, res) => {
  try {
    const me = req.user.id;
    const otherId = req.params.otherUserId;
    const other = await User.findById(otherId);
    if (!other) return res.status(404).json({ message: "User not found" });

    const rows = await Message.find({
      $or: [
        { fromUserId: me, toUserId: otherId },
        { fromUserId: otherId, toUserId: me }
      ]
    })
      .sort({ createdAt: 1 })
      .lean();

    const filtered = rows.filter((m) => {
      const fromMe = m.fromUserId.toString() === me.toString();
      if (fromMe) return true;
      const fraud = isFraudSeverity(m.severity);
      if (fraud && other.blocked) return false;
      return true;
    });

    res.json(filtered);
  } catch (err) {
    console.error("THREAD:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
