// // import { useEffect, useState } from "react";
// // import api from "../../api";
// // import { exportToCSV } from "../../utils/exportCSV";

// // export default function Users() {

// //   const [users, setUsers] = useState([]);

// //   /* ===== ADDED: FILTER + PAGINATION ===== */
// //   const [roleFilter, setRoleFilter] = useState("ALL");
// //   const [page, setPage] = useState(1);
// //   const limit = 5;

// //   useEffect(() => {
// //     load();
// //   }, []);

// //   const load = async () => {
// //     const res = await api.get("/admin/users");

// //     /* ✅ SAFE: handle both formats */
// //     const list = Array.isArray(res.data) ? res.data : res.data.users || [];

// //     setUsers(list);
// //   };

// //   const lockUser = async (id) => {
// //     await api.post("/admin/lock-user", { userId: id });
// //     load();
// //   };

// //   const unlockUser = async (id) => {
// //     await api.post("/admin/unlock-user", { userId: id });
// //     load();
// //   };

// //   /* ===== FILTER ===== */
// //   const filteredUsers =
// //     roleFilter === "ALL"
// //       ? users
// //       : users.filter(u => u.role === roleFilter);

// //   /* ===== SAFE PAGINATION ===== */
// //   const totalPages = Math.ceil(filteredUsers.length / limit) || 1;

// //   const safePage = Math.min(page, totalPages);

// //   const start = (safePage - 1) * limit;
// //   const paginatedUsers = filteredUsers.slice(start, start + limit);

// //   return (
// //     <div>
// //       <h2 className="page-title">Users</h2>

// //       {/* FILTER */}
// //       <select
// //         className="input"
// //         value={roleFilter}
// //         onChange={(e) => {
// //           setRoleFilter(e.target.value);
// //           setPage(1);
// //         }}
// //         style={{ marginBottom: 14 }}
// //       >
// //         <option value="ALL">All Roles</option>
// //         <option value="admin">Admin</option>
// //         <option value="user">User</option>
// //       </select>

// //       {/* EXPORT */}
// //       <button
// //         className="btn export"
// //         style={{ marginBottom: 14, marginLeft: 10 }}
// //         onClick={() =>
// //           exportToCSV(
// //             users.map(u => ({
// //               Username: u.username,
// //               Role: u.role,
// //               RiskLevel: u.riskLevel,
// //               Warnings: u.warnings,
// //               Status: u.blocked ? "Blocked" : "Active"
// //             })),
// //             "users.csv"
// //           )
// //         }
// //       >
// //         ⬇ Export CSV
// //       </button>

