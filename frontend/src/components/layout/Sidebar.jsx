// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   const role = localStorage.getItem("role");

//   return (
//     <aside className="sidebar">

//       <nav className="menu">

//         {/* ===== ADMIN MENU ===== */}
//         {role === "admin" && (
//           <>
//             <NavLink to="/admin/dashboard">Dashboard</NavLink>
//             <NavLink to="/admin/users">Users</NavLink>
//             <NavLink to="/admin/alerts">Alerts</NavLink>
//             {/* <NavLink to="/admin/cases">Cases</NavLink> */}
//             <NavLink to="/admin/analytics">Analytics</NavLink>
//             <NavLink to="/admin/explain">Explain Risk</NavLink>
//             <NavLink to="/admin/risk-trend">📈Risk Trend</NavLink>
//             <NavLink to="/admin/settings">Settings</NavLink>
            

//           </>
//         )}

//         {/* ===== USER MENU ===== */}
//         {role === "user" && (
//           <>
//             <NavLink to="/user/dashboard">Dashboard</NavLink>
//             <NavLink to="/user/activity">My Activity</NavLink>
//             <NavLink to="/user/risk">My Risk</NavLink>
//             <NavLink to="/user/settings">Settings</NavLink>
//           </>
//         )}

//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const role = localStorage.getItem("role");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <span>{collapsed ? "🛡️" : "ComplianceAI"}</span>
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "➡" : "⬅"}
        </button>
      </div>

      <nav className="menu">
        {role === "admin" && (
          <>
            <Menu to="/admin/dashboard" icon="📊" label="Dashboard" />
            <Menu to="/admin/users" icon="👥" label="Users" />
            <Menu to="/admin/alerts" icon="⚠" label="Alerts" />
            <Menu to="/admin/analytics" icon="📈" label="Analytics" />
            <Menu to="/admin/explain" icon="🧠" label="Explain Risk" />
            <Menu to="/admin/risk-trend" icon="📉" label="Risk Trend" />
            <Menu to="/admin/settings" icon="⚙" label="Settings" />
          </>
        )}

        {role === "user" && (
          <>
            <Menu to="/user/dashboard" icon="🏠" label="Dashboard" />
            <Menu to="/user/activity" icon="📝" label="My Activity" />
            <Menu to="/user/risk" icon="📉" label="My Risk" />
            <Menu to="/user/settings" icon="⚙" label="Settings" />
          </>
        )}
      </nav>
    </aside>
  );
}

function Menu({ to, icon, label }) {
  return (
    <NavLink to={to} className="menu-link">
      <span className="icon">{icon}</span>
      <span className="label">{label}</span>
    </NavLink>
  );
}
