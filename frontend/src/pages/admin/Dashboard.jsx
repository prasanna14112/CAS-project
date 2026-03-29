// // // /*const AdminDashboard = () => {
// // //   return (
// // //     <div>
// // //       <h2 className="page-title">📊 Admin Dashboard</h2>

// // //       {/* METRICS */}
// // //       <div className="metrics-grid">

// // //         <div className="metric-card blue">
// // //           <p>Total Users</p>
// // //           <h1>3</h1>
// // //         </div>

// // //         <div className="metric-card yellow">
// // //           <p>Total Alerts</p>
// // //           <h1>9</h1>
// // //         </div>

// // //         <div className="metric-card red">
// // //           <p>High Risk Users</p>
// // //           <h1>0</h1>
// // //         </div>

// // //         <div className="metric-card green">
// // //           <p>Total Activities</p>
// // //           <h1>27</h1>
// // //         </div>
// // //       </div>

// // //       {/* LOWER CARDS */}
// // //       <div className="dashboard-grid">

// // //         <div className="card">
// // //           <div className="section-title">Risk Distribution</div>
// // //           <p>Low: 66%</p>
// // //           <p>Medium: 33%</p>
// // //           <p>High: 0%</p>
// // //         </div>

// // //         <div className="card">
// // //           <div className="section-title">System Status</div>
// // //           <p>Database <span className="badge green">Connected</span></p>
// // //           <p>Risk Engine <span className="badge green">Running</span></p>
// // //           <p>Alert System <span className="badge green">Active</span></p>
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AdminDashboard;
// // // */

// // // import { useEffect, useState } from "react";
// // // import api from "../../api";

// // // export default function AdminDashboard() {
// // //   const [alerts, setAlerts] = useState([]);

// // //   useEffect(() => {
// // //     api.get("/admin/alerts").then(res => {
// // //       setAlerts(res.data);
// // //     });
// // //   }, []);

// // //   return (
// // //     <div>
// // //       <h1>Admin Dashboard</h1>

// // //       <h2>🚨 User Messages & Risk</h2>

// // //       <table border="1" cellPadding="8">
// // //         <thead>
// // //           <tr>
// // //             <th>User</th>
// // //             <th>Message</th>
// // //             <th>Severity</th>
// // //             <th>Risk</th>
// // //             <th>Time</th>
// // //           </tr>
// // //         </thead>

// // //         <tbody>
// // //           {alerts.map(a => (
// // //             <tr key={a._id}>
// // //               <td>{a.userId}</td>
// // //               <td>{a.message}</td>
// // //               <td>{a.severity}</td>
// // //               <td>{a.riskLevel}</td>
// // //               <td>{new Date(a.createdAt).toLocaleString()}</td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // }

// // /*
// // import { useEffect, useState } from "react";
// // import api from "../../api";

// // export default function AdminDashboard() {
// //   const [messages, setMessages] = useState([]);

// //   useEffect(() => {
// //     api.get("/activity/messages").then(res => {
// //       setMessages(res.data);
// //     });
// //   }, []);

// //   return (
// //     <div>
// //       <h1 className="page-title">🚨 User Messages & Risk</h1>

// //       {messages.length === 0 && (
// //         <p style={{ color: "#6b7280" }}>No messages yet</p>
// //       )}

// //       {messages.map((m, i) => (
// //         <div key={i} className="card">
// //           <div style={{ display: "flex", justifyContent: "space-between" }}>
// //             <div>
// //               <b>{m.userName || "Unknown User"}</b>
// //               <p style={{ marginTop: 6 }}>{m.message}</p>
// //             </div>

// //             <div style={{ textAlign: "right" }}>
// //               <span className={`badge ${badgeColor(m.severity)}`}>
// //                 {m.severity}
// //               </span>
// //               <br />
// //               <span className="badge red" style={{ marginTop: 6 }}>
// //                 Risk: {m.risk}
// //               </span>
// //             </div>
// //           </div>

// //           <p style={{ fontSize: 12, color: "#6b7280", marginTop: 10 }}>
// //             {new Date(m.time).toLocaleString()}
// //           </p>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // function badgeColor(severity) {
// //   if (severity === "HIGH") return "red";
// //   if (severity === "MEDIUM") return "yellow";
// //   return "green";
// // }
// // */



// // // import { useEffect, useState } from "react";
// // // import api from "../../api";

// // // export default function AdminDashboard() {
// // //   const [rows, setRows] = useState([]);
// // //   const [search, setSearch] = useState("");
// // //   const [severity, setSeverity] = useState("ALL");
// // //   const [page, setPage] = useState(1);

// // //   const limit = 8;

// // //   useEffect(() => {
// // //     load();
// // //   }, []);

// // //   const load = async () => {
// // //     const res = await api.get("/activity/messages");
// // //     setRows(res.data || []);
// // //   };

// // //   const remove = async (id) => {
// // //     if (!window.confirm("Delete this message permanently?")) return;
// // //     await api.delete(`/activity/${id}`);
// // //     load();
// // //   };

// // //   /* ================= FILTER ================= */
// // //   const filtered = rows.filter(r => {
// // //     const text =
// // //       (r.userName || "").toLowerCase() +
// // //       " " +
// // //       (r.message || "").toLowerCase();

// // //     const matchText = text.includes(search.toLowerCase());
// // //     const matchSeverity = severity === "ALL" || r.severity === severity;

// // //     return matchText && matchSeverity;
// // //   });

// // //   /* ================= PAGINATION ================= */
// // //   const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
// // //   const safePage = Math.min(page, totalPages);
// // //   const start = (safePage - 1) * limit;
// // //   const pageData = filtered.slice(start, start + limit);

// // //   return (
// // //     <div>
// // //       <h1 className="page-title">🛡 Compliance Monitoring Console</h1>

// // //       {/* ===== CONTROLS ===== */}
// // //       <div
// // //         className="card"
// // //         style={{ display: "flex", gap: 12, alignItems: "center" }}
// // //       >
// // //         <input
// // //           className="input"
// // //           style={{ flex: 1 }}
// // //           placeholder="Search by user or message..."
// // //           value={search}
// // //           onChange={e => {
// // //             setSearch(e.target.value);
// // //             setPage(1);
// // //           }}
// // //         />

// // //         <select
// // //           className="input"
// // //           value={severity}
// // //           onChange={e => {
// // //             setSeverity(e.target.value);
// // //             setPage(1);
// // //           }}
// // //         >
// // //           <option value="ALL">All Severity</option>
// // //           <option value="HIGH">High</option>
// // //           <option value="MEDIUM">Medium</option>
// // //           <option value="LOW">Low</option>
// // //         </select>
// // //       </div>

