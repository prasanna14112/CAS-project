function computeIntentScore(activities, user) {
  let score = 0;

  const recent = activities.slice(0, 20);

  // 1. Frequency factor
  if (recent.length > 10) score += 20;

  // 2. Repetition factor
  const restrictedCount = recent.filter(a => a.isRestricted).length;
  score += restrictedCount * 5;

  // 3. Ignoring warnings
  if (user.warnings > 0) score += user.warnings * 5;

  // 4. Escalation pattern
  if (restrictedCount > 5) score += 20;

  // 5. Time anomaly (night access)
  const nightAccess = recent.some(a => {
    const h = new Date(a.timestamp).getHours();
    return h < 6 || h > 22;
  });
  if (nightAccess) score += 15;

  return Math.min(score, 100);
}

module.exports = { computeIntentScore };
