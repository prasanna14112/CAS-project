const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

module.exports = function (req, res, next) {
  const raw = req.headers["authorization"] || req.headers["Authorization"];
  if (!raw) return res.status(401).json({ message: "No token" });

  const token = raw.startsWith("Bearer ") ? raw.slice(7) : raw;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