// // //       {/* ===== TABLE ===== */}
// // //       <div className="card">
// // //         <table className="table">
// // //           <thead>
// // //             <tr>
// // //               <th>User</th>
// // //               <th>Message</th>
// // //               <th>Severity</th>
// // //               <th>Risk</th>
// // //               <th>Time</th>
// // //               <th>Action</th>
// // //             </tr>
// // //           </thead>

// // //           <tbody>
// // //             {pageData.map(r => (
// // //               <tr key={r._id}>
// // //                 <td>
// // //                   <b>{r.userName || "Unknown"}</b>
// // //                   <br />
// // //                   <span style={{ fontSize: 11, color: "#6b7280" }}>
// // //                     {r.userId}
// // //                   </span>
// // //                 </td>

// // //                 <td style={{ maxWidth: 400 }}>
// // //                   <div
// // //                     title={r.message}
// // //                     style={{
// // //                       whiteSpace: "nowrap",
// // //                       overflow: "hidden",
// // //                       textOverflow: "ellipsis"
// // //                     }}
// // //                   >
// // //                     {r.message}
// // //                   </div>
// // //                 </td>

// // //                 <td>
// // //                   <span className={`badge ${badge(r.severity)}`}>
// // //                     {r.severity}
// // //                   </span>
// // //                 </td>

// // //                 <td>
// // //                   <span className={`badge ${badge(r.riskLevel)}`}>
// // //                     {r.riskLevel}
// // //                   </span>
// // //                 </td>

// // //                 <td style={{ fontSize: 12 }}>
// // //                   {r.createdAt
// // //                     ? new Date(r.createdAt).toLocaleString()
// // //                     : "—"}
// // //                 </td>

// // //                 <td>
// // //                   <button
// // //                     className="btn danger"
// // //                     onClick={() => remove(r._id)}
// // //                   >
// // //                     Delete
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>

// // //         {pageData.length === 0 && (
// // //           <p style={{ color: "#6b7280", textAlign: "center" }}>
// // //             No results found
// // //           </p>
// // //         )}
// // //       </div>

// // //       {/* ===== PAGINATION ===== */}
// // //       <div style={{ marginTop: 16 }}>
// // //         <button
// // //           className="btn secondary"
// // //           disabled={safePage === 1}
// // //           onClick={() => setPage(safePage - 1)}
// // //         >
// // //           Prev
// // //         </button>

// // //         <span style={{ margin: "0 12px" }}>
// // //           Page {safePage} / {totalPages}
// // //         </span>

