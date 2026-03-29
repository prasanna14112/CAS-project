/*import { useEffect, useState } from "react";
import api from "../../api";
import { exportToCSV } from "../../utils/exportCSV";

export default function Cases() {
  const [cases, setCases] = useState([]);
  const [remark, setRemark] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/admin/cases");
    setCases(res.data);
  };

  const updateStatus = async (id, status) => {
    await api.post("/admin/update-case", {
      caseId: id,
      status,
      remarks: remark
    });
    setRemark("");
    load();
  };

  return (
  <div>
    <h2 className="page-title">Cases</h2>
    <button
  className="btn"
  style={{ marginBottom: 14 }}
  onClick={() => exportToCSV(cases, "cases.csv")}
>
  ⬇ Export CSV
</button>

    {cases.map(c => (
      <div key={c._id} className="card">
        <p><b>Alert:</b> {c.alertId}</p>
        <p><b>Status:</b> {c.status}</p>

        <textarea
          className="input"
          placeholder="Add remark"
          value={remark}
          onChange={e=>setRemark(e.target.value)}
        />

        <button className="btn secondary" onClick={()=>updateStatus(c._id,"REVIEW")}>Review</button>
        <button className="btn danger" onClick={()=>updateStatus(c._id,"CLOSED")}>Close</button>
      </div>
    ))}
  </div>
);

}
*/
import { useEffect, useState } from "react";
import api from "../../api";

export default function Cases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await api.get("/admin/cases");
      setCases(res.data || []);
    } catch {
      alert("Failed to load cases");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/cases/${id}`, { status });
      load();
    } catch {
      alert("Failed to update case");
    }
  };

  return (
    <div>
      <h2 className="page-title">📂 Investigation Cases</h2>

      <div className="card">
        {loading && <p>Loading cases...</p>}

        {!loading && cases.length === 0 && (
          <p style={{ color: "#64748b" }}>No open cases</p>
        )}

        {!loading && cases.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cases.map(c => (
                <tr key={c._id}>
                  <td>{c.userName || c.userId}</td>
                  <td>{c.status}</td>
                  <td>{c.remarks || "-"}</td>
                  <td>
                    <button
                      className="btn secondary"
                      onClick={() => updateStatus(c._id, "REVIEW")}
                    >
                      Review
                    </button>{" "}
                    <button
                      className="btn success"
                      onClick={() => updateStatus(c._id, "CLOSED")}
                    >
                      Close
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
