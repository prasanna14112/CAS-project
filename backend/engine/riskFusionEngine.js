function fuseRisk(intentScore, anomalyScore, policyScore) {
  const finalScore =
    0.4 * intentScore +
    0.3 * anomalyScore +
    0.3 * policyScore;

  let level = "LOW";
  if (finalScore > 60) level = "HIGH";
  else if (finalScore > 30) level = "MEDIUM";

  return {
    finalScore: Math.round(finalScore),
    riskLevel: level
  };
}

module.exports = { fuseRisk };