// // //         <button
// // //           className="btn secondary"
// // //           disabled={safePage === totalPages}
// // //           onClick={() => setPage(safePage + 1)}
// // //         >
// // //           Next
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function badge(level) {
// // //   if (level === "HIGH") return "red";
// // //   if (level === "MEDIUM") return "yellow";
// // //   return "green";
// // // }



// // // import { useEffect, useState } from "react";
// // // import api from "../../api";

// // // export default function AdminDashboard() {
// // //   const [rows, setRows] = useState([]);
// // //   const [search, setSearch] = useState("");
// // //   const [severity, setSeverity] = useState("ALL");
// // //   const [page, setPage] = useState(1);

// // //   const limit = 8;

// // //   useEffect(() => {
// // //     load();
// // //   }, []);

// // //   const load = async () => {
// // //     const res = await api.get("/activity/messages");
// // //     setRows(res.data || []);
// // //   };

// // //   const remove = async (id) => {
// // //     if (!window.confirm("Delete this message permanently?")) return;
// // //     await api.delete(`/activity/${id}`);
// // //     load();
// // //   };

// // //   const blockUser = async (userId) => {
// // //     if (
// // //       !window.confirm(
// // //         "Block this user? They will not be able to login or send messages."
// // //       )
// // //     )
// // //       return;

// // //     await api.post("/admin/block-user", { userId });
// // //     alert("User blocked");
// // //   };

// // //   /* ================= FILTER ================= */
// // //   const filtered = rows.filter((r) => {
// // //     const text =
// // //       (r.userName || "").toLowerCase() +
// // //       " " +
// // //       (r.message || "").toLowerCase();

// // //     const matchText = text.includes(search.toLowerCase());
// // //     const matchSeverity = severity === "ALL" || r.severity === severity;

// // //     return matchText && matchSeverity;
// // //   });

// // //   /* ================= PAGINATION ================= */
// // //   const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
// // //   const safePage = Math.min(page, totalPages);
// // //   const start = (safePage - 1) * limit;
// // //   const pageData = filtered.slice(start, start + limit);

// // //   return (
// // //     <div>
// // //       <h1 className="page-title">🛡 Compliance Monitoring Console</h1>

// // //       {/* ===== CONTROLS ===== */}
// // //       <div
// // //         className="card"
// // //         style={{ display: "flex", gap: 12, alignItems: "center" }}
// // //       >
// // //         <input
// // //           className="input"
// // //           style={{ flex: 1 }}
// // //           placeholder="Search by user or message..."
// // //           value={search}
// // //           onChange={(e) => {
// // //             setSearch(e.target.value);
// // //             setPage(1);
// // //           }}
// // //         />

// // //         <select
// // //           className="input"
// // //           value={severity}
// // //           onChange={(e) => {
// // //             setSeverity(e.target.value);
// // //             setPage(1);
// // //           }}
// // //         >
// // //           <option value="ALL">All Severity</option>
// // //           <option value="HIGH">High</option>
// // //           <option value="MEDIUM">Medium</option>
// // //           <option value="LOW">Low</option>
// // //         </select>
// // //       </div>

// // //       {/* ===== TABLE ===== */}
// // //       <div className="card">
// // //         <table className="table">
// // //           <thead>
// // //             <tr>
// // //               <th>User</th>
// // //               <th>Message</th>
// // //               <th>Severity</th>
// // //               <th>Risk</th>
// // //               <th>Time</th>
// // //               <th>Action</th>
// // //             </tr>
// // //           </thead>

// // //           <tbody>
// // //             {pageData.map((r) => (
// // //               <tr key={r._id}>
// // //                 <td>
// // //                   <b>{r.userName || "Unknown"}</b>
// // //                   <br />
// // //                   <span style={{ fontSize: 11, color: "#6b7280" }}>
// // //                     {r.userId}
// // //                   </span>
// // //                 </td>

// // //                 <td style={{ maxWidth: 400 }}>
// // //                   <div
// // //                     title={r.message}
// // //                     style={{
// // //                       whiteSpace: "nowrap",
// // //                       overflow: "hidden",
// // //                       textOverflow: "ellipsis",
// // //                     }}
// // //                   >
// // //                     {r.message}
// // //                   </div>
// // //                 </td>

// // //                 <td>
// // //                   <span className={`badge ${badge(r.severity)}`}>
// // //                     {r.severity}
// // //                   </span>
// // //                 </td>

// // //                 <td>
// // //                   <span className={`badge ${badge(r.riskLevel)}`}>
// // //                     {r.riskLevel}
// // //                   </span>
// // //                 </td>

// // //                 <td style={{ fontSize: 12 }}>
// // //                   {r.createdAt
// // //                     ? new Date(r.createdAt).toLocaleString()
// // //                     : "—"}
// // //                 </td>

// // //                 <td>
// // //                   <button
// // //                     className="btn danger"
// // //                     onClick={() => remove(r._id)}
// // //                   >
// // //                     Delete
// // //                   </button>

// // //                   <button
// // //                     className="btn secondary"
// // //                     style={{ marginLeft: 8 }}
// // //                     onClick={() => blockUser(r.userId)}
// // //                   >
// // //                     Block User
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>

// // //         {pageData.length === 0 && (
// // //           <p style={{ color: "#6b7280", textAlign: "center" }}>
// // //             No results found
// // //           </p>
// // //         )}
// // //       </div>

// // //       {/* ===== PAGINATION ===== */}
// // //       <div style={{ marginTop: 16 }}>
// // //         <button
// // //           className="btn secondary"
// // //           disabled={safePage === 1}
// // //           onClick={() => setPage(safePage - 1)}
// // //         >
// // //           Prev
// // //         </button>

// // //         <span style={{ margin: "0 12px" }}>
// // //           Page {safePage} / {totalPages}
// // //         </span>

// // //         <button
// // //           className="btn secondary"
// // //           disabled={safePage === totalPages}
// // //           onClick={() => setPage(safePage + 1)}
// // //         >
// // //           Next
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ================= BADGE COLORS ================= */
// // // function badge(level) {
// // //   if (level === "HIGH") return "red";
// // //   if (level === "MEDIUM") return "yellow";
// // //   return "green";
// // // }



// // // import { useEffect, useState } from "react";
// // // import api from "../../api";

// // // export default function AdminDashboard() {
// // //   const [rows, setRows] = useState([]);
// // //   const [search, setSearch] = useState("");
// // //   const [severity, setSeverity] = useState("ALL");
// // //   const [page, setPage] = useState(1);

// // //   const limit = 8;

// // //   useEffect(() => {
// // //     load();
// // //   }, []);

// // //   /* ================= LOAD DATA ================= */
// // //   const load = async () => {
// // //     try {
// // //       const res = await api.get("/activity/messages");
// // //       setRows(res.data || []);
// // //     } catch (err) {
// // //       alert("Failed to load messages");
// // //     }
// // //   };

// // //   /* ================= DELETE MESSAGE ================= */
// // //   const remove = async (id) => {
// // //     if (!window.confirm("Delete this message permanently?")) return;
// // //     try {
// // //       await api.delete(`/activity/${id}`);
// // //       load();
// // //     } catch {
// // //       alert("Delete failed");
// // //     }
// // //   };

// // //   /* ================= BLOCK / UNBLOCK USER ================= */
// // //   const toggleBlockUser = async (userId, isBlocked) => {
// // //     const action = isBlocked ? "unblock-user" : "block-user";

// // //     const confirmText = isBlocked
// // //       ? "Unblock this user? They will be able to login and send messages."
// // //       : "Block this user? They will NOT be able to login or send messages.";

// // //     if (!window.confirm(confirmText)) return;

// // //     try {
// // //       await api.post(`/admin/${action}`, { userId });
// // //       alert(isBlocked ? "User unblocked" : "User blocked");
// // //       load();
// // //     } catch {
// // //       alert("Action failed");
// // //     }
// // //   };

// // //   /* ================= FILTER ================= */
// // //   const filtered = rows.filter((r) => {
// // //     const text =
// // //       (r.userName || "").toLowerCase() +
// // //       " " +
// // //       (r.message || "").toLowerCase();

// // //     const matchText = text.includes(search.toLowerCase());
// // //     const matchSeverity = severity === "ALL" || r.severity === severity;

// // //     return matchText && matchSeverity;
// // //   });

// // //   /* ================= PAGINATION ================= */
// // //   const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
// // //   const safePage = Math.min(page, totalPages);
// // //   const start = (safePage - 1) * limit;
// // //   const pageData = filtered.slice(start, start + limit);

// // //   return (
// // //     <div>
// // //       <h1 className="page-title">🛡 Compliance Monitoring Console</h1>

// // //       {/* ================= CONTROLS ================= */}
// // //       <div
// // //         className="card"
// // //         style={{ display: "flex", gap: 12, alignItems: "center" }}
// // //       >
// // //         <input
// // //           className="input"
// // //           style={{ flex: 1 }}
// // //           placeholder="Search by user or message..."
// // //           value={search}
// // //           onChange={(e) => {
// // //             setSearch(e.target.value);
// // //             setPage(1);
// // //           }}
// // //         />

// // //         <select
// // //           className="input"
// // //           value={severity}
// // //           onChange={(e) => {
// // //             setSeverity(e.target.value);
// // //             setPage(1);
// // //           }}
// // //         >
// // //           <option value="ALL">All Severity</option>
// // //           <option value="HIGH">High</option>
// // //           <option value="MEDIUM">Medium</option>
// // //           <option value="LOW">Low</option>
// // //         </select>
// // //       </div>

// // //       {/* ================= TABLE ================= */}
// // //       <div className="card">
// // //         <table className="table">
// // //           <thead>
// // //             <tr>
// // //               <th>User</th>
// // //               <th>Message</th>
// // //               <th>Severity</th>
// // //               <th>Risk</th>
// // //               <th>Time</th>
// // //               <th>Action</th>
// // //             </tr>
// // //           </thead>

// // //           <tbody>
// // //             {pageData.map((r) => (
// // //               <tr key={r._id}>
// // //                 <td>
// // //                   <b>{r.userName || "Unknown"}</b>
// // //                   <br />
// // //                   <span style={{ fontSize: 11, color: "#6b7280" }}>
// // //                     {r.userId}
// // //                   </span>
// // //                 </td>

// // //                 <td style={{ maxWidth: 400 }}>
// // //                   <div
// // //                     title={r.message}
// // //                     style={{
// // //                       whiteSpace: "nowrap",
// // //                       overflow: "hidden",
// // //                       textOverflow: "ellipsis",
// // //                     }}
// // //                   >
// // //                     {r.message}
// // //                   </div>
// // //                 </td>

// // //                 <td>
// // //                   <span className={`badge ${badge(r.severity)}`}>
// // //                     {r.severity}
// // //                   </span>
// // //                 </td>

// // //                 <td>
// // //                   <span className={`badge ${badge(r.riskLevel)}`}>
// // //                     {r.riskLevel}
// // //                   </span>
// // //                 </td>

// // //                 <td style={{ fontSize: 12 }}>
// // //                   {r.createdAt
// // //                     ? new Date(r.createdAt).toLocaleString()
// // //                     : "—"}
// // //                 </td>

// // //                 <td>
// // //                   <button
// // //                     className="btn danger"
// // //                     onClick={() => remove(r._id)}
// // //                   >
// // //                     Delete
// // //                   </button>

// // //                   <button
// // //                     className="btn secondary"
// // //                     style={{ marginLeft: 8 }}
// // //                     onClick={() =>
// // //                       toggleBlockUser(r.userId, r.blocked)
// // //                     }
// // //                   >
// // //                     {r.blocked ? "Unblock User" : "Block User"}
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>

// // //         {pageData.length === 0 && (
// // //           <p style={{ color: "#6b7280", textAlign: "center" }}>
// // //             No results found
// // //           </p>
// // //         )}
// // //       </div>

// // //       {/* ================= PAGINATION ================= */}
// // //       <div style={{ marginTop: 16 }}>
// // //         <button
// // //           className="btn secondary"
// // //           disabled={safePage === 1}
// // //           onClick={() => setPage(safePage - 1)}
// // //         >
// // //           Prev
// // //         </button>

// // //         <span style={{ margin: "0 12px" }}>
// // //           Page {safePage} / {totalPages}
// // //         </span>

// // //         <button
// // //           className="btn secondary"
// // //           disabled={safePage === totalPages}
// // //           onClick={() => setPage(safePage + 1)}
// // //         >
// // //           Next
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ================= BADGE COLORS ================= */
// // // function badge(level) {
// // //   if (level === "HIGH") return "red";
// // //   if (level === "MEDIUM") return "yellow";
// // //   return "green";
// // // }



// // // import { useEffect, useState } from "react";
// // // import api from "../../api";

// // // export default function AdminDashboard() {
// // //   const [rows, setRows] = useState([]);
// // //   const [search, setSearch] = useState("");
// // //   const [severity, setSeverity] = useState("ALL");
// // //   const [page, setPage] = useState(1);

// // //   const limit = 8;

// // //   useEffect(() => {
// // //     load();
// // //   }, []);

// // //   /* ================= LOAD DATA ================= */
// // //   const load = async () => {
// // //     try {
// // //       const res = await api.get("/activity/messages");
// // //       setRows(res.data || []);
// // //     } catch {
// // //       alert("Failed to load messages");
// // //     }
// // //   };

// // //   /* ================= DELETE MESSAGE ================= */
// // //   const remove = async (id) => {
// // //     if (!window.confirm("Delete this message permanently?")) return;
// // //     try {
// // //       await api.delete(`/activity/${id}`);
// // //       load();
// // //     } catch {
// // //       alert("Delete failed");
// // //     }
// // //   };

// // //   /* ================= BLOCK / UNBLOCK USER ================= */
// // //   const toggleBlockUser = async (userId, isBlocked) => {
// // //     const action = isBlocked ? "unblock-user" : "block-user";

// // //     const confirmText = isBlocked
// // //       ? "Unblock this user? They will be able to login and send messages."
// // //       : "Block this user? They will NOT be able to login or send messages.";

// // //     if (!window.confirm(confirmText)) return;

// // //     try {
// // //       await api.post(`/admin/${action}`, { userId });
// // //       alert(isBlocked ? "User unblocked" : "User blocked");
// // //       load();
// // //     } catch {
// // //       alert("Action failed");
// // //     }
// // //   };

// // //   /* ================= SEND WARNING ================= */
// // //   const sendWarning = async (userId) => {
// // //     const msg = window.prompt(
// // //       "Enter warning message for user:\n\nExample:\nThis is your final warning. Continued policy violations will result in account suspension."
// // //     );

// // //     if (!msg) return;

// // //     try {
// // //       await api.post("/admin/warn-user", {
// // //         userId,
// // //         message: msg
// // //       });

// // //       alert("Warning sent to user");
// // //       load();
// // //     } catch {
// // //       alert("Failed to send warning");
// // //     }
// // //   };

// // //   /* ================= FILTER ================= */
// // //   const filtered = rows.filter((r) => {
// // //     const text =
// // //       (r.userName || "").toLowerCase() +
// // //       " " +
// // //       (r.message || "").toLowerCase();

// // //     const matchText = text.includes(search.toLowerCase());
// // //     const matchSeverity = severity === "ALL" || r.severity === severity;

// // //     return matchText && matchSeverity;
// // //   });

// // //   /* ================= PAGINATION ================= */
// // //   const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
// // //   const safePage = Math.min(page, totalPages);
// // //   const start = (safePage - 1) * limit;
// // //   const pageData = filtered.slice(start, start + limit);

// // //   return (
// // //     <div>
// // //       <h1 className="page-title">🛡 Compliance Monitoring Console</h1>

// // //       {/* ================= CONTROLS ================= */}
// // //       <div
// // //         className="card"
// // //         style={{ display: "flex", gap: 12, alignItems: "center" }}
// // //       >
// // //         <input
// // //           className="input"
// // //           style={{ flex: 1 }}
// // //           placeholder="Search by user or message..."
// // //           value={search}
// // //           onChange={(e) => {
// // //             setSearch(e.target.value);
// // //             setPage(1);
// // //           }}
// // //         />

// // //         <select
// // //           className="input"
// // //           value={severity}
// // //           onChange={(e) => {
// // //             setSeverity(e.target.value);
// // //             setPage(1);
// // //           }}
// // //         >
// // //           <option value="ALL">All Severity</option>
// // //           <option value="HIGH">High</option>
// // //           <option value="MEDIUM">Medium</option>
// // //           <option value="LOW">Low</option>
// // //         </select>
// // //       </div>

// // //       {/* ================= TABLE ================= */}
// // //       <div className="card">
// // //         <table className="table">
// // //           <thead>
// // //             <tr>
// // //               <th>User</th>
// // //               <th>Message</th>
// // //               <th>Severity</th>
// // //               <th>Risk</th>
// // //               <th>Time</th>
// // //               <th>Action</th>
// // //             </tr>
// // //           </thead>

// // //           <tbody>
// // //             {pageData.map((r) => (
// // //               <tr key={r._id}>
// // //                 <td>
// // //                   <b>{r.userName || "Unknown"}</b>
// // //                   <br />
// // //                   <span style={{ fontSize: 11, color: "#6b7280" }}>
// // //                     {r.userId}
// // //                   </span>
// // //                 </td>

// // //                 <td style={{ maxWidth: 400 }}>
// // //                   <div
// // //                     title={r.message}
// // //                     style={{
// // //                       whiteSpace: "nowrap",
// // //                       overflow: "hidden",
// // //                       textOverflow: "ellipsis"
// // //                     }}
// // //                   >
// // //                     {r.message}
// // //                   </div>
// // //                 </td>

// // //                 <td>
// // //                   <span className={`badge ${badge(r.severity)}`}>
// // //                     {r.severity}
// // //                   </span>
// // //                 </td>

// // //                 <td>
// // //                   <span className={`badge ${badge(r.riskLevel)}`}>
// // //                     {r.riskLevel}
// // //                   </span>
// // //                 </td>

// // //                 <td style={{ fontSize: 12 }}>
// // //                   {r.createdAt
// // //                     ? new Date(r.createdAt).toLocaleString()
// // //                     : "—"}
// // //                 </td>

// // //                 <td>
// // //                   <button
// // //                     className="btn danger"
// // //                     onClick={() => remove(r._id)}
// // //                   >
// // //                     Delete
// // //                   </button>

// // //                   <button
// // //                     className="btn secondary"
// // //                     style={{ marginLeft: 8 }}
// // //                     onClick={() =>
// // //                       toggleBlockUser(r.userId, r.blocked)
// // //                     }
// // //                   >
// // //                     {r.blocked ? "Unblock" : "Block"}
// // //                   </button>

// // //                   <button
// // //                     className="btn success"
// // //                     style={{ marginLeft: 8 }}
// // //                     onClick={() => sendWarning(r.userId)}
// // //                   >
// // //                     Warn
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>

// // //         {pageData.length === 0 && (
// // //           <p style={{ color: "#6b7280", textAlign: "center" }}>
// // //             No results found
// // //           </p>
// // //         )}
// // //       </div>

// // //       {/* ================= PAGINATION ================= */}
// // //       <div style={{ marginTop: 16 }}>
// // //         <button
// // //           className="btn secondary"
// // //           disabled={safePage === 1}
// // //           onClick={() => setPage(safePage - 1)}
// // //         >
// // //           Prev
// // //         </button>

// // //         <span style={{ margin: "0 12px" }}>
// // //           Page {safePage} / {totalPages}
// // //         </span>

// // //         <button
// // //           className="btn secondary"
// // //           disabled={safePage === totalPages}
// // //           onClick={() => setPage(safePage + 1)}
// // //         >
// // //           Next
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ================= BADGE COLORS ================= */
// // // function badge(level) {
// // //   if (level === "HIGH") return "red";
// // //   if (level === "MEDIUM") return "yellow";
// // //   return "green";
// // // }



// // import { useEffect, useState } from "react";
// // import api from "../../api";

// // export default function AdminDashboard() {
// //   const [logs, setLogs] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [filter, setFilter] = useState("ALL");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     load();
// //   }, []);

// //   /* ================= LOAD ALL MESSAGES ================= */
// //   const load = async () => {
// //     try {
// //       const res = await api.get("/activity/admin/all");
// //       setLogs(res.data || []);
// //     } catch {
// //       alert("Failed to load messages");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   /* ================= DELETE MESSAGE ================= */
// //   const deleteMsg = async (id) => {
// //     if (!window.confirm("Delete this message?")) return;
// //     try {
// //       await api.delete(`/activity/${id}`);
// //       load();
// //     } catch {
// //       alert("Delete failed");
// //     }
// //   };

// //   /* ================= BLOCK USER ================= */
// //   const blockUser = async (userId) => {
// //     if (!window.confirm("Block this user? They will not be able to login or send messages.")) return;

// //     try {
// //       await api.post("/admin/lock-user", { userId });
// //       alert("User blocked");
// //       load();
// //     } catch {
// //       alert("Block failed");
// //     }
// //   };

// //   /* ================= WARN USER ================= */
// //   const warnUser = async (userId) => {
// //     const msg = prompt("Enter warning message for user:");
// //     if (!msg) return;

// //     try {
// //       await api.post("/admin/warn-user", {
// //         userId,
// //         message: msg
// //       });
// //       alert("Warning sent");
// //       load();
// //     } catch {
// //       alert("Warning failed");
// //     }
// //   };

// //   /* ================= FILTER ================= */
// //   const filtered = logs.filter(l => {
// //     const text = `${l.userName || ""} ${l.message || ""}`.toLowerCase();
// //     const matchText = text.includes(search.toLowerCase());
// //     const matchSeverity =
// //       filter === "ALL" || l.severity === filter;
// //     return matchText && matchSeverity;
// //   });

// //   return (
// //     <div>
// //       <h2 className="page-title">🛡 Compliance Monitoring Console</h2>

// //       {/* ================= CONTROLS ================= */}
// //       <div
// //         className="card"
// //         style={{ display: "flex", gap: 12, alignItems: "center" }}
// //       >
// //         <input
// //           className="input"
// //           style={{ flex: 1 }}
// //           placeholder="Search by user or message..."
// //           value={search}
// //           onChange={e => setSearch(e.target.value)}
// //         />

// //         <select
// //           className="input"
// //           value={filter}
// //           onChange={e => setFilter(e.target.value)}
// //         >
// //           <option value="ALL">All Severity</option>
// //           <option value="HIGH">High</option>
// //           <option value="MEDIUM">Medium</option>
// //           <option value="LOW">Low</option>
// //         </select>
// //       </div>

// //       {/* ================= TABLE ================= */}
// //       <div className="card">
// //         {loading && (
// //           <p style={{ textAlign: "center", color: "#6b7280" }}>
// //             Loading messages...
// //           </p>
// //         )}

// //         {!loading && filtered.length === 0 && (
// //           <p style={{ textAlign: "center", color: "#6b7280" }}>
// //             No user messages found
// //           </p>
// //         )}

// //         {!loading && filtered.length > 0 && (
// //           <table className="table">
// //             <thead>
// //               <tr>
// //                 <th>User</th>
// //                 <th>Message</th>
// //                 <th>Severity</th>
// //                 <th>Risk</th>
// //                 <th>Time</th>
// //                 <th>Action</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {filtered.map(log => (
// //                 <tr key={log._id}>
// //                   <td>
// //                     <b>{log.userName || "Unknown"}</b>
// //                     <div style={{ fontSize: 11, color: "#6b7280" }}>
// //                       {log.userId}
// //                     </div>
// //                   </td>

// //                   <td>{log.message}</td>

// //                   <td>
// //                     <span className={`badge ${badge(log.severity)}`}>
// //                       {log.severity}
// //                     </span>
// //                   </td>

// //                   <td>
// //                     <span className={`badge ${badge(log.riskLevel)}`}>
// //                       {log.riskLevel}
// //                     </span>
// //                   </td>

// //                   <td>
// //                     {new Date(log.createdAt).toLocaleString()}
// //                   </td>

// //                   <td>
// //                     <button
// //                       className="btn danger"
// //                       onClick={() => deleteMsg(log._id)}
// //                     >
// //                       Delete
// //                     </button>{" "}

// //                     <button
// //                       className="btn secondary"
// //                       onClick={() => blockUser(log.userId)}
// //                     >
// //                       Block
// //                     </button>{" "}

// //                     <button
// //                       className="btn success"
// //                       onClick={() => warnUser(log.userId)}
// //                     >
// //                       Warn
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // /* ================= HELPERS ================= */

// // function badge(level) {
// //   if (level === "HIGH") return "red";
// //   if (level === "MEDIUM") return "yellow";
// //   return "green";
// // }




// // import { useEffect, useMemo, useState } from "react";
// // import api from "../../api";

// // const PAGE_SIZES = [10, 25, 50];

// // export default function AdminDashboard() {
// //   const [logs, setLogs] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [filter, setFilter] = useState("ALL");
// //   const [loading, setLoading] = useState(true);

// //   // Pagination
// //   const [page, setPage] = useState(1);
// //   const [pageSize, setPageSize] = useState(10);

// //   useEffect(() => {
// //     load();
// //   }, []);

// //   /* ================= LOAD ================= */
// //   const load = async () => {
// //     try {
// //       const res = await api.get("/activity/admin/all");
// //       setLogs(res.data || []);
// //     } catch {
// //       alert("Failed to load messages");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   /* ================= ACTIONS ================= */

// //   const deleteMsg = async (id) => {
// //     if (!window.confirm("Delete this message?")) return;
// //     try {
// //       await api.delete(`/activity/${id}`);
// //       load();
// //     } catch {
// //       alert("Delete failed");
// //     }
// //   };

// //   const blockUser = async (userId) => {
// //     if (
// //       !window.confirm(
// //         "Block this user? They will not be able to login or send messages."
// //       )
// //     )
// //       return;

// //     try {
// //       await api.post("/admin/lock-user", { userId });
// //       alert("User blocked");
// //       load();
// //     } catch {
// //       alert("Block failed");
// //     }
// //   };

// //   const warnUser = async (userId) => {
// //     const msg = prompt("Enter warning message for user:");
// //     if (!msg) return;

// //     try {
// //       await api.post("/admin/warn-user", {
// //         userId,
// //         message: msg
// //       });
// //       alert("Warning sent");
// //       load();
// //     } catch {
// //       alert("Warning failed");
// //     }
// //   };

// //   /* ================= FILTERING ================= */

// //   const filtered = useMemo(() => {
// //     return logs.filter((l) => {
// //       const text = `${l.userName || ""} ${l.message || ""}`.toLowerCase();
// //       const matchText = text.includes(search.toLowerCase());
// //       const matchSeverity =
// //         filter === "ALL" || l.severity === filter;

// //       return matchText && matchSeverity;
// //     });
// //   }, [logs, search, filter]);

// //   /* ================= PAGINATION ================= */

// //   const totalPages = Math.max(
// //     1,
// //     Math.ceil(filtered.length / pageSize)
// //   );

// //   const paginatedData = useMemo(() => {
// //     const start = (page - 1) * pageSize;
// //     return filtered.slice(start, start + pageSize);
// //   }, [filtered, page, pageSize]);

// //   // Reset page if filter/search changes
// //   useEffect(() => {
// //     setPage(1);
// //   }, [search, filter, pageSize]);

// //   /* ================= UI ================= */

// //   return (
// //     <div>
// //       <h2 className="page-title">🛡 Compliance Monitoring Console</h2>

// //       {/* ================= CONTROLS ================= */}
// //       <div
// //         className="card"
// //         style={{
// //           display: "flex",
// //           gap: 12,
// //           alignItems: "center",
// //           flexWrap: "wrap"
// //         }}
// //       >
// //         <input
// //           className="input"
// //           style={{ flex: 1, minWidth: 240 }}
// //           placeholder="Search by user or message..."
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //         />

// //         <select
// //           className="input"
// //           value={filter}
// //           onChange={(e) => setFilter(e.target.value)}
// //         >
// //           <option value="ALL">All Severity</option>
// //           <option value="HIGH">High</option>
// //           <option value="MEDIUM">Medium</option>
// //           <option value="LOW">Low</option>
// //         </select>

// //         <select
// //           className="input"
// //           value={pageSize}
// //           onChange={(e) => setPageSize(Number(e.target.value))}
// //         >
// //           {PAGE_SIZES.map((s) => (
// //             <option key={s} value={s}>
// //               {s} / page
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* ================= TABLE ================= */}
// //       <div className="card">
// //         {loading && (
// //           <p style={{ textAlign: "center", color: "#6b7280" }}>
// //             Loading messages...
// //           </p>
// //         )}

