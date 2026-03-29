// Load environment variables FIRST
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // ✅ FIXED (missing earlier)

// DB connection file (optional if you already connect here)
require("./config/db");

const app = express();

// CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL || true,
  credentials: true
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "cas-backend" });
});

// Safe route loader
function safeUse(path, routeFile) {
  try {
    const r = require(routeFile);
    console.log(path, "TYPE:", typeof r);
    app.use(path, r);
  } catch (err) {
    console.error(`❌ Error loading ${routeFile}:`, err.message);
  }
}

// Routes
safeUse("/api/auth", "./routes/auth");
safeUse("/api/activity", "./routes/activity");
safeUse("/api/contacts", "./routes/contacts");
safeUse("/api/messages", "./routes/messages");
safeUse("/api/admin", "./routes/admin");
safeUse("/api/policy", "./routes/policy");

// MongoDB Connection ✅
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
