import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="app-shell">

      {/* TOPBAR FIRST */}
      <Topbar />

      {/* BELOW TOPBAR */}
      <div className="app-body">
        <Sidebar />

        <main className="app-content">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AppLayout;