// //         {!loading && paginatedData.length === 0 && (
// //           <p style={{ textAlign: "center", color: "#6b7280" }}>
// //             No user messages found
// //           </p>
// //         )}

// //         {!loading && paginatedData.length > 0 && (
// //           <>
// //             <table className="table">
// //               <thead>
// //                 <tr>
// //                   <th>User</th>
// //                   <th>Message</th>
// //                   <th>Severity</th>
// //                   <th>Risk</th>
// //                   <th>Time</th>
// //                   <th>Action</th>
// //                 </tr>
// //               </thead>

// //               <tbody>
// //                 {paginatedData.map((log) => (
// //                   <tr key={log._id}>
// //                     <td>
// //                       <b>{log.userName || "Unknown"}</b>
// //                       <div style={{ fontSize: 11, color: "#6b7280" }}>
// //                         {log.userId}
// //                       </div>
// //                     </td>

// //                     <td>{log.message}</td>

// //                     <td>
// //                       <span
// //                         className={`badge ${badge(log.severity)}`}
// //                       >
// //                         {log.severity}
// //                       </span>
// //                     </td>

// //                     <td>
// //                       <span
// //                         className={`badge ${badge(log.riskLevel)}`}
// //                       >
// //                         {log.riskLevel}
// //                       </span>
// //                     </td>

