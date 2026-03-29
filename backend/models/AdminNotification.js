const mongoose = require("mongoose");

const adminNotificationSchema = new mongoose.Schema(
  {
    sourceType: {
      type: String,
      enum: ["p2p", "legacy_activity"],
      required: true
    },
    refId: { type: mongoose.Schema.Types.ObjectId, required: true },
    fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    toUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    preview: { type: String, default: "" },
    severity: {
      type: String,
      enum: ["MEDIUM", "HIGH"],
      required: true
    },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

adminNotificationSchema.index({ read: 1, createdAt: -1 });

module.exports = mongoose.model("AdminNotification", adminNotificationSchema);
