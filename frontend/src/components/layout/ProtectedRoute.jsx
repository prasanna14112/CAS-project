import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const path = location.pathname;

  // 🚨 block wrong role access
  if (role === "user" && path.startsWith("/admin")) {
    return <Navigate to="/user/dashboard" replace />;
  }

  if (role === "admin" && path.startsWith("/user")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