// //                     <td>
// //                       {new Date(log.createdAt).toLocaleString()}
// //                     </td>

// //                     <td>
// //                       <button
// //                         className="btn danger"
// //                         onClick={() => deleteMsg(log._id)}
// //                       >
// //                         Delete
// //                       </button>{" "}
// //                       <button
// //                         className="btn secondary"
// //                         onClick={() => blockUser(log.userId)}
// //                       >
// //                         Block
// //                       </button>{" "}
// //                       <button
// //                         className="btn success"
// //                         onClick={() => warnUser(log.userId)}
// //                       >
// //                         Warn
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>

// //             {/* ================= PAGINATION BAR ================= */}
// //             <div
// //               style={{
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 alignItems: "center",
// //                 marginTop: 16
// //               }}
// //             >
// //               <div style={{ fontSize: 13, color: "#6b7280" }}>
// //                 Showing{" "}
// //                 {(page - 1) * pageSize + 1} –{" "}
// //                 {Math.min(page * pageSize, filtered.length)} of{" "}
// //                 {filtered.length}
// //               </div>

// //               <div>
// //                 <button
// //                   className="btn secondary"
// //                   disabled={page === 1}
// //                   onClick={() => setPage((p) => p - 1)}
// //                 >
// //                   Prev
// //                 </button>{" "}
// //                 <span style={{ margin: "0 10px" }}>
// //                   Page {page} / {totalPages}
// //                 </span>
// //                 <button
// //                   className="btn secondary"
// //                   disabled={page === totalPages}
// //                   onClick={() => setPage((p) => p + 1)}
// //                 >
// //                   Next
// //                 </button>
// //               </div>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // /* ================= HELPERS ================= */

