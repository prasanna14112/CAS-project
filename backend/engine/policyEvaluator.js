const Policy = require("../models/Policy");

async function evaluatePolicies(action, recentActivities) {
  const policies = await Policy.find();
  let policyScore = 0;
  let reasons = [];

  for (let p of policies) {
    if (p.action === action) {
      const count = recentActivities.filter(a => a.action === action).length;
      if (count > p.maxAllowed) {
        policyScore += p.riskWeight;
        reasons.push(`Policy violated: ${p.action} exceeded ${p.maxAllowed}`);
      }
    }
  }

  return { policyScore, reasons };
}

module.exports = { evaluatePolicies };
