// import { useEffect, useState } from "react";
// import api from "../../api";

// export default function MyActivity() {
//   const [warning, setWarning] = useState(null);
//   const [logs, setLogs] = useState([]);

//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     loadWarning();
//     loadLogs();
//   }, []);

//   /* ================= LOAD WARNING ================= */
//   const loadWarning = async () => {
//     try {
//       const res = await api.get(`/activity/warnings/${userId}`);
//       setWarning(res.data);
//     } catch {
//       console.log("No warnings");
//     }
//   };

//   /* ================= LOAD ACTIVITY LOGS ================= */
//   const loadLogs = async () => {
//     try {
//       const res = await api.get(`/activity/messages`);
//       const myLogs = (res.data || []).filter(
//         (a) => a.userId === userId
//       );
//       setLogs(myLogs);
//     } catch {
//       console.log("Failed to load logs");
//     }
//   };

//   return (
//     <div>
//       <h1 className="page-title">My Activity</h1>

//       {/* ================= ADMIN WARNING ================= */}
//       {warning && warning.warnings > 0 && (
//         <div className="card" style={{ border: "1px solid #dc2626" }}>
//           <div
//             className="section-title"
//             style={{ color: "#dc2626" }}
//           >
//             ⚠ Admin Warning
//           </div>

//           <p>
//             <b>Risk Level:</b>{" "}
//             <span className="badge red">
//               {warning.riskLevel}
//             </span>
//           </p>

//           <p>
//             <b>Message:</b> {warning.lastWarning}
//           </p>

//           <p style={{ color: "#b91c1c" }}>
//             This is a final notice. Continued violations may
//             result in account suspension.
//           </p>
//         </div>
//       )}

//       {/* ================= MESSAGE HISTORY ================= */}
//       <div className="card">
//         <div className="section-title">📜 Message History</div>

//         {logs.length === 0 && (
//           <p style={{ color: "#6b7280" }}>
//             No activity yet
//           </p>
//         )}

//         {logs.map((l) => (
//           <div
//             key={l._id}
//             style={{
//               padding: 10,
//               borderBottom: "1px solid #e5e7eb"
//             }}
//           >
//             <p style={{ marginBottom: 6 }}>
//               <b>Message:</b> {l.message}
//             </p>

//             <p style={{ fontSize: 12 }}>
//               <b>Severity:</b>{" "}
//               <span
//                 className={`badge ${
//                   l.severity === "HIGH"
//                     ? "red"
//                     : l.severity === "MEDIUM"
//                     ? "yellow"
//                     : "green"
//                 }`}
//               >
//                 {l.severity}
//               </span>

//               {"  |  "}
//               <b>Risk:</b>{" "}
//               <span
//                 className={`badge ${
//                   l.riskLevel === "HIGH"
//                     ? "red"
//                     : l.riskLevel === "MEDIUM"
//                     ? "yellow"
//                     : "green"
//                 }`}
//               >
//                 {l.riskLevel}
//               </span>

//               {"  |  "}
//               <b>Time:</b>{" "}
//               {l.createdAt
//                 ? new Date(l.createdAt).toLocaleString()
//                 : "—"}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api from "../../api";

export default function MyActivity() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [expanded, setExpanded] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    load();
  }, []);

  /* ================= LOAD USER ACTIVITY ================= */
  const load = async () => {
    try {
      const res = await api.get(`/activity/user/${userId}`);
      setLogs(res.data || []);
    } catch {
      alert("Failed to load activity");
    }
  };

  /* ================= STATS ================= */
  const total = logs.length;
  const high = logs.filter(l => l.severity === "HIGH").length;
  const medium = logs.filter(l => l.severity === "MEDIUM").length;
  const low = logs.filter(l => l.severity === "LOW").length;

  /* ================= FILTER ================= */
  const filtered = logs.filter(l => {
    const text = (l.message || "").toLowerCase();
    const matchText = text.includes(search.toLowerCase());
    const matchSeverity = filter === "ALL" || l.severity === filter;
    return matchText && matchSeverity;
  });

  /* ================= PIN ADMIN WARNING ================= */
  const adminWarning = logs.find(l =>
    l.message?.toLowerCase().startsWith("⚠ admin warning")
  );

  return (
    <div>
      <h2 className="page-title">📋 My Activity</h2>

      {/* ================= SUMMARY ================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
          marginBottom: 20
        }}
      >
        <StatCard label="Total" value={total} color="#2563eb" />
        <StatCard label="High Risk" value={high} color="#dc2626" />
        <StatCard label="Medium Risk" value={medium} color="#f59e0b" />
        <StatCard label="Low Risk" value={low} color="#16a34a" />
      </div>

      {/* ================= ADMIN WARNING ================= */}
      {adminWarning && (
        <div
          className="card"
          style={{
            border: "2px solid #dc2626",
            background: "#fef2f2"
          }}
        >
          <div style={{ color: "#b91c1c", fontWeight: 700 }}>
            ⚠ Admin Warning
          </div>

          <p style={{ marginTop: 8 }}>
            <b>Message:</b>{" "}
            {adminWarning.message.replace("⚠ ADMIN WARNING:", "")}
          </p>

          <p style={{ marginTop: 6, fontSize: 13, color: "#7f1d1d" }}>
            This is a final notice. Continued violations may result in
            account suspension or permanent ban.
          </p>

          <p style={{ fontSize: 12, color: "#6b7280" }}>
            {new Date(adminWarning.createdAt).toLocaleString()}
          </p>
        </div>
      )}

      {/* ================= CONTROLS ================= */}
      <div
        className="card"
        style={{ display: "flex", gap: 12, alignItems: "center" }}
      >
        <input
          className="input"
          style={{ flex: 1 }}
          placeholder="Search messages..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="input"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="ALL">All Severity</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      {/* ================= ACTIVITY TIMELINE ================= */}
      <div className="card">
        <div className="section-title">🕒 Activity Timeline</div>

        {filtered.map((log, i) => (
          <div
            key={log._id}
            style={{
              borderBottom:
                i === filtered.length - 1
                  ? "none"
                  : "1px solid #e5e7eb",
              padding: "14px 0"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <span
                  className={`badge ${badge(log.severity)}`}
                  style={{ marginRight: 8 }}
                >
                  {log.severity}
                </span>

                <span
                  className={`badge ${badge(log.risk || log.riskLevel)}`}
                >
                  {log.risk || log.riskLevel || "—"}
                </span>
              </div>

              <span style={{ fontSize: 12, color: "#6b7280" }}>
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </div>

            <div
              style={{
                marginTop: 8,
                cursor: "pointer",
                fontWeight: 500
              }}
              onClick={() =>
                setExpanded(expanded === log._id ? null : log._id)
              }
            >
              {expanded === log._id
                ? log.message
                : truncate(log.message, 90)}
            </div>

            {expanded === log._id && (
              <div
                style={{
                  marginTop: 6,
                  fontSize: 13,
                  color: "#6b7280"
                }}
              >
                Click to collapse
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No activity found
          </p>
        )}
      </div>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function StatCard({ label, value, color }) {
  return (
    <div
      className="card"
      style={{
        textAlign: "center",
        borderTop: `4px solid ${color}`
      }}
    >
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 13, color: "#6b7280" }}>
        {label}
      </div>
    </div>
  );
}

function badge(level) {
  if (level === "HIGH") return "red";
  if (level === "MEDIUM") return "yellow";
  return "green";
}

function truncate(text = "", len = 80) {
  if (text.length <= len) return text;
  return text.slice(0, len) + "...";
}
