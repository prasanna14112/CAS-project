import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleLogin = async () => {
  //   try {
  //     const res = await api.post("/auth/login", {
  //       email,
  //       password,
  //       role, // 👈 SEND ROLE
  //     });
  //     const { token, user } = res.data;

  //     localStorage.setItem("token", token);
  //     localStorage.setItem("role", user.role);
  //     localStorage.setItem("userId", user.id);
  //     localStorage.setItem("name", user.name);


  //     if (role === "admin") {
  //       navigate("/admin/dashboard");
  //     } else {
  //       navigate("/user/dashboard");
  //     }
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Login failed");
  //   }
  // };
      const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", {
      email,
      password
    });

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("name", user.name);
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: user.name,
        role: user.role,
        email: user.email || ""
      })
    );

    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">🛡️</div>

        <h1>Welcome Back</h1>
        <p className="subtitle">Sign in to ComplianceAI Alert System</p>

        <div className="field">
          <label>Email</label>
          <div className="input-box">
            <span>✉️</span>
            <input
              type="email"
              placeholder="admin@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <div className="password-header">
            <label>Password</label>
            <a href="#">Forgot password?</a>
          </div>
          <div className="input-box">
            <span>🔒</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye">👁️</span>
          </div>
        </div>

        <button className="primary-btn" onClick={handleLogin}>
          Sign In
        </button>

        <p className="bottom-text">
          Don&apos;t have an account? <a href="/register">Request access</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

