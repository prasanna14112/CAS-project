/*const express = require("express");
const cors = require("cors");
require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/activity", require("./routes/activity"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/policy", require("./routes/policy"));
// app.use("/activity", require("./routes/activity"));
// app.use("/admin", require("./routes/admin"));


app.listen(5000, () => console.log("Backend running on port 5000"));
*/
require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || true,
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "cas-backend" });
});

function safeUse(path, routeFile) {
  const r = require(routeFile);
  console.log(path, "TYPE:", typeof r);
  app.use(path, r);
}

safeUse("/api/auth", "./routes/auth");
safeUse("/api/activity", "./routes/activity");
safeUse("/api/contacts", "./routes/contacts");
safeUse("/api/messages", "./routes/messages");
safeUse("/api/admin", "./routes/admin");
safeUse("/api/policy", "./routes/policy");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
