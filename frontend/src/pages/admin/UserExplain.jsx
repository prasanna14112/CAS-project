// // // import { useState } from "react";
// // // import api from "../../api";

// // // export default function UserExplain() {
// // //   const [userId, setUserId] = useState("");
// // //   const [data, setData] = useState(null);

// // //   const load = async () => {
// // //     const res = await api.get(`/admin/explain/user/${userId}`);
// // //     setData(res.data);
// // //   };

// // //   return (
// // //     <div>
// // //       <h2 className="page-title">🧠 Explain User Risk</h2>

// // //       <div className="card">
// // //         <input
// // //           className="input"
// // //           placeholder="Enter User ID"
// // //           value={userId}
// // //           onChange={e=>setUserId(e.target.value)}
// // //         />
// // //         <button className="btn" onClick={load}>Explain</button>
// // //       </div>

// // //       {data && (
// // //         <div className="card">
// // //           <div className="section-title">Result</div>
// // //           <p><b>Risk Level:</b> {data.riskLevel}</p>

// // //           <ul>
// // //             {data.reasons.map((r,i)=><li key={i}>• {r}</li>)}
// // //           </ul>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // import { useState } from "react";
// // import api from "../../api";

// // export default function UserExplain() {
// //   const [userId, setUserId] = useState("");
// //   const [result, setResult] = useState(null);

// //   const explain = async () => {
// //     if (!userId) return alert("Enter User ID");

// //     try {
// //       const res = await api.get(`/admin/explain/${userId}`);
// //       setResult(res.data);
// //     } catch {
// //       alert("Failed to fetch risk explanation");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2 className="page-title">🧠 Explain User Risk</h2>

// //       <div className="card" style={{ display: "flex", gap: 10 }}>
// //         <input
// //           className="input"
// //           placeholder="Enter User ID"
// //           value={userId}
// //           onChange={e => setUserId(e.target.value)}
// //         />
// //         <button className="btn" onClick={explain}>
// //           Explain
// //         </button>
// //       </div>

// //       {result && (
// //         <div className="card" style={{ marginTop: 20 }}>
// //           <h3>Risk Explanation</h3>

// //           <p>
// //             <b>User:</b> {result.user}
// //           </p>
// //           <p>
// //             <b>Risk Level:</b> {result.riskLevel}
// //           </p>

// //           <h4 style={{ marginTop: 10 }}>Contributing Factors</h4>
// //           <ul>
// //             {result.reasons.map((r, i) => (
// //               <li key={i}>{r}</li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import api from "../../api";
// import { useNavigate } from "react-router-dom";

// export default function UserExplain() {
//   const [userId, setUserId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [report, setReport] = useState(null);
//   const navigate = useNavigate();

//   const explainRisk = async () => {
//     if (!userId.trim()) {
//       alert("Enter a User ID");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await api.get(`/admin/explain/${userId}`);
//       setReport(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to generate risk report");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const riskColor = (risk) => {
//     if (risk === "HIGH") return "#dc2626";
//     if (risk === "MEDIUM") return "#f59e0b";
//     return "#16a34a";
//   };

//   return (
//     <div>
//       {/* ================= HEADER ================= */}
//       <h2 className="page-title">🧠 Explain User Risk</h2>

//       {/* ================= SEARCH ================= */}
//       <div className="card" style={{ marginBottom: 20 }}>
//         <div style={{ display: "flex", gap: 12 }}>
//           <input
//             className="input"
//             placeholder="Enter User ID"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//             style={{ width: 300 }}
//           />
//           <button className="btn" onClick={explainRisk} disabled={loading}>
//             {loading ? "Analyzing..." : "Explain Risk"}
//           </button>
//         </div>
//       </div>

//       {/* ================= REPORT ================= */}
//       {report && (
//         <>
//           {/* Summary Cards */}
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//               gap: 16,
//               marginBottom: 20
//             }}
//           >
//             <InfoCard title="Overall Risk" value={report.overallRisk} />
//             <InfoCard title="Total Messages" value={report.total} />
//             <InfoCard title="High Risk" value={report.high} />
//             <InfoCard title="Medium Risk" value={report.medium} />
//             <InfoCard title="Low Risk" value={report.low} />
//           </div>

//           {/* Risk Summary */}
//           <div className="card" style={{ marginBottom: 20 }}>
//             <div className="section-title">AI Risk Summary</div>
//             <p>
//               This user currently shows an overall risk level of{" "}
//               <strong style={{ color: riskColor(report.overallRisk) }}>
//                 {report.overallRisk}
//               </strong>
//               . The system detected{" "}
//               <strong>{report.high}</strong> high-risk messages and{" "}
//               <strong>{report.medium}</strong> medium-risk messages. Continued
//               behavior may require administrative action.
//             </p>
//           </div>

