import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { updateUserProfile, getUserProfile } from "../services/api";
import { auth } from "../config/firebase";

export default function Profile() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("loggedInUser");
      if (raw) {
        const u = JSON.parse(raw);
        setProfile((p) => ({ ...p, fullName: u.fullName || "", email: u.email || "", phone: u.phone || "", address: u.address || "" }));
      }

      // If user is signed in with Firebase Auth, try to fetch fresh profile from backend
      (async () => {
        try {
          const current = auth.currentUser;
          if (current) {
            const token = await current.getIdToken();
            // Use GET to fetch current profile from server
            const serverProfile = await getUserProfile(token);
            // update local profile fields from server if returned
            if (serverProfile) {
              const u = serverProfile;
              setProfile((p) => ({ ...p, fullName: u.fullName || p.fullName, email: u.email || p.email, phone: u.phone || p.phone, address: u.address || p.address }));
            }
          }
        } catch (e) {
          // ignore fetch errors
        }
      })();
    } catch (e) {}
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    // Basic validation
    if (!profile.fullName || !profile.email) {
      setMessage({ type: "error", text: "Name and email are required." });
      return;
    }
    if (!profile.email.includes("@")) {
      setMessage({ type: "error", text: "Please enter a valid email." });
      return;
    }

    setLoading(true);
    try {
      // Persist locally
      const raw = localStorage.getItem("loggedInUser");
      const u = raw ? JSON.parse(raw) : {};
      const merged = { ...u, fullName: profile.fullName, email: profile.email, phone: profile.phone, address: profile.address };
      localStorage.setItem("loggedInUser", JSON.stringify(merged));

      // Attempt server update using Firebase ID token if available
      try {
        const current = auth.currentUser;
        if (current) {
          const token = await current.getIdToken();
          await updateUserProfile({ fullName: profile.fullName, email: profile.email, phone: profile.phone, address: profile.address }, token);
          setMessage({ type: "success", text: "Profile saved to server." });
        } else if (u && u.token) {
          // fallback to token stored in localStorage (legacy)
          try {
            await updateUserProfile({ fullName: profile.fullName, email: profile.email, phone: profile.phone, address: profile.address }, u.token);
            setMessage({ type: "success", text: "Profile saved to server." });
          } catch (err) {
            console.warn("profile update failed", err);
          }
        } else {
          // no auth token available
          setMessage({ type: "success", text: "Profile saved locally." });
        }
      } catch (err) {
        console.warn("profile update failed", err);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save profile." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "80vh", padding: 30 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 720, margin: "0 auto", background: "white", padding: 24, borderRadius: 12, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
        <h2 style={{ marginTop: 0 }}>My Profile</h2>
        <p style={{ color: "#666" }}>Update your personal details below.</p>

        {message && (
          <div style={{ margin: "12px 0", padding: "10px 12px", borderRadius: 8, background: message.type === "error" ? "#fff0f0" : "#f0fff6", color: message.type === "error" ? "#b00020" : "#0b6a34" }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginTop: 12, fontWeight: 600 }}>Full name</label>
          <input name="fullName" value={profile.fullName} onChange={handleChange} placeholder="Your full name" style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />

          <label style={{ display: "block", marginTop: 12, fontWeight: 600 }}>Email</label>
          <input name="email" type="email" value={profile.email} onChange={handleChange} placeholder="you@domain.com" style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />

          <label style={{ display: "block", marginTop: 12, fontWeight: 600 }}>Phone</label>
          <input name="phone" value={profile.phone} onChange={handleChange} placeholder="+1 555 555 5555" style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />

          <label style={{ display: "block", marginTop: 12, fontWeight: 600 }}>Address</label>
          <textarea name="address" value={profile.address} onChange={handleChange} placeholder="Your address" style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd", minHeight: 90 }} />

          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button type="submit" disabled={loading} style={{ padding: "10px 18px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#ff6b6b,#ee5a6f)", color: "white", fontWeight: 700, cursor: "pointer" }}>
              {loading ? "Saving..." : "Save Profile"}
            </button>
            <button type="button" onClick={() => {
              // reset from stored
              const raw = localStorage.getItem("loggedInUser");
              if (raw) {
                const u = JSON.parse(raw);
                setProfile({ fullName: u.fullName || "", email: u.email || "", phone: u.phone || "", address: u.address || "" });
                setMessage({ type: "success", text: "Reset to stored profile." });
              } else {
                setProfile({ fullName: "", email: "", phone: "", address: "" });
                setMessage({ type: "success", text: "Cleared." });
              }
            }} style={{ padding: "10px 18px", borderRadius: 8, border: "1px solid #ddd", background: "transparent", cursor: "pointer" }}>
              Reset
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