// // function badge(level) {
// //   if (level === "HIGH") return "red";
// //   if (level === "MEDIUM") return "yellow";
// //   return "green";
// // }


// import { useEffect, useMemo, useState } from "react";
// import api from "../../api";

// const PAGE_SIZES = [10, 25, 50];

// export default function AdminDashboard() {
//   const [logs, setLogs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("ALL");
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     try {
//       const res = await api.get("/activity/admin/all");
//       setLogs(res.data || []);
//     } catch {
//       alert("Failed to load messages");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= ACTIONS ================= */

//   const deleteMsg = async (id) => {
//     if (!window.confirm("Delete this message?")) return;
//     try {
//       await api.delete(`/activity/${id}`);
//       load();
//     } catch {
//       alert("Delete failed");
//     }
//   };

//   const blockUser = async (userId) => {
//     if (!window.confirm("Block this user?")) return;
//     try {
//       await api.post("/admin/lock-user", { userId });
//       alert("User blocked");
//       load();
//     } catch {
//       alert("Block failed");
//     }
//   };

//   const warnUser = async (userId) => {
//     const msg = prompt("Enter warning message for user:");
//     if (!msg) return;

//     try {
//       await api.post("/admin/warn-user", {
//         userId,
//         message: msg
//       });
//       alert("Warning sent");
//       load();
//     } catch {
//       alert("Warning failed");
//     }
//   };

//   /* ================= FILTERING ================= */

//   const filtered = useMemo(() => {
//     return logs.filter((l) => {
//       const text = `${l.userName || ""} ${l.message || ""}`.toLowerCase();
//       const matchText = text.includes(search.toLowerCase());
//       const matchSeverity =
//         filter === "ALL" || l.severity === filter;

//       return matchText && matchSeverity;
//     });
//   }, [logs, search, filter]);

//   /* ================= PAGINATION ================= */

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filtered.length / pageSize)
//   );

