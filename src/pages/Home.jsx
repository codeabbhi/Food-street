import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import streetImg from "../assests/foodi.jpg";
import pizzaImg from "../assests/food2.jpg";
import burgerImg from "../assests/food3.jpg";

export default function Home() {
  const shopsRef = useRef(null);

  const shops = [
    { id: 1, name: "Pizza Hub", slug: "pizza-hub", image: pizzaImg },
    { id: 2, name: "Burger Point", slug: "burger-point", image: burgerImg },
    { id: 3, name: "Taco Town", slug: "taco-town", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" },
  ];

  const handleExploreClick = () => {
    shopsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    
    <div  className="home-conatiner">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to FoodStreet 🍔</h1>
          <p>Discover the best food spots all in one place — delicious, local, and fresh!</p>
          <button 
            onClick={handleExploreClick}
            className="hero-btn"
            style={{
              background: "#ff6347",
              color: "white",
              padding: "12px 25px",
              borderRadius: "30px",
              textDecoration: "none",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) => e.target.style.background = "#e5533d"}
            onMouseLeave={(e) => e.target.style.background = "#ff6347"}
          >
            Explore Shops
          </button>
        </div>
      </section>

      {shops.map((shop, index) => (
        <motion.div
          key={shop.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
        
        </motion.div>
      ))}

      {/* Hero Section */}
      {/* <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: `url(${streetImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textShadow: "2px 2px 10px black",
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>Welcome to FoodStreet 🍕</h1>
        <p style={{ fontSize: "1.5rem" }}>Discover the best food in every corner!</p>
      </motion.div> */}

      {/* Shop Section */}
      <div ref={shopsRef} style={{ padding: "40px", textAlign: "center" }}>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Our Shops
        </motion.h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          {shops.map((shop, index) => (
            <Link
              key={shop.id}
              to={`/shop/${shop.slug}`}
              className="shop-card"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  width: "250px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                <img
                  src={shop.image}
                  alt={shop.name}
                  style={{ width: "100%", height: "280px", objectFit: "cover" }}
                />
                <h3 style={{ margin: "15px 0" }}>{shop.name}</h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
