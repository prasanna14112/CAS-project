/*import { useEffect, useState } from "react";
import api from "../../api";
import { exportToCSV } from "../../utils/exportCSV";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/admin/alerts");
    setAlerts(res.data);
  };

  const createCase = async (alertId) => {
    await api.post("/admin/create-case", { alertId });
    alert("Case created!");
  };
return (
  <div>
    <h2 className="page-title">Explainable Alerts</h2>
    <button
  className="btn"
  style={{ marginBottom: 14 }}
  onClick={() => exportToCSV(alerts, "alerts.csv")}
>
  ⬇ Export CSV
</button>

    {alerts.map(a => (
      <div key={a._id} className="card">
        <div className="section-title">⚠ Alert</div>

        <p><b>User:</b> {a.userId}</p>
        <p><b>Risk:</b> <span className="badge yellow">{a.riskLevel}</span></p>
        <p>{a.message}</p>

        <ul>
          {a.reasons.map((r,i)=><li key={i}>✅ {r}</li>)}
        </ul>

        <button className="btn" onClick={()=>createCase(a._id)}>
          Create Case
        </button>
      </div>
    ))}
  </div>
);

}
*/
import { useEffect, useState } from "react";
import api from "../../api";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await api.get("/activity/admin/all");
      const risky = res.data.filter(
        a => a.severity === "HIGH" || a.severity === "MEDIUM"
      );
      setAlerts(risky);
    } catch {
      alert("Failed to load alerts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="page-title">🚨 Security Alerts</h2>

      <div className="card">
        {loading && <p>Loading alerts...</p>}

        {!loading && alerts.length === 0 && (
          <p style={{ color: "#64748b" }}>No active alerts</p>
        )}

        {!loading && alerts.map(a => (
          <div
            key={a._id}
            className="card"
            style={{ borderLeft: "5px solid #dc2626" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <b>{a.userName || "Unknown User"}</b>
                <p style={{ marginTop: 6 }}>{a.message}</p>

                <div style={{ fontSize: 13, marginTop: 8 }}>
                  Severity: <b>{a.severity}</b> | Risk: <b>{a.riskLevel}</b>
                </div>
              </div>

              <div style={{ fontSize: 12, color: "#64748b" }}>
                {new Date(a.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
