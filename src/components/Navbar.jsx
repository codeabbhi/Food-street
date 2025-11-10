import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar({ theme = "light", toggleTheme = () => {} }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
    // Listen for cross-component login/logout events in the same tab
    const onLogin = (e) => {
      try {
        setLoggedInUser(e?.detail || JSON.parse(localStorage.getItem('loggedInUser')));
      } catch (err) {
        // fallback
        setLoggedInUser(JSON.parse(localStorage.getItem('loggedInUser')));
      }
    };
    const onLogout = () => {
      setLoggedInUser(null);
    };
    window.addEventListener('user-logged-in', onLogin);
    window.addEventListener('user-logged-out', onLogout);

    return () => {
      window.removeEventListener('user-logged-in', onLogin);
      window.removeEventListener('user-logged-out', onLogout);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    setShowDropdown(false);
    try { window.dispatchEvent(new Event('user-logged-out')); } catch (e) {}
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
  ];

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "var(--nav-bg)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="logo" style={{ fontSize: "1.6rem", fontWeight: "700" }}>
          🍔 FoodStreet
        </div>
      </Link>

      {/* Theme toggle control (sun/moon) - only visible to logged-in users */}
      {loggedInUser && (
        <div style={{ marginLeft: 12, marginRight: 8 }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === "light" ? "Switch to dark" : "Switch to light"}
            aria-pressed={theme === "dark"}
            style={{
              width: 44,
              height: 28,
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.06)",
              display: "inline-flex",
              alignItems: "center",
              padding: 4,
              background: "var(--card-bg)",
              cursor: "pointer",
              transition: "all 220ms ease",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: theme === "light" ? "#ffd166" : "#f1f5f9",
                marginLeft: theme === "light" ? 2 : 18,
                transition: "all 300ms ease",
                boxShadow: theme === "light" ? "0 6px 18px rgba(255,145,0,0.14)" : "0 6px 18px rgba(0,0,0,0.4)",
              }}
            />
          </button>
        </div>
      )}

      {/* Navigation Links */}
      <ul className="nav-links" style={{ listStyle: "none", display: "flex", gap: "30px" }}>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              style={{
                textDecoration: "none",
                color: location.pathname === item.path ? "var(--primary)" : "var(--text)",
                fontWeight: 500,
                transition: "color 0.3s ease",
                borderBottom: location.pathname === item.path ? `2px solid var(--primary)` : "none",
                paddingBottom: "3px",
              }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Auth Section */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center", position: "relative" }}>
        {!loggedInUser ? (
          <>
            {/* Not Logged In - Show Signup and Login */}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "transparent",
                  color: "#667eea",
                  border: "2px solid #667eea",
                  padding: "8px 20px",
                  borderRadius: "20px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#667eea";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#667eea";
                }}
              >
                Sign Up
              </motion.button>
            </Link>

            <Link to="/login" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "#667eea",
                  color: "white",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: "20px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#764ba2";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#667eea";
                }}
              >
                Login
              </motion.button>
            </Link>
          </>
        ) : (
          <>
            {/* Logged In - Show Account Dropdown */}
            <div style={{ position: "relative" }}>
              <motion.button
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "20px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                👤 My Account
                <span style={{ fontSize: "1.2rem" }}>{showDropdown ? "▲" : "▼"}</span>
              </motion.button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    background: "var(--card-bg)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: "10px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                    minWidth: "280px",
                    marginTop: "10px",
                    zIndex: 1000,
                  }}
                >
                  {/* User Info */}
                  <div style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
                    <div style={{ textAlign: "center" }}>
                      {loggedInUser.avatar && (
                        <img
                          src={loggedInUser.avatar}
                          alt="avatar"
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            marginBottom: "10px",
                          }}
                        />
                      )}
                      <h3 style={{ margin: "10px 0 5px 0", color: "var(--text)" }}>
                        {loggedInUser.fullName}
                      </h3>
                      <p style={{ margin: "0", color: "var(--muted)", fontSize: "0.9rem" }}>
                        {loggedInUser.email}
                      </p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div style={{ padding: "10px" }}>
                    <motion.button
                      onClick={() => {
                        navigate("/profile");
                        setShowDropdown(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "12px 15px",
                        background: "transparent",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                        borderRadius: "8px",
                        transition: "all 0.3s ease",
                        marginBottom: "5px",
                        fontSize: "0.95rem",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f5f5f5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      📋 My Profile
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        navigate("/orders");
                        setShowDropdown(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "12px 15px",
                        background: "transparent",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                        borderRadius: "8px",
                        transition: "all 0.3s ease",
                        marginBottom: "5px",
                        fontSize: "0.95rem",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f5f5f5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      🛒 My Orders
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        navigate("/settings");
                        setShowDropdown(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "12px 15px",
                        background: "transparent",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                        borderRadius: "8px",
                        transition: "all 0.3s ease",
                        marginBottom: "10px",
                        fontSize: "0.95rem",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f5f5f5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      ⚙️ Settings
                    </motion.button>

                    {/* Logout Button */}
                    <motion.button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        padding: "12px 15px",
                        background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 107, 107, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      🚪 Logout
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </>
        )}
      </div>
    </motion.nav>
  );
}
