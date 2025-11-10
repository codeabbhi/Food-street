import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Shops from "./pages/Shops";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ScrollToTop  from "./components/ScrollToTop";
import "./App.css";
import Navbar  from "./components/Navbar";
import ShopDetails from "./pages/ShopDetails";
import Footer from "./components/Footer";
import WelcomeOverlay from "./components/WelcomeOverlay";

function App() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch (e) {
      return "light";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  useEffect(() => {
    try {
      const raw = localStorage.getItem("welcomeOverlay");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.show) {
          setWelcomeName(parsed.name || "");
          setShowWelcome(true);
        }
      }
    } catch (e) {
      // ignore parsing errors
    }
  }, []);

  // listen for show-welcome events (so overlay shows immediately after login in same tab)
  useEffect(() => {
    const handler = (e) => {
      try {
        const name = e?.detail?.name || JSON.parse(localStorage.getItem('welcomeOverlay'))?.name;
        if (name) {
          setWelcomeName(name);
          setShowWelcome(true);
        }
      } catch (err) {
        // ignore
      }
    };
    window.addEventListener('show-welcome', handler);
    return () => window.removeEventListener('show-welcome', handler);
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    try {
      localStorage.removeItem("welcomeOverlay");
    } catch (e) {}
  };
  return (
    <Router>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      {showWelcome && (
        <WelcomeOverlay name={welcomeName} siteName={"FoodStreet"} onClose={handleCloseWelcome} />
      )}
      <ScrollToTop />
      
      <nav
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          padding: "20px",
          background: "#f5f5f5",
        }}
      >
        {/* <Link to="/">Home</Link>
        <Link to="/login">Login</Link> */}
      </nav>
      

      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/shop" element={<Shops />} />
  <Route path="/shop/:shopId" element={<Shop />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop-details/:id" element={<ShopDetails />} />
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;
