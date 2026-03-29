// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api";

// const Topbar = () => {
//   const navigate = useNavigate();

//   const [open, setOpen] = useState(false);

//   /* 🔍 SEARCH */
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState(null);

//   /* 🔔 NOTIFICATIONS */
//   const [alerts, setAlerts] = useState([]);
//   const [alertCount, setAlertCount] = useState(0);
//   const [showAlerts, setShowAlerts] = useState(false);

//   /* ================= 🌙 ADDED: DARK MODE STATE ================= */
//   const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

//   const user = JSON.parse(localStorage.getItem("user")) || {
//     username: "Admin User",
//     role: "Super Admin"
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   /* ================= 🌙 ADDED: APPLY DARK MODE ================= */
//   useEffect(() => {
//     if (dark) {
//       document.body.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.body.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [dark]);

//   /* ================= SEARCH ================= */
//   const handleSearch = async (value) => {
//     setQuery(value);

//     if (!value.trim()) {
//       setResults(null);
//       return;
//     }

//     try {
//       const res = await api.get(`/admin/search?q=${value}`);
//       setResults(res.data);
//     } catch {
//       setResults(null);
//     }
//   };

//   const go = (path) => {
//     setResults(null);
//     setQuery("");
//     navigate(path);
//   };

//   /* ================= 🔔 LIVE ALERTS ================= */
//   useEffect(() => {
//     fetchAlerts();
//     const interval = setInterval(fetchAlerts, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchAlerts = async () => {
//     try {
//       const res = await api.get("/admin/alerts");

//       const all = res.data || [];

//       // last 5 alerts for dropdown
//       const latest = [...all]
//         .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
//         .slice(0, 5);

//       setAlerts(latest);

//       // last 5 minutes count
//       const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
//       const recent = all.filter(a =>
//         new Date(a.timestamp).getTime() > fiveMinutesAgo
//       );

//       setAlertCount(recent.length);

//     } catch {
//       setAlerts([]);
//       setAlertCount(0);
//     }
//   };

//   return (
//     <header className="topbar">

//       {/* ========= LEFT : BRAND ========= */}
//       <div className="brand-box">
//         <div className="brand-icon">🛡️</div>
//         <div>
//           <div className="brand-title">ComplianceAI</div>
//           <div className="brand-sub">Monitoring System</div>
//         </div>
//       </div>

//       {/* ========= CENTER : SEARCH ========= */}
//       <div style={{ position: "relative" }}>
//         <input
//           className="search"
//           placeholder="Search users, alerts, cases..."
//           value={query}
//           onChange={(e) => handleSearch(e.target.value)}
//         />

//         {results && (
//           <div className="search-dropdown">

//             {results.users?.map(u => (
//               <div key={u._id} className="search-item" onClick={() => go("/admin/users")}>
//                 👤 {u.username}
//               </div>
//             ))}

//             {results.alerts?.map(a => (
//               <div key={a._id} className="search-item" onClick={() => go("/admin/alerts")}>
//                 ⚠ {a.message}
//               </div>
//             ))}

//             {results.cases?.map(c => (
//               <div key={c._id} className="search-item" onClick={() => go("/admin/cases")}>
//                 📁 {c._id}
//               </div>
//             ))}

//           </div>
//         )}
//       </div>

//       {/* ========= RIGHT ========= */}
//       <div className="top-actions">

//         {/* 🌙 ===== ADDED: DARK MODE BUTTON ===== */}
//         <button
//           className="btn secondary"
//           onClick={() => setDark(!dark)}
//         >
//           {dark ? "☀️" : "🌙"}
//         </button>

//         {/* 🔔 BELL WITH DROPDOWN */}
//         <div style={{ position: "relative" }}>
//           <div
//             className="bell"
//             onClick={() => setShowAlerts(!showAlerts)}
//           >
//             🔔
//             {alertCount > 0 && (
//               <span className="bell-badge">{alertCount}</span>
//             )}
//           </div>

//           {showAlerts && (
//             <div className="notif-dropdown">

//               <div className="notif-title">Notifications</div>

//               {alerts.length === 0 && (
//                 <div className="notif-empty">No alerts</div>
//               )}

//               {alerts.map(a => (
//                 <div
//                   key={a._id}
//                   className="notif-item"
//                   onClick={() => navigate("/admin/alerts")}
//                 >
//                   ⚠ {a.message}
//                   <span className="notif-time">
//                     {new Date(a.timestamp).toLocaleTimeString()}
//                   </span>
//                 </div>
//               ))}

//               <div
//                 className="notif-footer"
//                 onClick={() => navigate("/admin/alerts")}
//               >
//                 View All Alerts →
//               </div>
//             </div>
//           )}
//         </div>

//         {/* PROFILE */}
//         <div className="profile" onClick={() => setOpen(!open)}>
//           <div className="avatar" />
//           <div className="profile-text">
//             <div className="profile-name">{user.username}</div>
//             <div className="profile-role">{user.role}</div>
//           </div>
//           ▼
//         </div>

//         {open && (
//           <div className="profile-dropdown">
//             <div onClick={logout}>Logout</div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Topbar;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function Topbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [adminAlerts, setAdminAlerts] = useState(0);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = localStorage.getItem("role");
  const displayName = user.username || localStorage.getItem("name") || "User";
  const displayRole = user.role || role || "—";

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    if (role !== "admin") return undefined;

    const poll = async () => {
      try {
        const res = await api.get("/admin/notifications/unread-count");
        setAdminAlerts(res.data?.count ?? 0);
      } catch {
        setAdminAlerts(0);
      }
    };

    poll();
    const t = setInterval(poll, 15000);
    return () => clearInterval(t);
  }, [role]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="brand">
        🛡️ <b>ComplianceAI</b>
        <span style={{ fontSize: 11, fontWeight: 500, marginLeft: 8, opacity: 0.75 }}>
          v2.0.0
        </span>
      </div>

      <input
        className="search"
        placeholder="Search users, alerts, cases..."
      />

      <div className="top-actions">
        {role === "admin" && adminAlerts > 0 && (
          <span
            title="Unread fraud notifications"
            style={{
              fontSize: 13,
              marginRight: 8,
              padding: "4px 10px",
              borderRadius: 999,
              background: "#fef2f2",
              color: "#b91c1c",
              border: "1px solid #fecaca"
            }}
          >
            🔔 {adminAlerts} new
          </span>
        )}
        <button
          className="btn secondary"
          onClick={() => setDark(!dark)}
        >
          {dark ? "☀️" : "🌙"}
        </button>

        <div className="profile" onClick={() => setOpen(!open)}>
          <div className="avatar">
            {(displayName || "?").charAt(0)}
          </div>
          <div>
            <div className="profile-name">{displayName}</div>
            <div className="profile-role">{displayRole}</div>
          </div>
        </div>

        {open && (
          <div className="profile-dropdown">
            <div onClick={logout}>Logout</div>
          </div>
        )}
      </div>
    </header>
  );
}
