import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields!");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);

    // Sign in with Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Get user data from Firestore
        return getDoc(doc(db, "users", user.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();

            // Store logged-in user info in localStorage
            localStorage.setItem(
              "loggedInUser",
              JSON.stringify({
                uid: user.uid,
                fullName: userData.fullName,
                email: userData.email,
                avatar: userData.avatar,
                loginTime: new Date().toISOString(),
              })
            );

            // Notify the app in this window that a user just logged in so UI updates immediately
            try {
              window.dispatchEvent(new CustomEvent('user-logged-in', { detail: { uid: user.uid, fullName: userData.fullName, email: userData.email, avatar: userData.avatar } }));
            } catch (e) {}

            // Set a welcomeOverlay flag so the app can show the fullscreen welcome overlay once
            try {
              localStorage.setItem("welcomeOverlay", JSON.stringify({ show: true, name: userData.fullName }));
              window.dispatchEvent(new CustomEvent('show-welcome', { detail: { name: userData.fullName } }));
            } catch (e) {}

            setLoading(false);
            setEmail("");
            setPassword("");
            navigate("/");
          }
        });
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "auth/user-not-found") {
          setError("Email not found! Please sign up first.");
        } else if (error.code === "auth/wrong-password") {
          setError("Incorrect password! Please try again.");
        } else if (error.code === "auth/invalid-email") {
          setError("Invalid email address!");
        } else {
          setError(error.message || "Login failed! Please try again.");
        }
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          padding: "50px 40px",
          maxWidth: "450px",
          width: "100%",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", margin: "0 0 10px 0" }}>🔐 Login</h1>
          <p style={{ color: "#666", margin: 0 }}>Welcome back to FoodStreet!</p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: "#ffebee",
              color: "#c62828",
              padding: "12px 15px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "0.95rem",
              borderLeft: "4px solid #c62828",
            }}
          >
            {error}
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginBottom: "20px" }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem",
                boxSizing: "border-box",
                transition: "border-color 0.3s ease",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ marginBottom: "30px" }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem",
                boxSizing: "border-box",
                transition: "border-color 0.3s ease",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </motion.div>

          {/* Login Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px 20px",
              background: loading ? "#ccc" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
              }
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "0.95rem",
            color: "#666",
          }}
        >
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#667eea",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Sign up
            </Link>
          </p>
          <p>
            <a href="#" style={{ color: "#667eea", fontWeight: "600", textDecoration: "none" }}>
              Forgot password?
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
