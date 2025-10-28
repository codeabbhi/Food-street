import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ScrollToTop  from "./components/ScrollToTop";
import "./App.css";
import Navbar  from "./components/Navbar";
import ShopDetails from "./pages/ShopDetails";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
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
        <Route path="/shop/:shopId" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop-details/:id" element={<ShopDetails />} />
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;
