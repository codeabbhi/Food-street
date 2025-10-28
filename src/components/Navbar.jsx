import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    setShowDropdown(false);
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
        background: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="logo" style={{ fontSize: "1.6rem", fontWeight: "700", color: "#ff6347" }}>
          🍔 FoodStreet
        </div>
      </Link>

      {/* Navigation Links */}
      <ul className="nav-links" style={{ listStyle: "none", display: "flex", gap: "30px" }}>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              style={{
                textDecoration: "none",
                color: location.pathname === item.path ? "#ff6347" : "#333",
                fontWeight: 500,
                transition: "color 0.3s ease",
                borderBottom: location.pathname === item.path ? "2px solid #ff6347" : "none",
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
                    background: "white",
                    border: "1px solid #ddd",
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
                      <h3 style={{ margin: "10px 0 5px 0", color: "#333" }}>
                        {loggedInUser.fullName}
                      </h3>
                      <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>
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
