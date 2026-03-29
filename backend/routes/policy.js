const router = require("express").Router();
const Policy = require("../models/Policy");

router.post("/add", async (req, res) => {
  await Policy.create(req.body);
  res.json({ message: "Policy added" });
});

router.get("/all", async (req, res) => {
  res.json(await Policy.find());
});

module.exports = router;
