/**
 * Keyword-based fraud / policy risk scoring (demo-grade).
 * LOW = treated as non-fraud for admin visibility rules.
 */

function detectSeverity(message = "") {
  const msg = String(message).toLowerCase();

  const highRisk = [
    "otp",
    "one time password",
    "bank",
    "account",
    "upi",
    "credit card",
    "debit card",
    "pin",
    "password",
    "click",
    "free money",
    "win",
    "prize",
    "gift",
    "confidential",
    "money",
    "transfer",
    "leak",
    "verify",
    "claim",
    "winner",
    "urgent",
    "bonus",
    "kill",
    "threat"
  ];

  const mediumRisk = [
    "internal",
    "company",
    "restricted",
    "download",
    "private",
    "policy",
    "file",
    "document"
  ];

  for (const word of highRisk) {
    if (msg.includes(word)) return "HIGH";
  }
  for (const word of mediumRisk) {
    if (msg.includes(word)) return "MEDIUM";
  }
  return "LOW";
}

function isFraudSeverity(severity) {
  return severity === "HIGH" || severity === "MEDIUM";
}

module.exports = { detectSeverity, isFraudSeverity };
