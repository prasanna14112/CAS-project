// import { useEffect, useState } from "react";
// import api from "../../api";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer
// } from "recharts";

// export default function MyRisk() {
//   const [trend, setTrend] = useState([]);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     try {
//       const res = await api.get(`/activity/risk-trend/${userId}`);
//       setTrend(res.data || []);
//     } catch {
//       alert("Failed to load risk trend");
//     }
//   };

//   return (
//     <div>
//       <h2 className="page-title">📊 My Risk Trend</h2>

//       {/* ================= SUMMARY ================= */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//           gap: 16,
//           marginBottom: 20
//         }}
//       >
//         <Stat label="Days Tracked" value={trend.length} />
//         <Stat
//           label="Total High Risk"
//           value={sum(trend, "HIGH")}
//           color="#dc2626"
//         />
//         <Stat
//           label="Total Medium Risk"
//           value={sum(trend, "MEDIUM")}
//           color="#f59e0b"
//         />
//         <Stat
//           label="Total Low Risk"
//           value={sum(trend, "LOW")}
//           color="#16a34a"
//         />
//       </div>

//       {/* ================= CHART ================= */}
//       <div className="card">
//         <div className="section-title">📈 Risk Trend Over Time</div>

//         {trend.length === 0 ? (
//           <p style={{ textAlign: "center", color: "#6b7280" }}>
//             No risk data yet
//           </p>
//         ) : (
//           <ResponsiveContainer width="100%" height={320}>
//             <LineChart data={trend}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />

//               <Line
//                 type="monotone"
//                 dataKey="HIGH"
//                 stroke="#dc2626"
//                 strokeWidth={3}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="MEDIUM"
//                 stroke="#f59e0b"
//                 strokeWidth={3}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="LOW"
//                 stroke="#16a34a"
//                 strokeWidth={3}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ================= UI ================= */

// function Stat({ label, value, color = "#2563eb" }) {
//   return (
//     <div
//       className="card"
//       style={{
//         borderTop: `4px solid ${color}`,
//         textAlign: "center"
//       }}
//     >
//       <div
//         style={{
//           fontSize: 24,
//           fontWeight: 700,
//           color
//         }}
//       >
//         {value}
//       </div>
//       <div style={{ fontSize: 13, color: "#6b7280" }}>
//         {label}
//       </div>
//     </div>
//   );
// }

// function sum(data, key) {
//   return data.reduce((acc, d) => acc + (d[key] || 0), 0);
// }

import { useEffect, useMemo, useState } from "react";
import api from "../../api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function MyRisk() {
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) load();
  }, [userId]);

  const load = async () => {
    try {
      const res = await api.get(`/activity/risk-trend/${userId}`);

      // Ensure sorted & formatted
      const data = (res.data || [])
        .map((d) => ({
          ...d,
          dateLabel: formatDate(d.date)
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setTrend(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load risk trend");
    } finally {
      setLoading(false);
    }
  };

  /* ================= STATS ================= */

  const stats = useMemo(() => {
    return {
      days: trend.length,
      high: sum(trend, "HIGH"),
      medium: sum(trend, "MEDIUM"),
      low: sum(trend, "LOW")
    };
  }, [trend]);

  /* ================= UI ================= */

  return (
    <div>
      <h2 className="page-title">📊 My Risk Trend</h2>

      {/* ================= SUMMARY ================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 20
        }}
      >
        <Stat label="Days Tracked" value={stats.days} color="#2563eb" />
        <Stat label="Total High Risk" value={stats.high} color="#dc2626" />
        <Stat label="Total Medium Risk" value={stats.medium} color="#f59e0b" />
        <Stat label="Total Low Risk" value={stats.low} color="#16a34a" />
      </div>

      {/* ================= CHART ================= */}
      <div className="card">
        <div className="section-title">📈 Risk Trend Over Time</div>

        {loading && (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            Loading risk data...
          </p>
        )}

        {!loading && trend.length === 0 && (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No risk data yet
          </p>
        )}

        {!loading && trend.length > 0 && (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="dateLabel"
                tick={{ fontSize: 12 }}
              />

              <YAxis
                allowDecimals={false}
                label={{
                  value: "Risk Count",
                  angle: -90,
                  position: "insideLeft"
                }}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="HIGH"
                name="High Risk"
                stroke="#dc2626"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

              <Line
                type="monotone"
                dataKey="MEDIUM"
                name="Medium Risk"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

              <Line
                type="monotone"
                dataKey="LOW"
                name="Low Risk"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function Stat({ label, value, color }) {
  return (
    <div
      className="card"
      style={{
        borderTop: `4px solid ${color}`,
        textAlign: "center"
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

function sum(data, key) {
  return data.reduce((acc, d) => acc + (d[key] || 0), 0);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short"
  });
}
