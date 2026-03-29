const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Contact = require("../models/Contact");
const User = require("../models/User");

router.use(auth);

router.get("/", async (req, res) => {
  try {
    const ownerId = req.user.id;
    const list = await Contact.find({ ownerId }).populate(
      "contactUserId",
      "username name blocked riskLevel"
    );
    res.json(list);
  } catch (err) {
    console.error("CONTACTS LIST:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const raw = (req.body.contactEmail || req.body.email || "").trim().toLowerCase();
    if (!raw) {
      return res.status(400).json({ message: "contactEmail is required" });
    }

    const ownerId = req.user.id;
    const other = await User.findOne({ username: raw });
    if (!other) {
      return res.status(404).json({ message: "No account with that email" });
    }
    if (other._id.toString() === ownerId) {
      return res.status(400).json({ message: "You cannot add yourself" });
    }
    if (other.role === "admin") {
      return res.status(400).json({ message: "Cannot add admin as a contact" });
    }

    try {
      await Contact.create({
        ownerId: new mongoose.Types.ObjectId(ownerId),
        contactUserId: other._id
      });
    } catch (e) {
      if (e.code === 11000) {
        return res.status(400).json({ message: "Already in your contact list" });
      }
      throw e;
    }

    res.json({
      message: "Contact added",
      contact: {
        id: other._id,
        username: other.username,
        name: other.name || other.username
      }
    });
  } catch (err) {
    console.error("CONTACT ADD:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:contactUserId", async (req, res) => {
  try {
    await Contact.deleteOne({
      ownerId: req.user.id,
      contactUserId: req.params.contactUserId
    });
    res.json({ message: "Contact removed" });
  } catch (err) {
    console.error("CONTACT DELETE:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
