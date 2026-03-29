import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">🛡️</div>

        <h1>Create Account</h1>
        <p className="subtitle">
          Request access to ComplianceAI Alert System (user accounts only)
        </p>

        <div className="field">
          <label>Full Name</label>
          <div className="input-box">
            <span>👤</span>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>Email</label>
          <div className="input-box">
            <span>✉️</span>
            <input
              type="email"
              placeholder="john@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>Password</label>
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

        <div className="field">
          <label>Confirm Password</label>
          <div className="input-box">
            <span>🔒</span>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <button className="primary-btn" onClick={handleRegister}>
          Request Access
        </button>

        <p className="bottom-text">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
