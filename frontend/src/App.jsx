import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminAlerts from "./pages/admin/Alerts";
import AdminCases from "./pages/admin/Cases";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";
import UserExplain from "./pages/admin/UserExplain";
import UserRiskTrend from "./pages/admin/UserRiskTrend";

import UserDashboard from "./pages/user/Dashboard";
import MyActivity from "./pages/user/MyActivity";
import MyRisk from "./pages/user/MyRisk";

export default function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="alerts" element={<AdminAlerts />} />
        {/* <Route path="cases" element={<AdminCases />} /> */}
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="explain" element={<UserExplain />} />

        {/* ✅ RISK TREND PAGE */}
        <Route path="risk-trend" element={<UserRiskTrend />} />
      </Route>

      {/* ================= USER ================= */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="activity" element={<MyActivity />} />
        <Route path="risk" element={<MyRisk />} />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
