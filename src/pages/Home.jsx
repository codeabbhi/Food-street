import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import pizzaImg from "../assests/pizza.jpg";
import burgerImg from "../assests/foodi.jpg";
import taco from "../assests/taco.jpg";
import biryani from "../assests/biryani.jpg";
import icecream from "../assests/food2.jpg";
import sushi from "../assests/sushi.jpg";
import salad from "../assests/salad.jpg";
import desert from "../assests/food3.jpg";
import coffee from "../assests/coffee.jpg";

export default function Home() {
  const shopsRef = useRef(null);

  // Motion variants for page animations
  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const gridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hover: { scale: 1.08, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const shops = [
    { id: 1, name: "Pizza Hub", slug: "pizza-hub", image: pizzaImg },
    { id: 2, name: "Burger Point", slug: "burger-point", image: burgerImg },
    { id: 3, name: "Taco Town", slug: "taco-town", image: taco },
    { id: 4, name: "Biryani House", slug: "biryani-house", image: biryani },
    { id: 5, name: "Ice Cream Shop", slug: "ice-cream-shop", image: icecream },
    { id: 6, name: "Sushi Corner", slug: "sushi-corner", image: sushi },
    { id: 7, name: "Salad Bar", slug: "salad-bar", image: salad },
    { id: 8, name: "Dessert Delights", slug: "dessert-delights", image: desert },
    { id: 9, name: "Coffee Corner", slug: "coffee-corner", image: coffee },
  ];

  const handleExploreClick = () => {
    shopsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-container">
      <section className="hero">
        <motion.div className="hero-content" variants={heroVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }}>
          <h1>Welcome to FoodStreet 🍔</h1>
          <p>Discover the best food spots all in one place — delicious, local, and fresh!</p>
          <motion.button 
            onClick={handleExploreClick}
            className="hero-btn"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
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
          </motion.button>
        </motion.div>
      </section>

      {/* Shop Section */}
      <div ref={shopsRef} className="shops-section">
        <motion.h2 variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 }}>Our Shops</motion.h2>

        <motion.div className="shop-grid" variants={gridVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {shops.map((shop, index) => (
            <Link key={shop.id} to={`/shop/${shop.slug}`} className="shop-card" style={{ textDecoration: "none", color: "inherit" }}>
              <motion.div variants={cardVariants} whileHover={{ scale: 1.03 }} style={{ border: "1px solid #ddd", borderRadius: "10px", width: "250px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", overflow: "hidden", background: "#fff", cursor: "pointer" }}>
                <img src={shop.image} alt={shop.name} className="shop-image" />
                <h3 style={{ margin: "15px 0" }}>{shop.name}</h3>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