//   const paginatedData = useMemo(() => {
//     const start = (page - 1) * pageSize;
//     return filtered.slice(start, start + pageSize);
//   }, [filtered, page, pageSize]);

//   useEffect(() => {
//     setPage(1);
//   }, [search, filter, pageSize]);

//   /* ================= UI ================= */

//   return (
//     <div>
//       <h2 className="page-title">
//         Compliance Monitoring Console
//       </h2>

//       {/* Controls */}
//       <div
//         className="card"
//         style={{
//           display: "flex",
//           gap: 12,
//           alignItems: "center",
//           flexWrap: "wrap"
//         }}
//       >
//         <input
//           className="input"
//           style={{ flex: 1, minWidth: 240 }}
//           placeholder="Search by user or message..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select
//           className="input"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           <option value="ALL">All Severity</option>
//           <option value="HIGH">High Risk</option>
//           <option value="MEDIUM">Medium Risk</option>
//           <option value="LOW">Low Risk</option>
//         </select>

//         <select
//           className="input"
//           value={pageSize}
//           onChange={(e) =>
//             setPageSize(Number(e.target.value))
//           }
//         >
//           {PAGE_SIZES.map((s) => (
//             <option key={s} value={s}>
//               {s} / page
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Table */}
//       <div className="card">
//         {loading && (
//           <p style={{ textAlign: "center", color: "#6b7280" }}>
//             Loading records...
//           </p>
//         )}

//         {!loading && paginatedData.length === 0 && (
//           <p style={{ textAlign: "center", color: "#6b7280" }}>
//             No records found
//           </p>
//         )}

