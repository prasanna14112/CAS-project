module.exports = function detectRisk(message = "") {
  const msg = message.toLowerCase();

  const highPatterns = ["otp", "bank", "password", "click link", "win", "prize"];
  const mediumPatterns = ["download", "internal file", "verify", "confirm"];

  let score = 0;

  highPatterns.forEach((p) => {
    if (msg.includes(p)) score += 2;
  });

  mediumPatterns.forEach((p) => {
    if (msg.includes(p)) score += 1;
  });

  if (score >= 3) return "HIGH";
  if (score >= 1) return "MEDIUM";
  return "LOW";
};
