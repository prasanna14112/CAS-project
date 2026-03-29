function computeAnomalyScore(activities) {
  if (activities.length < 5) return 0;

  const now = Date.now();
  const lastHour = activities.filter(a => now - new Date(a.timestamp).getTime() < 3600000);

  let score = 0;

  // Burst detection
  if (lastHour.length > 10) score += 40;

  // Too many restricted in short time
  const restrictedBurst = lastHour.filter(a => a.isRestricted).length;
  if (restrictedBurst > 5) score += 40;

  // Sudden spike
  if (activities.length > 50) score += 20;

  return Math.min(score, 100);
}

module.exports = { computeAnomalyScore };
