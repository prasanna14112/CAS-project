import { useEffect, useState, useCallback } from "react";
import api from "../../api";

export default function UserDashboard() {
  const userName = localStorage.getItem("name") || "User";
  const userId = localStorage.getItem("userId");

  const [contacts, setContacts] = useState([]);
  const [contactEmail, setContactEmail] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [thread, setThread] = useState([]);
  const [p2pText, setP2pText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const [complianceMsg, setComplianceMsg] = useState("");
  const [complianceLoading, setComplianceLoading] = useState(false);

  const loadContacts = useCallback(async () => {
    try {
      const res = await api.get("/contacts");
      setContacts(res.data || []);
    } catch {
      setContacts([]);
    }
  }, []);

  const loadThread = useCallback(
    async (otherId) => {
      if (!otherId) return;
      setLoading(true);
      try {
        const res = await api.get(`/messages/thread/${otherId}`);
        setThread(res.data || []);
      } catch {
        setThread([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  useEffect(() => {
    if (selectedId) loadThread(selectedId);
  }, [selectedId, loadThread]);

  const addContact = async () => {
    const email = contactEmail.trim().toLowerCase();
    if (!email) return alert("Enter a contact email");
    try {
      await api.post("/contacts", { contactEmail: email });
      setContactEmail("");
      await loadContacts();
    } catch (err) {
      alert(err.response?.data?.message || "Could not add contact");
    }
  };

  const sendP2p = async () => {
    if (!selectedId) return alert("Select a contact");
    if (!p2pText.trim()) return alert("Type a message");
    try {
      setSending(true);
      const res = await api.post("/messages", {
        toUserId: selectedId,
        body: p2pText.trim()
      });
      setP2pText("");
      if (res.data?.fraudFlagged) {
        alert(
          "Sent. This message was flagged for compliance review (medium/high risk)."
        );
      }
      await loadThread(selectedId);
      await loadContacts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send");
    } finally {
      setSending(false);
    }
  };

  const sendCompliance = async () => {
    if (!complianceMsg.trim()) return alert("Enter a message");
    try {
      setComplianceLoading(true);
      await api.post("/activity/message", { message: complianceMsg.trim() });
      setComplianceMsg("");
      alert("Note submitted to compliance queue.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send");
    } finally {
      setComplianceLoading(false);
    }
  };

  const selectedContact = contacts.find(
    (c) => c.contactUserId?._id === selectedId
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
          gap: 16,
          flexWrap: "wrap"
        }}
      >
        <div>
          <h2 className="page-title">
            User workspace — <span style={{ color: "#2563eb" }}>{userName}</span>
          </h2>
          <p style={{ color: "#6b7280", fontSize: 13, maxWidth: 720 }}>
            Add unlimited contacts by email, then chat privately. Messages are
            clear on your screen. Administrators only see threads that contain
            medium or high risk content. If an admin blocks an account, recipients
            no longer see fraudulent messages from that account.
          </p>
        </div>
        <div
          className="badge green"
          style={{ padding: "6px 14px", fontSize: 13 }}
        >
          Signed in
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(240px, 300px) 1fr",
          gap: 20,
          alignItems: "stretch"
        }}
      >
        <div className="card" style={{ minHeight: 420 }}>
          <div className="section-title">Contacts</div>
          <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>
            Add people by the email they used to register. No limit.
          </p>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input
              className="input"
              style={{ flex: 1 }}
              placeholder="peer@company.com"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <button type="button" className="btn" onClick={addContact}>
              Add
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {contacts.length === 0 && (
              <p style={{ color: "#9ca3af", fontSize: 13 }}>No contacts yet.</p>
            )}
            {contacts.map((c) => {
              const peer = c.contactUserId;
              const id = peer?._id;
              const active = id === selectedId;
              return (
                <button
                  key={c._id}
                  type="button"
                  onClick={() => setSelectedId(id)}
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: active
                      ? "1px solid #2563eb"
                      : "1px solid #e5e7eb",
                    background: active ? "#eff6ff" : "#fff",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ fontWeight: 600 }}>
                    {peer?.name || peer?.username || "User"}
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    {peer?.username}
                  </div>
                  {peer?.blocked && (
                    <span className="badge red" style={{ marginTop: 6 }}>
                      Blocked
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="card" style={{ minHeight: 420, display: "flex", flexDirection: "column" }}>
          <div className="section-title">
            {selectedContact
              ? `Chat with ${
                  selectedContact.contactUserId?.name ||
                  selectedContact.contactUserId?.username ||
                  "contact"
                }`
              : "Select a contact"}
          </div>

          {!selectedId && (
            <p style={{ color: "#6b7280", fontSize: 14 }}>
              Choose someone from your contact list to view the conversation.
            </p>
          )}

          {selectedId && (
            <>
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: 12,
                  background: "#f9fafb",
                  borderRadius: 8,
                  marginBottom: 12,
                  minHeight: 220,
                  maxHeight: 360
                }}
              >
                {loading && (
                  <p style={{ color: "#6b7280" }}>Loading messages…</p>
                )}
                {!loading && thread.length === 0 && (
                  <p style={{ color: "#6b7280" }}>No messages yet.</p>
                )}
                {!loading &&
                  thread.map((m) => {
                    const mine =
                      String(m.fromUserId) === String(userId);
                    return (
                      <div
                        key={m._id}
                        style={{
                          display: "flex",
                          justifyContent: mine ? "flex-end" : "flex-start",
                          marginBottom: 10
                        }}
                      >
                        <div
                          style={{
                            maxWidth: "78%",
                            padding: "10px 12px",
                            borderRadius: 12,
                            background: mine ? "#2563eb" : "#fff",
                            color: mine ? "#fff" : "#111827",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                            fontSize: 14,
                            lineHeight: 1.45,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word"
                          }}
                        >
                          {m.body}
                          <div
                            style={{
                              fontSize: 11,
                              opacity: 0.85,
                              marginTop: 6
                            }}
                          >
                            {new Date(m.createdAt).toLocaleString()} ·{" "}
                            <span style={{ fontWeight: 600 }}>
                              {m.severity}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <textarea
                className="input"
                style={{ width: "100%", minHeight: 100, resize: "vertical" }}
                placeholder="Write a message…"
                value={p2pText}
                onChange={(e) => setP2pText(e.target.value)}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                <button
                  type="button"
                  className="btn"
                  disabled={sending}
                  onClick={sendP2p}
                >
                  {sending ? "Sending…" : "Send message"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card" style={{ marginTop: 20, maxWidth: 900 }}>
        <div className="section-title">Compliance note (optional)</div>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 10 }}>
          Send a separate note to the compliance team (legacy channel). Same
          risk rules apply: only elevated-risk content appears in the admin
          fraud queue.
        </p>
        <textarea
          className="input"
          style={{ width: "100%", minHeight: 90 }}
          placeholder="Internal compliance note…"
          value={complianceMsg}
          onChange={(e) => setComplianceMsg(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
          <button
            type="button"
            className="btn secondary"
            disabled={complianceLoading}
            onClick={sendCompliance}
          >
            {complianceLoading ? "Sending…" : "Submit to compliance"}
          </button>
        </div>
      </div>
    </div>
  );
}