// //       {/* TABLE */}
// //       <table className="table">
// //         <thead>
// //           <tr>
// //             <th>User</th>
// //             <th>Role</th>
// //             <th>Risk</th>
// //             <th>Warnings</th>
// //             <th>Status</th>
// //             <th>Action</th>
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {paginatedUsers.map(u => (
// //             <tr key={u._id}>
// //               <td>{u.username}</td>
// //               <td>{u.role}</td>
// //               <td><span className="badge yellow">{u.riskLevel}</span></td>
// //               <td>{u.warnings}</td>
// //               <td>
// //                 {u.blocked
// //                   ? <span className="badge red">Blocked</span>
// //                   : <span className="badge green">Active</span>}
// //               </td>
// //               <td>
// //                 <button
// //                   className="btn secondary"
// //                   onClick={()=>u.blocked?unlockUser(u._id):lockUser(u._id)}
// //                 >
// //                   {u.blocked?"Unlock":"Lock"}
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {/* PAGINATION */}
// //       <div style={{ marginTop: 16 }}>
// //         <button
// //           className="btn secondary"
// //           disabled={safePage === 1}
// //           onClick={() => setPage(safePage - 1)}
// //         >
// //           Prev
// //         </button>

// //         <span style={{ margin: "0 12px" }}>
// //           Page {safePage} / {totalPages}
// //         </span>

// //         <button
// //           className="btn secondary"
// //           disabled={safePage === totalPages}
// //           onClick={() => setPage(safePage + 1)}
// //         >
// //           Next
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }


// // import { useEffect, useState } from "react";
// // import api from "../../api";
// // import { exportToCSV } from "../../utils/exportCSV";

// // export default function Users() {
// //   const [users, setUsers] = useState([]);

// //   /* ===== FILTER + PAGINATION ===== */
// //   const [roleFilter, setRoleFilter] = useState("ALL");
// //   const [page, setPage] = useState(1);
// //   const limit = 5;

// //   useEffect(() => {
// //     load();
// //   }, []);

// //   const load = async () => {
// //     try {
// //       const res = await api.get("/admin/users");
// //       const list = Array.isArray(res.data)
// //         ? res.data
// //         : res.data.users || [];

// //       setUsers(list);
// //     } catch (err) {
// //       alert("Failed to load users");
// //     }
// //   };

// //   /* ===== BLOCK / UNBLOCK USER ===== */
// //   const toggleBlock = async (id, isBlocked) => {
// //     const action = isBlocked ? "unblock-user" : "block-user";

// //     const confirmText = isBlocked
// //       ? "Unblock this user? They will be able to login and send messages."
// //       : "Block this user? They will NOT be able to login or send messages.";

// //     if (!window.confirm(confirmText)) return;

// //     try {
// //       await api.post(`/admin/${action}`, { userId: id });
// //       alert(isBlocked ? "User unblocked" : "User blocked");
// //       load();
// //     } catch {
// //       alert("Action failed");
// //     }
// //   };

// //   /* ===== FILTER ===== */
// //   const filteredUsers =
// //     roleFilter === "ALL"
// //       ? users
// //       : users.filter((u) => u.role === roleFilter);

// //   /* ===== PAGINATION ===== */
// //   const totalPages = Math.ceil(filteredUsers.length / limit) || 1;
// //   const safePage = Math.min(page, totalPages);

// //   const start = (safePage - 1) * limit;
// //   const paginatedUsers = filteredUsers.slice(start, start + limit);

// //   return (
// //     <div>
// //       <h2 className="page-title">Users</h2>

// //       {/* ===== CONTROLS ===== */}
// //       <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
// //         <select
// //           className="input"
// //           value={roleFilter}
// //           onChange={(e) => {
// //             setRoleFilter(e.target.value);
// //             setPage(1);
// //           }}
// //           style={{ marginBottom: 14 }}
// //         >
// //           <option value="ALL">All Roles</option>
// //           <option value="admin">Admin</option>
// //           <option value="user">User</option>
// //         </select>

// //         <button
// //           className="btn export"
// //           style={{ marginBottom: 14 }}
// //           onClick={() =>
// //             exportToCSV(
// //               users.map((u) => ({
// //                 Username: u.username,
// //                 Role: u.role,
// //                 RiskLevel: u.riskLevel,
// //                 Warnings: u.warnings,
// //                 Status: u.blocked ? "Blocked" : "Active",
// //               })),
// //               "users.csv"
// //             )
// //           }
// //         >
// //           ⬇ Export CSV
// //         </button>
// //       </div>

// //       {/* ===== TABLE ===== */}
// //       <table className="table">
// //         <thead>
// //           <tr>
// //             <th>User</th>
// //             <th>Role</th>
// //             <th>Risk</th>
// //             <th>Warnings</th>
// //             <th>Status</th>
// //             <th>Action</th>
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {paginatedUsers.map((u) => (
// //             <tr key={u._id}>
// //               <td>{u.username}</td>
// //               <td>{u.role}</td>
// //               <td>
// //                 <span className="badge yellow">{u.riskLevel}</span>
// //               </td>
// //               <td>{u.warnings}</td>
// //               <td>
// //                 {u.blocked ? (
// //                   <span className="badge red">Blocked</span>
// //                 ) : (
// //                   <span className="badge green">Active</span>
// //                 )}
// //               </td>
// //               <td>
// //                 <button
// //                   className="btn secondary"
// //                   onClick={() => toggleBlock(u._id, u.blocked)}
// //                 >
// //                   {u.blocked ? "Unblock" : "Block"}
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {/* ===== PAGINATION ===== */}
// //       <div style={{ marginTop: 16 }}>
// //         <button
// //           className="btn secondary"
// //           disabled={safePage === 1}
// //           onClick={() => setPage(safePage - 1)}
// //         >
// //           Prev
// //         </button>

// //         <span style={{ margin: "0 12px" }}>
// //           Page {safePage} / {totalPages}
// //         </span>

// //         <button
// //           className="btn secondary"
// //           disabled={safePage === totalPages}
// //           onClick={() => setPage(safePage + 1)}
// //         >
// //           Next
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import api from "../../api";
// import { exportToCSV } from "../../utils/exportCSV";

// export default function Users() {
//   const [users, setUsers] = useState([]);

//   /* ===== FILTER + PAGINATION ===== */
//   const [roleFilter, setRoleFilter] = useState("ALL");
//   const [page, setPage] = useState(1);
//   const limit = 5;

//   useEffect(() => {
//     load();
//   }, []);

//   /* ================= LOAD USERS ================= */
//   const load = async () => {
//     try {
//       const res = await api.get("/admin/users");
//       const list = Array.isArray(res.data)
//         ? res.data
//         : res.data.users || [];
//       setUsers(list);
//     } catch {
//       alert("Failed to load users");
//     }
//   };

//   /* ================= BLOCK / UNBLOCK ================= */
//   const toggleBlock = async (id, isBlocked) => {
//     const action = isBlocked ? "unblock-user" : "block-user";

//     const confirmText = isBlocked
//       ? "Unblock this user? They will be able to login and send messages."
//       : "Block this user? They will NOT be able to login or send messages.";

//     if (!window.confirm(confirmText)) return;

//     try {
//       await api.post(`/admin/${action}`, { userId: id });
//       alert(isBlocked ? "User unblocked" : "User blocked");
//       load();
//     } catch {
//       alert("Action failed");
//     }
//   };

//   /* ================= FILTER ================= */
//   const filteredUsers =
//     roleFilter === "ALL"
//       ? users
//       : users.filter((u) => u.role === roleFilter);

//   /* ================= PAGINATION ================= */
//   const totalPages = Math.ceil(filteredUsers.length / limit) || 1;
//   const safePage = Math.min(page, totalPages);
//   const start = (safePage - 1) * limit;
//   const paginatedUsers = filteredUsers.slice(start, start + limit);

//   return (
//     <div>
//       <h2 className="page-title">Users</h2>

//       {/* ================= CONTROLS ================= */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 12,
//           marginBottom: 14
//         }}
//       >
//         <select
//           className="input"
//           value={roleFilter}
//           onChange={(e) => {
//             setRoleFilter(e.target.value);
//             setPage(1);
//           }}
//         >
//           <option value="ALL">All Roles</option>
//           <option value="admin">Admin</option>
//           <option value="user">User</option>
//         </select>

//         <button
//           className="btn export"
//           onClick={() =>
//             exportToCSV(
//               users.map((u) => ({
//                 Username: u.username,
//                 Role: u.role,
//                 RiskLevel: u.riskLevel,
//                 Warnings: u.warnings,
//                 LastWarning: u.lastWarning || "None",
//                 Status: u.blocked ? "Blocked" : "Active"
//               })),
//               "users.csv"
//             )
//           }
//         >
//           ⬇ Export CSV
//         </button>
//       </div>

//       {/* ================= TABLE ================= */}
//       <table className="table">
//         <thead>
//           <tr>
//             <th>User</th>
//             <th>Role</th>
//             <th>Risk</th>
//             <th>Warnings</th>
//             <th>Last Warning</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {paginatedUsers.map((u) => (
//             <tr key={u._id}>
//               <td>{u.username}</td>
//               <td>{u.role}</td>
//               <td>
//                 <span className="badge yellow">
//                   {u.riskLevel}
//                 </span>
//               </td>
//               <td>{u.warnings}</td>

//               <td style={{ maxWidth: 250 }}>
//                 <div
//                   title={u.lastWarning}
//                   style={{
//                     whiteSpace: "nowrap",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis"
//                   }}
//                 >
//                   {u.lastWarning || "—"}
//                 </div>
//               </td>

//               <td>
//                 {u.blocked ? (
//                   <span className="badge red">Blocked</span>
//                 ) : (
//                   <span className="badge green">Active</span>
//                 )}
//               </td>

//               <td>
//                 <button
//                   className="btn secondary"
//                   onClick={() =>
//                     toggleBlock(u._id, u.blocked)
//                   }
//                 >
//                   {u.blocked ? "Unblock" : "Block"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ================= PAGINATION ================= */}
//       <div style={{ marginTop: 16 }}>
//         <button
//           className="btn secondary"
//           disabled={safePage === 1}
//           onClick={() => setPage(safePage - 1)}
//         >
//           Prev
//         </button>

//         <span style={{ margin: "0 12px" }}>
//           Page {safePage} / {totalPages}
//         </span>

//         <button
//           className="btn secondary"
//           disabled={safePage === totalPages}
//           onClick={() => setPage(safePage + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import api from "../../api";

// export default function Users() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     try {
//       const res = await api.get("/admin/users");
//       setUsers(res.data || []);
//     } catch {
//       alert("Failed to load users");
//     }
//   };

//  const toggleBlock = async (user) => {
//   try {
//     const endpoint = user.blocked
//       ? "/admin/unlock-user"
//       : "/admin/lock-user";

//     await api.post(endpoint, { userId: user._id });

//     loadUsers();
//   } catch {
//     alert("Action failed");
//   }
// };


//   return (
//     <div>
//       <h2 className="page-title">Users</h2>

//       <div className="card">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>User</th>
//               <th>Role</th>
//               <th>Risk</th>
//               <th>Warnings</th>
//               <th>Last Warning</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((u) => (
//               <tr key={u._id}>
//                 <td>{u.email || u.username}</td>
//                 <td>{u.role}</td>

//                 <td>
//                   <span
//                     className={`pill ${u.riskLevel?.toLowerCase()}`}
//                   >
//                     {u.riskLevel}
//                   </span>
//                 </td>

//                 <td>{u.warnings}</td>

//                 {/* 🔥 THIS WAS MISSING */}
//                 <td style={{ maxWidth: 300 }}>
//                   {u.lastWarning ? (
//                     <span
//                       style={{
//                         color: "#dc2626",
//                         fontWeight: 500
//                       }}
//                     >
//                       {u.lastWarning}
//                     </span>
//                   ) : (
//                     "—"
//                   )}
//                 </td>

//                 <td>
//                   <span
//                     className={`pill ${
//                       u.blocked ? "high" : "low"
//                     }`}
//                   >
//                     {u.blocked ? "Blocked" : "Active"}
//                   </span>
//                 </td>

//                 <td>
//                   <button
//                     className="btn secondary"
//                     onClick={() => toggleBlock(u)}
//                   >
//                     {u.blocked ? "Unblock" : "Block"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "../../api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  /* ================= LOAD USERS ================= */
  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data || []);
    } catch {
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  /* ================= BLOCK / UNBLOCK ================= */
  const toggleBlock = async (user) => {
    try {
      const endpoint = user.blocked
        ? "/admin/unlock-user"
        : "/admin/lock-user";

      await api.post(endpoint, {
        userId: user._id
      });

      await loadUsers();
    } catch {
      alert("Action failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div>
      <h2 className="page-title">Users</h2>

      <div className="card">
        {loading && (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            Loading users...
          </p>
        )}

        {!loading && users.length === 0 && (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No users found
          </p>
        )}

        {!loading && users.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Risk</th>
                <th>Warnings</th>
                <th>Last Warning</th>
                <th>Status</th>
                <th style={{ textAlign: "center" }}>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <b>{u.email || u.username}</b>
                  </td>

                  <td>{u.role}</td>

                  {/* ===== RISK ===== */}
                  <td>
                    <span
                      className={`pill ${u.riskLevel?.toLowerCase()}`}
                    >
                      {u.riskLevel || "LOW"}
                    </span>
                  </td>

                  {/* ===== WARNINGS COUNT ===== */}
                  <td>{u.warnings || 0}</td>

                  {/* ===== LAST WARNING ===== */}
                  <td style={{ maxWidth: 300 }}>
                    {u.lastWarning ? (
                      <span
                        style={{
                          color: "#dc2626",
                          fontWeight: 500
                        }}
                      >
                        {u.lastWarning}
                      </span>
                    ) : (
                      <span style={{ color: "#64748b" }}>
                        —
                      </span>
                    )}
                  </td>

                  {/* ===== STATUS ===== */}
                  <td>
                    <span
                      className={`pill ${
                        u.blocked ? "high" : "low"
                      }`}
                    >
                      {u.blocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  {/* ===== ACTION ===== */}
                  <td style={{ textAlign: "center" }}>
                    <button
                      className={`btn ${
                        u.blocked
                          ? "secondary"
                          : "danger"
                      }`}
                      onClick={() => toggleBlock(u)}
                    >
                      {u.blocked
                        ? "Unblock"
                        : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