//         {!loading && paginatedData.length > 0 && (
//           <>
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>User</th>
//                   <th>Message</th>
//                   <th>Severity</th>
//                   <th>Risk</th>
//                   <th>Time</th>
//                   <th style={{ textAlign: "center" }}>
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {paginatedData.map((log) => (
//                   <tr key={log._id}>
//                     <td>
//                       <b>{log.userName || "Unknown"}</b>
//                       <div
//                         style={{
//                           fontSize: 11,
//                           color: "#64748b"
//                         }}
//                       >
//                         {log.userId}
//                       </div>
//                     </td>

//                     <td style={{ maxWidth: 420 }}>
//                       {log.message}
//                     </td>

//                     <td>
//                       <span
//                         className={`pill ${log.severity?.toLowerCase()}`}
//                       >
//                         {log.severity}
//                       </span>
//                     </td>

//                     <td>
//                       <span
//                         className={`pill ${log.riskLevel?.toLowerCase()}`}
//                       >
//                         {log.riskLevel}
//                       </span>
//                     </td>

//                     <td>
//                       {new Date(
//                         log.createdAt
//                       ).toLocaleString()}
//                     </td>

//                     <td style={{ textAlign: "center" }}>
//                       <button
//                         className="btn icon delete"
//                         onClick={() =>
//                           deleteMsg(log._id)
//                         }
//                       >
//                         🗑
//                       </button>{" "}
//                       <button
//                         className="btn icon block"
//                         onClick={() =>
//                           blockUser(log.userId)
//                         }
//                       >
//                         🚫
//                       </button>{" "}
//                       <button
//                         className="btn icon warn"
//                         onClick={() =>
//                           warnUser(log.userId)
//                         }
//                       >
//                         ⚠
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Pagination */}
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 marginTop: 16
//               }}
//             >
//               <div
//                 style={{ fontSize: 13, color: "#64748b" }}
//               >
//                 Showing{" "}
//                 {(page - 1) * pageSize + 1} –{" "}
//                 {Math.min(
//                   page * pageSize,
//                   filtered.length
//                 )}{" "}
//                 of {filtered.length}
//               </div>

//               <div>
//                 <button
//                   className="btn secondary"
//                   disabled={page === 1}
//                   onClick={() =>
//                     setPage((p) => p - 1)
//                   }
//                 >
//                   Prev
//                 </button>{" "}
//                 <span style={{ margin: "0 10px" }}>
//                   Page {page} / {totalPages}
//                 </span>
//                 <button
//                   className="btn secondary"
//                   disabled={page === totalPages}
//                   onClick={() =>
//                     setPage((p) => p + 1)
//                   }
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import api from "../../api";

const PAGE_SIZES = [10, 25, 50];

function senderIdFromLog(log) {
  if (log.kind === "p2p") {
    return log.from?._id || log.from;
  }
  return log.userId;
}

export default function AdminDashboard() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      await api.post("/admin/notifications/read-all").catch(() => {});
      const res = await api.get("/admin/fraud-queue");
      setLogs(res.data?.items || []);
    } catch {
      alert("Failed to load fraud queue");
    } finally {
      setLoading(false);
    }
  };

  /* ================= ACTIONS ================= */

  const deleteMsg = async (log) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      if (log.kind === "p2p") {
        await api.delete(`/admin/p2p-message/${log._id}`);
      } else {
        await api.delete(`/activity/${log._id}`);
      }
      load();
    } catch {
      alert("Delete failed");
    }
  };

  const blockUser = async (log) => {
    const userId = senderIdFromLog(log);
    if (!userId) {
      alert("Could not determine user");
      return;
    }
    if (!window.confirm("Block this user?")) return;
    try {
      await api.post("/admin/lock-user", { userId });
      alert("User blocked");
      load();
    } catch {
      alert("Block failed");
    }
  };

  const warnUser = async (log) => {
    const userId = senderIdFromLog(log);
    if (!userId) {
      alert("Could not determine user");
      return;
    }
    const msg = prompt("Enter warning message for user:");
    if (!msg) return;

    try {
      await api.post("/admin/warn-user", {
        userId,
        message: msg
      });
      alert("Warning sent");
      load();
    } catch {
      alert("Warning failed");
    }
  };

  /* ================= FILTERING ================= */

  const filtered = useMemo(() => {
    return logs.filter((log) => {
      const fromLabel =
        log.kind === "p2p"
          ? `${log.from?.username || ""} ${log.from?.name || ""}`
          : `${log.from?.username || ""}`;
      const toLabel =
        log.kind === "p2p"
          ? `${log.to?.username || ""} ${log.to?.name || ""}`
          : "";
      const text = `${fromLabel} ${toLabel} ${log.message || ""}`.toLowerCase();
      const matchText = text.includes(search.toLowerCase());
      const matchSeverity =
        filter === "ALL" || log.severity === filter;

      return matchText && matchSeverity;
    });
  }, [logs, search, filter]);

  /* ================= PAGINATION ================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / pageSize)
  );

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [search, filter, pageSize]);

  /* ================= UI ================= */

  return (
    <div>
      <h2 className="page-title">Compliance Monitoring Console</h2>
      <p style={{ color: "#64748b", fontSize: 14, marginBottom: 16, maxWidth: 900 }}>
        This list shows only medium/high risk content (peer chats and compliance
        notes). Clean conversations are not visible here. Use severity to
        prioritize review; block senders when appropriate — recipients will
        then stop seeing fraudulent messages from blocked accounts.
      </p>

      {/* Controls */}
      <div
        className="card"
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        <input
          className="input"
          style={{ flex: 1, minWidth: 240 }}
          placeholder="Search by user or message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="ALL">All Severity</option>
          <option value="HIGH">High Risk</option>
          <option value="MEDIUM">Medium Risk</option>
          <option value="LOW">Low Risk</option>
        </select>

        <select
          className="input"
          value={pageSize}
          onChange={(e) =>
            setPageSize(Number(e.target.value))
          }
        >
          {PAGE_SIZES.map((s) => (
            <option key={s} value={s}>
              {s} / page
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="card">
        {loading && (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            Loading records...
          </p>
        )}

        {!loading && paginatedData.length === 0 && (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No records found
          </p>
        )}

        {!loading && paginatedData.length > 0 && (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Message</th>
                  <th>Severity</th>
                  <th>Time</th>
                  <th style={{ textAlign: "center" }}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((log) => {
                  const fromName =
                    log.kind === "p2p"
                      ? log.from?.name || log.from?.username
                      : log.from?.username || "Unknown";
                  const toName =
                    log.kind === "p2p"
                      ? log.to?.name || log.to?.username
                      : "—";

                  return (
                    <tr key={`${log.kind}-${log._id}`}>
                      <td>
                        <span className="pill">
                          {log.kind === "p2p" ? "Peer chat" : "Compliance note"}
                        </span>
                      </td>
                      <td>
                        <b>{fromName}</b>
                        <div style={{ fontSize: 11, color: "#64748b" }}>
                          {senderIdFromLog(log)}
                        </div>
                      </td>
                      <td>{toName}</td>

                      <td style={{ maxWidth: 420 }}>
                        {log.message}
                      </td>

                      <td>
                        <span
                          className={`pill ${log.severity?.toLowerCase()}`}
                        >
                          {log.severity}
                        </span>
                      </td>

                      <td>
                        {new Date(log.createdAt).toLocaleString()}
                      </td>

                      <td style={{ textAlign: "center" }}>
                        <button
                          className="btn icon delete"
                          type="button"
                          onClick={() => deleteMsg(log)}
                        >
                          🗑
                        </button>{" "}
                        <button
                          className="btn icon block"
                          type="button"
                          onClick={() => blockUser(log)}
                        >
                          🚫
                        </button>{" "}
                        <button
                          className="btn icon warn"
                          type="button"
                          onClick={() => warnUser(log)}
                        >
                          ⚠
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 16
              }}
            >
              <div
                style={{ fontSize: 13, color: "#64748b" }}
              >
                Showing{" "}
                {(page - 1) * pageSize + 1} –{" "}
                {Math.min(
                  page * pageSize,
                  filtered.length
                )}{" "}
                of {filtered.length}
              </div>

              <div>
                <button
                  className="btn secondary"
                  disabled={page === 1}
                  onClick={() =>
                    setPage((p) => p - 1)
                  }
                >
                  Prev
                </button>{" "}
                <span style={{ margin: "0 10px" }}>
                  Page {page} / {totalPages}
                </span>
                <button
                  className="btn secondary"
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage((p) => p + 1)
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
