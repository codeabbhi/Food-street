import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import pizzaImg from "../assests/pizza.jpg";
import burgerImg from "../assests/foodi.jpg";
import taco from "../assests/taco.jpg";
import biryani from "../assests/biryani.jpg";
import icecream from "../assests/food2.jpg";
import sushi from "../assests/sushi.jpg";
import salad from "../assests/salad.jpg";
import desert from "../assests/food3.jpg";
import coffee from "../assests/coffee.jpg";

export default function Shop() {
  const { shopId } = useParams();

  // Motion variants
  const menuRowVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.08, duration: 0.5 },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.06, transition: { duration: 0.2 } },
    tap: { scale: 0.98 },
  };

  const shopData = {
    "pizza-hub": {
      name: "Pizza Hub",
      tagline: "Cheesy delight in every bite!",
      image: pizzaImg,
      menu: [
        { name: "Margherita Pizza", price: 180 },
        { name: "Farmhouse Pizza", price: 250 },
        { name: "Cheese Burst", price: 300 },
        { name: "Garlic Bread", price: 90 },
      ],
    },
    "burger-point": {
      name: "Burger Point",
      tagline: "Juicy, crispy, and full of flavor!",
      image: burgerImg,
      menu: [
        { name: "Veg Burger", price: 120 },
        { name: "Paneer Burger", price: 150 },
        { name: "Crispy Fries", price: 80 },
        { name: "Chicken Burger", price: 160 },
      ],
    },
    "taco-town": {
      name: "Taco Town",
      tagline: "A fiesta of flavors in every taco!",
      image: taco,
      menu: [
        { name: "Veg Taco", price: 100 },
        { name: "Chicken Taco", price: 150 },
        { name: "Fish Taco", price: 180 },
        { name: "Nachos", price: 120 },
      ],
    },
    "biryani-house": {
      name: "Biryani House",
      tagline: "Fragrant biryanis cooked to perfection.",
      image: biryani,
      menu: [
        { name: "Hyderabadi Biryani", price: 320 },
        { name: "Chicken Biryani", price: 250 },
        { name: "Veg Biryani", price: 200 },
        { name: "Raita", price: 40 },
      ],
    },
    "ice-cream-shop": {
      name: "Ice Cream Shop",
      tagline: "Scoops of happiness for every mood.",
      image: icecream,
      menu: [
        { name: "Vanilla Scoop", price: 80 },
        { name: "Chocolate Scoop", price: 80 },
        { name: "Sundae", price: 150 },
        { name: "Waffle Cone", price: 120 },
      ],
    },
    "sushi-corner": {
      name: "Sushi Corner",
      tagline: "Fresh rolls and delicate flavors.",
      image: sushi,
      menu: [
        { name: "Salmon Roll", price: 300 },
        { name: "Veg Roll", price: 220 },
        { name: "Sashimi", price: 350 },
        { name: "Miso Soup", price: 90 },
      ],
    },
    "salad-bar": {
      name: "Salad Bar",
      tagline: "Fresh, healthy bowls made to order.",
      image: salad,
      menu: [
        { name: "Caesar Salad", price: 180 },
        { name: "Greek Salad", price: 160 },
        { name: "Quinoa Bowl", price: 200 },
        { name: "Green Smoothie", price: 120 },
      ],
    },
    "dessert-delights": {
      name: "Dessert Delights",
      tagline: "Sweet treats to finish your meal.",
      image: desert,
      menu: [
        { name: "Chocolate Lava Cake", price: 150 },
        { name: "Cheesecake", price: 180 },
        { name: "Brownie Sundae", price: 160 },
        { name: "Cupcake", price: 90 },
      ],
    },
    "coffee-corner": {
      name: "Coffee Corner",
      tagline: "Brewed to perfection, sip by sip.",
      image: coffee,
      menu: [
        { name: "Espresso", price: 90 },
        { name: "Cappuccino", price: 130 },
        { name: "Latte", price: 140 },
        { name: "Cold Brew", price: 160 },
      ],
    }
  };

  const shop = shopData[shopId];

  if (!shop) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Shop not found 😢</h2>;
  }

  return (
    <div className="shop-page">
      {/* Fixed Header Image Section */}
      <div
        className="shop-hero"
        style={{ backgroundImage: `url(${shop.image})` }}
      >
        {/* Overlay */}
        <div className="shop-hero-overlay" />

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="shop-hero-content"
        >
          <h1 className="shop-hero-title">{shop.name} 🏪</h1>
          <p className="shop-hero-tagline">{shop.tagline}</p>
        </motion.div>
      </div>

      {/* Content Section */}
      <motion.div className="shop-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h2 style={{ 
          textAlign: "center", 
          fontSize: "2rem", 
          marginBottom: "40px",
          color: "#ff5a5f"
        }}>
          Menu & Prices 📋
        </h2>

        <div className="menu-wrap">
          <table className="menu-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              {shop.menu.map((item, i) => (
                <motion.tr 
                  key={i} 
                  custom={i}
                  variants={menuRowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  className="menu-row"
                >
                  <td className="menu-name">{item.name}</td>
                  <td className="menu-price">{item.price}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Additional Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: "900px",
          margin: "60px auto 100px",
          padding: "40px 20px",
          textAlign: "center",
          background: "white",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ fontSize: "1.5rem", color: "#ff5a5f", marginBottom: "15px" }}>
          🚀 Ready to Order?
        </h3>
        <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "20px" }}>
          Visit our shop today and enjoy the best taste in town!
        </p>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          style={{
            background: "#ff5a5f",
            color: "white",
            padding: "12px 30px",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 4px 15px rgba(255, 90, 95, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "none";
          }}
        >
          Order Now 🍽️
        </motion.button>
      </motion.div>
    </div>
  );
}