//           {/* Violation Timeline */}
//           <div className="card">
//             <div className="section-title">Violation Timeline</div>

//             {report.timeline.length === 0 ? (
//               <p>No risky activity found.</p>
//             ) : (
//               report.timeline.map((item, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     borderLeft: `4px solid ${riskColor(item.risk)}`,
//                     paddingLeft: 12,
//                     marginBottom: 12
//                   }}
//                 >
//                   <div style={{ fontWeight: 600 }}>{item.message}</div>
//                   <div style={{ fontSize: 12, color: "#6b7280" }}>
//                     {item.risk} •{" "}
//                     {new Date(item.time).toLocaleString("en-IN")}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Admin Actions */}
//           <div
//             style={{
//               marginTop: 20,
//               display: "flex",
//               gap: 12,
//               justifyContent: "flex-end"
//             }}
//           >
//             <button
//               className="btn-secondary"
//               onClick={() => navigate("/admin/risk-trend")}
//             >
//               View Risk Trend
//             </button>

//             <button
//               className="btn"
//               onClick={() =>
//                 navigate(`/admin/users?highlight=${userId}`)
//               }
//             >
//               Manage User
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// /* ================= SMALL INFO CARD ================= */
// function InfoCard({ title, value }) {
//   return (
//     <div className="card" style={{ textAlign: "center" }}>
//       <div style={{ fontSize: 13, color: "#6b7280" }}>{title}</div>
//       <div style={{ fontSize: 26, fontWeight: 700 }}>{value}</div>
//     </div>
//   );
// }



import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function UserExplain() {
  const [userId, setUserId] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const explainRisk = async () => {
    if (!userId.trim()) return alert("Enter a User ID");

    try {
      setLoading(true);
      const res = await api.get(`/admin/explain/${userId}`);
      setProfile(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load user intelligence");
    } finally {
      setLoading(false);
    }
  };

  const riskColor = (risk) => {
    if (risk === "HIGH") return "#dc2626";
    if (risk === "MEDIUM") return "#f59e0b";
    return "#16a34a";
  };

  return (
    <div>
      {/* HEADER */}
      <h2 className="page-title">🧠 User Risk Intelligence</h2>

      {/* SEARCH */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 12 }}>
          <input
            className="input"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ width: 320 }}
          />
          <button className="btn" onClick={explainRisk} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze User"}
          </button>
        </div>
      </div>

      {profile && (
        <>
          {/* USER PROFILE HEADER */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>
                  👤 {profile.userName || profile.email || "Unknown User"}

                </div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>
                  ID: {profile.userId}
                </div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>
                  Last Activity:{" "}
                  {new Date(profile.lastSeen).toLocaleString("en-IN")}
                </div>
              </div>

              <div
                style={{
                  fontWeight: 700,
                  padding: "6px 14px",
                  borderRadius: 20,
                  background: riskColor(profile.overallRisk) + "20",
                  color: riskColor(profile.overallRisk)
                }}
              >
                {profile.overallRisk} RISK
              </div>
            </div>
          </div>

          {/* BEHAVIOR SUMMARY */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="section-title">🧠 Behavior Summary</div>
            <p style={{ lineHeight: 1.6 }}>{profile.summary}</p>
          </div>

          {/* VIOLATION HEAT STRIP */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="section-title">🔥 Violation Timeline</div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {profile.timeline.map((t, i) => (
                <div
                  key={i}
                  title={`${t.risk} • ${new Date(t.time).toLocaleString()}`}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    background: riskColor(t.risk),
                    opacity: 1
                    }}
                />
              ))}
            </div>

            <div
              style={{
                marginTop: 8,
                fontSize: 12,
                color: "#6b7280"
              }}
            >
              Green = Low • Orange = Medium • Red = High
            </div>
          </div>

          {/* KEY SIGNALS */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="section-title">🔍 Key Risk Signals</div>
            <ul>
              {profile.signals.map((s, i) => (
                <li key={i}>
                  <strong>{s.term}</strong> → {s.count} times
                </li>
              ))}
            </ul>
          </div>

          {/* ACTION CENTER */}
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "flex-end"
            }}
          >
            <button
              className="btn-secondary"
              onClick={() => navigate("/admin/risk-trend")}
            >
              View Risk Trend
            </button>

            <button
              className="btn-secondary"
              onClick={() => navigate(`/admin/users?highlight=${userId}`)}
            >
              Manage User
            </button>

            <button className="btn">Send Warning</button>
          </div>
        </>
      )}
    </div>
  );
}
