import { useState } from "react";
import api from "../../api";

export default function Settings() {
  const [tab, setTab] = useState("security");

  /* ================= SECURITY ================= */
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  /* ================= SYSTEM ================= */
  const [autoBlock, setAutoBlock] = useState(true);
  const [autoCase, setAutoCase] = useState(true);
  const [highRisk, setHighRisk] = useState(70);
  const [mediumRisk, setMediumRisk] = useState(30);

  /* ================= HANDLERS ================= */
  const changePassword = async () => {
    try {
      await api.post("/auth/change-password", {
        oldPassword: oldPass,
        newPassword: newPass
      });
      alert("Password changed");
      setOldPass("");
      setNewPass("");
    } catch {
      alert("Failed to change password");
    }
  };

  const saveSystem = () => {
    alert("Settings saved (UI only for now)");
  };

  return (
    <div>
      <h2 className="page-title">⚙ Settings</h2>

      {/* ===== TABS ===== */}
      <div style={{ marginBottom: 20 }}>
        <button className="btn secondary" onClick={() => setTab("security")}>
          Security
        </button>

        <button className="btn secondary" onClick={() => setTab("system")}>
          System
        </button>

        <button className="btn secondary" onClick={() => setTab("integrations")}>
          Integrations
        </button>
      </div>

      {/* ===================================================== */}
      {/* ================= SECURITY TAB ====================== */}
      {/* ===================================================== */}
      {tab === "security" && (
        <div className="card">
          <div className="section-title">🔐 Security Settings</div>

          <input
            type="password"
            className="input"
            placeholder="Current password"
            value={oldPass}
            onChange={e => setOldPass(e.target.value)}
          />

          <input
            type="password"
            className="input"
            placeholder="New password"
            value={newPass}
            onChange={e => setNewPass(e.target.value)}
          />

          <button className="btn success" onClick={changePassword}>
            Update Password
          </button>
        </div>
      )}

      {/* ===================================================== */}
      {/* ================= SYSTEM TAB ======================== */}
      {/* ===================================================== */}
      {tab === "system" && (
        <div className="card">
          <div className="section-title">🧠 System Controls</div>

          {/* toggles */}
          <div style={{ marginBottom: 16 }}>
            <label>
              <input
                type="checkbox"
                checked={autoBlock}
                onChange={() => setAutoBlock(!autoBlock)}
              />{" "}
              Auto Block High Risk Users
            </label>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>
              <input
                type="checkbox"
                checked={autoCase}
                onChange={() => setAutoCase(!autoCase)}
              />{" "}
              Auto Create Case on High Risk
            </label>
          </div>

          {/* thresholds */}
          <div className="section-title" style={{ fontSize: 15 }}>
            Risk Thresholds
          </div>

          <div style={{ marginBottom: 12 }}>
            High Risk: <b>{highRisk}</b>
            <br />
            <input
              type="range"
              min="50"
              max="100"
              value={highRisk}
              onChange={e => setHighRisk(e.target.value)}
              style={{ width: "300px" }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            Medium Risk: <b>{mediumRisk}</b>
            <br />
            <input
              type="range"
              min="10"
              max="60"
              value={mediumRisk}
              onChange={e => setMediumRisk(e.target.value)}
              style={{ width: "300px" }}
            />
          </div>

          <button className="btn">Save Settings</button>
        </div>
      )}

      {/* ===================================================== */}
      {/* ================= INTEGRATIONS TAB ================== */}
      {/* ===================================================== */}
      {tab === "integrations" && (
        <div className="card">
          <div className="section-title">🔌 Integrations</div>

          <p>
            MongoDB <span className="badge green">Connected</span>
          </p>

          <p>
            Email Service <span className="badge yellow">Not Configured</span>
          </p>

          <p>
            SIEM <span className="badge red">Not Connected</span>
          </p>

          <div style={{ marginTop: 12 }}>
            <button className="btn">Configure Email</button>
            <button className="btn secondary">Configure SIEM</button>
          </div>
        </div>
      )}
    </div>
  );
}
