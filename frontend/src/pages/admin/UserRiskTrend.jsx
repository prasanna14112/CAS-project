// // import { useState } from "react";
// // import api from "../../api";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   CartesianGrid,
// //   ResponsiveContainer
// // } from "recharts";

// // export default function UserRiskTrend() {
// //   const [userId, setUserId] = useState("");
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const loadTrend = async () => {
// //     if (!userId.trim()) {
// //       alert("Enter a user ID");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       const res = await api.get(`/admin/risk-trend/${userId}`);

// //     //   const formatted = (res.data || []).map((d) => ({
// //     //     time: new Date(d._id).toLocaleDateString(),
// //     //     risk: d.level === "LOW" ? 1 : d.level === "MEDIUM" ? 2 : 3
// //     //   }));
// //         const formatted = (res.data || []).map((d) => ({
// //         time: new Date(d.time).toLocaleString("en-IN", {
// //             day: "2-digit",
// //             month: "short",
// //             hour: "2-digit",
// //             minute: "2-digit"
// //         }),
// //         risk: d.level === "LOW" ? 1 : d.level === "MEDIUM" ? 2 : 3
// //         }));

// //       setData(formatted);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to load trend");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const riskLabel = (value) => {
// //     if (value === 1) return "Low";
// //     if (value === 2) return "Medium";
// //     if (value === 3) return "High";
// //     return "";
// //   };

// //   return (
// //     <div>
// //       {/* ================= HEADER ================= */}
// //       <h2 className="page-title">📈 Live User Risk Trend</h2>

// //       {/* ================= CONTROLS ================= */}
// //       <div className="card" style={{ marginBottom: 20 }}>
// //         <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
// //           <input
// //             className="input"
// //             placeholder="Enter User ID"
// //             value={userId}
// //             onChange={(e) => setUserId(e.target.value)}
// //             style={{ width: 300 }}
// //           />

// //           <button className="btn" onClick={loadTrend} disabled={loading}>
// //             {loading ? "Loading..." : "Load Trend"}
// //           </button>
// //         </div>
// //       </div>

// //       {/* ================= SUMMARY ================= */}
// //       <div
// //         style={{
// //           display: "grid",
// //           gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
// //           gap: 16,
// //           marginBottom: 20
// //         }}
// //       >
// //         <SummaryCard title="Total Events" value={data.length} />
// //         <SummaryCard
// //           title="High Risk Count"
// //           value={data.filter((d) => d.risk === 3).length}
// //         />
// //         <SummaryCard
// //           title="Medium Risk Count"
// //           value={data.filter((d) => d.risk === 2).length}
// //         />
// //         <SummaryCard
// //           title="Low Risk Count"
// //           value={data.filter((d) => d.risk === 1).length}
// //         />
// //       </div>

// //       {/* ================= CHART ================= */}
// //       <div className="card">
// //         <div className="section-title">Risk Level Over Time</div>

// //         {data.length === 0 ? (
// //           <p style={{ color: "#6b7280" }}>No data to display</p>
// //         ) : (
// //           <ResponsiveContainer width="100%" height={350}>
// //             <LineChart data={data}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               {/* <XAxis dataKey="time" /> */}
// //               <XAxis
// //                 dataKey="time"
// //                 tick={{ fontSize: 12 }}
// //                 angle={-20}
// //                 textAnchor="end"
// //                 height={60}
// //                 />

// //               <YAxis
// //                 domain={[1, 3]}
// //                 ticks={[1, 2, 3]}
// //                 tickFormatter={riskLabel}
// //               />
// //               <Tooltip
// //                 formatter={(value) => riskLabel(value)}
// //                 labelFormatter={(label) => `Date: ${label}`}
// //               />

// //               {/* 🔥 CURVED PROFESSIONAL LINE */}
// //               <Line
// //                 type="monotone"
// //                 dataKey="risk"
// //                 stroke="#2563eb"
// //                 strokeWidth={3}
// //                 dot={{ r: 5 }}
// //                 activeDot={{ r: 7 }}
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // /* ================= SMALL KPI CARD ================= */
// // function SummaryCard({ title, value }) {
// //   return (
// //     <div className="card" style={{ textAlign: "center" }}>
// //       <div style={{ fontSize: 13, color: "#6b7280" }}>{title}</div>
// //       <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
// //     </div>
// //   );
// // }



// // import { useState } from "react";
// // import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// // import api from "../../api";


// // export default function UserRiskTrend() {
// //   const [userId, setUserId] = useState("");
// //   const [data, setData] = useState([]);
// //   const [stats, setStats] = useState({
// //     total: 0,
// //     high: 0,
// //     medium: 0,
// //     low: 0
// //   });
// //   const [loading, setLoading] = useState(false);

// //   const riskToNumber = (risk) => {
// //     if (risk === "HIGH") return 3;
// //     if (risk === "MEDIUM") return 2;
// //     return 1;
// //   };

// //   const loadTrend = async () => {
// //     try {
// //       setLoading(true);

// //       const res = await api.get(`/activity/risk-trend/${userId}`);
// //       const timeline = res.data;

// //       let high = 0,
// //         medium = 0,
// //         low = 0;

// //       const formatted = timeline.map((item) => {
// //         if (item.level === "HIGH") high++;
// //         else if (item.level === "MEDIUM") medium++;
// //         else low++;

// //         return {
// //           date: new Date(item.time).toLocaleString("en-IN", {
// //             day: "2-digit",
// //             month: "short",
// //             hour: "2-digit",
// //             minute: "2-digit"
// //           }),
// //           risk: riskToNumber(item.level),
// //           label: item.level,
// //           message: item.message
// //         };
// //       });

// //       setStats({
// //         total: formatted.length,
// //         high,
// //         medium,
// //         low
// //       });

// //       setData(formatted);
// //     } catch (err) {
// //       alert("Failed to load trend");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="p-6 space-y-6">
// //       <h1 className="text-2xl font-semibold flex items-center gap-2">
// //         📈 Live User Risk Trend
// //       </h1>

// //       {/* Input Panel */}
// //       <div className="bg-white p-5 rounded-xl shadow flex gap-4 items-center">
// //         <input
// //           value={userId}
// //           onChange={(e) => setUserId(e.target.value)}
// //           placeholder="Enter User ID"
// //           className="border rounded-lg px-4 py-2 w-80"
// //         />
// //         <button
// //           onClick={loadTrend}
// //           disabled={loading}
// //           className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
// //         >
// //           {loading ? "Loading..." : "Load Trend"}
// //         </button>
// //       </div>

// //       {/* Stats */}
// //       <div className="grid grid-cols-4 gap-4">
// //         <StatCard label="Total Events" value={stats.total} />
// //         <StatCard label="High Risk" value={stats.high} />
// //         <StatCard label="Medium Risk" value={stats.medium} />
// //         <StatCard label="Low Risk" value={stats.low} />
// //       </div>

// //       {/* Chart */}
// //       <div className="bg-white p-6 rounded-xl shadow">
// //         <h2 className="text-lg font-semibold mb-4">Risk Level Over Time</h2>

// //         {data.length === 0 ? (
// //           <div className="text-gray-500 text-center py-10">
// //             No data to display
// //           </div>
// //         ) : (
// //           <ResponsiveContainer width="100%" height={300}>
// //             <LineChart data={data}>
// //               <XAxis dataKey="date" />
// //               <YAxis
// //                 ticks={[1, 2, 3]}
// //                 domain={[1, 3]}
// //                 tickFormatter={(v) =>
// //                   v === 3 ? "High" : v === 2 ? "Medium" : "Low"
// //                 }
// //               />
// //               <Tooltip
// //                 formatter={(value, name, props) => [
// //                   props.payload.label,
// //                   "Risk"
// //                 ]}
// //                 labelFormatter={(label) => `Time: ${label}`}
// //               />
// //               <Line
// //                 type="monotone"
// //                 dataKey="risk"
// //                 stroke="#2563eb"
// //                 strokeWidth={3}
// //                 dot={{ r: 5 }}
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // /* ================= STAT CARD ================= */

// // function StatCard({ label, value }) {
// //   return (
// //     <div className="bg-white p-4 rounded-xl shadow text-center">
// //       <div className="text-gray-500 text-sm">{label}</div>
// //       <div className="text-2xl font-bold">{value}</div>
// //     </div>
// //   );
// // }



// // import { useState } from "react";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// //   CartesianGrid
// // } from "recharts";
// // import api from "../../api";

// // export default function UserRiskTrend() {
// //   const [userId, setUserId] = useState("");
// //   const [trend, setTrend] = useState([]);
// //   const [stats, setStats] = useState({
// //     total: 0,
// //     high: 0,
// //     medium: 0,
// //     low: 0
// //   });
// //   const [loading, setLoading] = useState(false);

// //   // Convert risk level to number for graph
// //   const riskToNumber = (risk) => {
// //     if (risk === "HIGH") return 3;
// //     if (risk === "MEDIUM") return 2;
// //     return 1;
// //   };

// //   // Convert number to label
// //   const numberToRisk = (num) => {
// //     if (num === 3) return "High";
// //     if (num === 2) return "Medium";
// //     return "Low";
// //   };

// //   const loadTrend = async () => {
// //     if (!userId) {
// //       alert("Enter User ID");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       const res = await api.get(`/activity/risk-trend/${userId}`);

// //       let total = 0;
// //       let high = 0;
// //       let medium = 0;
// //       let low = 0;

// //       const formatted = res.data.map((d) => {
// //         total += d.HIGH + d.MEDIUM + d.LOW;
// //         high += d.HIGH;
// //         medium += d.MEDIUM;
// //         low += d.LOW;

// //         return {
// //           date: new Date(d.date).toLocaleString("en-IN", {
// //             day: "2-digit",
// //             month: "short",
// //             hour: "2-digit",
// //             minute: "2-digit"
// //           }),
// //           riskValue: riskToNumber(
// //             d.HIGH > 0 ? "HIGH" : d.MEDIUM > 0 ? "MEDIUM" : "LOW"
// //           )
// //         };
// //       });

// //       setStats({ total, high, medium, low });
// //       setTrend(formatted);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to load trend");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="p-6 space-y-6">

// //       {/* HEADER */}
// //       <div className="flex justify-between items-center">
// //         <h1 className="text-2xl font-semibold flex items-center gap-2">
// //           📈 Live User Risk Trend
// //         </h1>
// //       </div>

// //       {/* INPUT CARD */}
// //       <div className="bg-white p-6 rounded-xl shadow-sm flex gap-4">
// //         <input
// //           className="flex-1 border rounded-lg px-4 py-2"
// //           placeholder="Enter User ID..."
// //           value={userId}
// //           onChange={(e) => setUserId(e.target.value)}
// //         />
// //         <button
// //           onClick={loadTrend}
// //           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
// //         >
// //           {loading ? "Loading..." : "Load Trend"}
// //         </button>
// //       </div>

// //       {/* STATS */}
// //       <div className="grid grid-cols-4 gap-4">
// //         <StatBox title="Total Events" value={stats.total} />
// //         <StatBox title="High Risk" value={stats.high} />
// //         <StatBox title="Medium Risk" value={stats.medium} />
// //         <StatBox title="Low Risk" value={stats.low} />
// //       </div>

// //       {/* GRAPH */}
// //       <div className="bg-white p-6 rounded-xl shadow-sm">
// //         <h2 className="text-lg font-semibold mb-4">
// //           Risk Level Over Time
// //         </h2>

// //         {trend.length === 0 ? (
// //           <p className="text-gray-500 text-center py-10">
// //             No risk data found for this user
// //           </p>
// //         ) : (
// //           <ResponsiveContainer width="100%" height={320}>
// //             <LineChart data={trend}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="date" />
// //               <YAxis
// //                 ticks={[1, 2, 3]}
// //                 domain={[1, 3]}
// //                 tickFormatter={numberToRisk}
// //               />
// //               <Tooltip
// //                 formatter={(value) => numberToRisk(value)}
// //                 labelFormatter={(label) => `Time: ${label}`}
// //               />
// //               <Line
// //                 type="monotone"
// //                 dataKey="riskValue"
// //                 stroke="#2563eb"
// //                 strokeWidth={3}
// //                 dot={{ r: 5 }}
// //                 activeDot={{ r: 7 }}
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // /* SMALL UI COMPONENT */
// // function StatBox({ title, value }) {
// //   return (
// //     <div className="bg-white rounded-xl shadow-sm p-4 text-center">
// //       <p className="text-sm text-gray-500">{title}</p>
// //       <p className="text-2xl font-bold mt-1">{value}</p>
// //     </div>
// //   );
// // }



// // import { useState } from "react";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// //   CartesianGrid
// // } from "recharts";
// // import api from "../../api";

// // export default function UserRiskTrend() {
// //   const [userId, setUserId] = useState("");
// //   const [chartData, setChartData] = useState([]);
// //   const [stats, setStats] = useState({
// //     total: 0,
// //     high: 0,
// //     medium: 0,
// //     low: 0
// //   });
// //   const [loading, setLoading] = useState(false);

// //   // Risk to number mapping
// //   const riskToValue = (risk) => {
// //     if (risk === "HIGH") return 3;
// //     if (risk === "MEDIUM") return 2;
// //     return 1;
// //   };

// //   const valueToRisk = (value) => {
// //     if (value === 3) return "High";
// //     if (value === 2) return "Medium";
// //     return "Low";
// //   };

// //   const loadTrend = async () => {
// //     if (!userId) {
// //       alert("Please enter a User ID");
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       // Fetch RAW activity logs
// //       const res = await api.get(`/activity/user/${userId}`);
// //       const logs = res.data;

// //       let total = 0;
// //       let high = 0;
// //       let medium = 0;
// //       let low = 0;

// //       const formatted = logs
// //         .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
// //         .map((log) => {
// //           total++;

// //           if (log.severity === "HIGH") high++;
// //           else if (log.severity === "MEDIUM") medium++;
// //           else low++;

// //           return {
// //             time: new Date(log.createdAt).toLocaleString("en-IN", {
// //               day: "2-digit",
// //               month: "short",
// //               hour: "2-digit",
// //               minute: "2-digit"
// //             }),
// //             riskValue: riskToValue(log.severity)
// //           };
// //         });

// //       setStats({ total, high, medium, low });
// //       setChartData(formatted);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to load trend");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="p-6 space-y-6">

// //       {/* HEADER */}
// //       <div className="flex justify-between items-center">
// //         <h1 className="text-2xl font-semibold flex items-center gap-2">
// //           📈 Live User Risk Trend
// //         </h1>
// //       </div>

// //       {/* INPUT */}
// //       <div className="bg-white p-6 rounded-xl shadow-sm flex gap-4">
// //         <input
// //           className="flex-1 border rounded-lg px-4 py-2"
// //           placeholder="Enter User ID..."
// //           value={userId}
// //           onChange={(e) => setUserId(e.target.value)}
// //         />
// //         <button
// //           onClick={loadTrend}
// //           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
// //         >
// //           {loading ? "Loading..." : "Load Trend"}
// //         </button>
// //       </div>

// //       {/* STATS */}
// //       <div className="grid grid-cols-4 gap-4">
// //         <StatBox title="Total Events" value={stats.total} />
// //         <StatBox title="High Risk" value={stats.high} />
// //         <StatBox title="Medium Risk" value={stats.medium} />
// //         <StatBox title="Low Risk" value={stats.low} />
// //       </div>

// //       {/* GRAPH */}
// //       <div className="bg-white p-6 rounded-xl shadow-sm">
// //         <h2 className="text-lg font-semibold mb-4">
// //           Risk Level Over Time
// //         </h2>

// //         {chartData.length === 0 ? (
// //           <p className="text-gray-500 text-center py-10">
// //             No risk data found for this user
// //           </p>
// //         ) : (
// //           <ResponsiveContainer width="100%" height={320}>
// //             <LineChart data={chartData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="time" />
// //               <YAxis
// //                 ticks={[1, 2, 3]}
// //                 domain={[1, 3]}
// //                 tickFormatter={valueToRisk}
// //               />
// //               <Tooltip
// //                 formatter={(value) => valueToRisk(value)}
// //                 labelFormatter={(label) => `Time: ${label}`}
// //               />
// //               <Line
// //                 type="monotone"
// //                 dataKey="riskValue"
// //                 stroke="#2563eb"
// //                 strokeWidth={3}
// //                 dot={{ r: 5 }}
// //                 activeDot={{ r: 7 }}
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // /* STATS CARD */
// // function StatBox({ title, value }) {
// //   return (
// //     <div className="bg-white rounded-xl shadow-sm p-4 text-center">
// //       <p className="text-sm text-gray-500">{title}</p>
// //       <p className="text-2xl font-bold mt-1">{value}</p>
// //     </div>
// //   );
// // }





// import { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid
// } from "recharts";
// import api from "../../api";

// export default function UserRiskTrend() {
//   const [userId, setUserId] = useState("");
//   const [chartData, setChartData] = useState([]);
//   const [stats, setStats] = useState({
//     total: 0,
//     high: 0,
//     medium: 0,
//     low: 0
//   });
//   const [loading, setLoading] = useState(false);

//   const riskToNumber = (risk) => {
//     if (risk === "HIGH") return 3;
//     if (risk === "MEDIUM") return 2;
//     return 1;
//   };

//   const numberToRisk = (num) => {
//     if (num === 3) return "High";
//     if (num === 2) return "Medium";
//     return "Low";
//   };

//   const loadTrend = async () => {
//     if (!userId) {
//       alert("Enter User ID");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await api.get(`/activity/risk-trend/${userId}`);

//       let total = 0;
//       let high = 0;
//       let medium = 0;
//       let low = 0;

//       const formatted = res.data.map((item) => {
//         const h = item.HIGH || 0;
//         const m = item.MEDIUM || 0;
//         const l = item.LOW || 0;

//         total += h + m + l;
//         high += h;
//         medium += m;
//         low += l;

//         let dominantRisk = "LOW";
//         if (h > 0) dominantRisk = "HIGH";
//         else if (m > 0) dominantRisk = "MEDIUM";

//         return {
//           time: new Date(item.date).toLocaleString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             hour: "2-digit",
//             minute: "2-digit"
//           }),
//           riskValue: riskToNumber(dominantRisk),
//           riskLabel: dominantRisk
//         };
//       });

//       setStats({ total, high, medium, low });
//       setChartData(formatted);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load trend");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center gap-2">
//         <span className="text-2xl">📈</span>
//         <h1 className="text-2xl font-semibold">
//           Live User Risk Trend
//         </h1>
//       </div>

//       {/* Search Bar */}
//       <div className="bg-white p-5 rounded-xl shadow-sm flex gap-4 items-center">
//         <input
//           type="text"
//           placeholder="Enter User ID"
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//           className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={loadTrend}
//           disabled={loading}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
//         >
//           {loading ? "Loading..." : "Load Trend"}
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <StatCard title="Total Events" value={stats.total} />
//         <StatCard title="High Risk" value={stats.high} />
//         <StatCard title="Medium Risk" value={stats.medium} />
//         <StatCard title="Low Risk" value={stats.low} />
//       </div>

//       {/* Chart */}
//       <div className="bg-white p-6 rounded-xl shadow-sm">
//         <h2 className="text-lg font-semibold mb-4">
//           Risk Level Over Time
//         </h2>

//         {chartData.length === 0 ? (
//           <p className="text-gray-500 text-center py-10">
//             No data to display
//           </p>
//         ) : (
//           <ResponsiveContainer width="100%" height={320}>
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="time" />
//               <YAxis
//                 domain={[1, 3]}
//                 ticks={[1, 2, 3]}
//                 tickFormatter={(v) => numberToRisk(v)}
//               />
//               <Tooltip
//                 formatter={(value, name, props) => {
//                   return [numberToRisk(value), "Risk"];
//                 }}
//               />
//               <Line
//                 type="monotone"   // 🔥 THIS MAKES THE CURVE
//                 dataKey="riskValue"
//                 strokeWidth={3}
//                 stroke="#2563eb"
//                 dot={{ r: 5 }}
//                 activeDot={{ r: 8 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ---------------- COMPONENT ---------------- */

// function StatCard({ title, value }) {
//   return (
//     <div className="bg-white p-4 rounded-xl shadow-sm text-center">
//       <p className="text-sm text-gray-500">{title}</p>
//       <p className="text-2xl font-bold mt-1">{value}</p>
//     </div>
//   );
// }


import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import api from "../../api";

export default function UserRiskTrend() {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    high: 0,
    medium: 0,
    low: 0
  });
  const [loading, setLoading] = useState(false);

  const loadTrend = async () => {
    try {
      setLoading(true);

      // const res = await api.get(`/activity/risk-trend/${userId}`);
      const res = await api.get(`/activity/risk-trend/${userId}`);

      const trend = res.data;

      let high = 0, medium = 0, low = 0;

      trend.forEach(t => {
        if (t.riskLabel === "HIGH") high++;
        if (t.riskLabel === "MEDIUM") medium++;
        if (t.riskLabel === "LOW") low++;
      });

      setStats({
        total: trend.length,
        high,
        medium,
        low
      });

      const formatted = trend.map(t => ({
        ...t,
        displayTime: new Date(t.time).toLocaleString()
      }));

      setData(formatted);
    } catch (err) {
      alert("Failed to load trend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>📈 Live User Risk Trend</h2>

      {/* Search Bar */}
      <div style={cardStyle}>
        <input
          value={userId}
          onChange={e => setUserId(e.target.value)}
          placeholder="Enter User ID"
          style={inputStyle}
        />
        <button onClick={loadTrend} style={btnStyle}>
          {loading ? "Loading..." : "Load Trend"}
        </button>
      </div>

      {/* Stats Cards */}
      <div style={statsGrid}>
        <StatCard title="Total Events" value={stats.total} />
        <StatCard title="High Risk Count" value={stats.high} />
        <StatCard title="Medium Risk Count" value={stats.medium} />
        <StatCard title="Low Risk Count" value={stats.low} />
      </div>

      {/* Chart */}
      <div style={chartCard}>
        <h3>Risk Level Over Time</h3>

        {data.length === 0 ? (
          <p style={{ color: "#777" }}>No data to display</p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="displayTime" />
              <YAxis
                domain={[1, 3]}
                ticks={[1, 2, 3]}
                tickFormatter={(v) =>
                  v === 1 ? "Low" : v === 2 ? "Medium" : "High"
                }
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="riskValue"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function StatCard({ title, value }) {
  return (
    <div style={statCard}>
      <p style={{ color: "#666" }}>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

/* ================= STYLES ================= */

const cardStyle = {
  background: "#fff",
  padding: "16px",
  borderRadius: "10px",
  display: "flex",
  gap: "12px",
  alignItems: "center",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  marginBottom: "20px"
};

const inputStyle = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd"
};

const btnStyle = {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer"
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "16px",
  marginBottom: "20px"
};

const statCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
};

const chartCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
};
