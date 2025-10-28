import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import pizzaImg from "../assests/food2.jpg";
import burgerImg from "../assests/food3.jpg";
// import streetImg from "../assests/foodi.jpg";

export default function Shop() {
  const { shopId } = useParams();

  const shopData = {
    "pizza-hub": {
      name: "Pizza Hub",
      tagline: "Cheesy delight in every bite!",
      image: pizzaImg,
      menu: [
        { name: "Margherita Pizza", price: 180 },
        { name: "Farmhouse Pizza", price: 250 },
        { name: "Cheese Burst", price: 300 },
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
      ],
    },
    "taco-town": {
      name: "Taco Town",
      tagline: "A fiesta of flavors in every taco!",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      menu: [
        { name: "Veg Taco", price: 100 },
        { name: "Chicken Taco", price: 150 },
        { name: "Fish Taco", price: 180 },
      ],
    }
  };

  const shop = shopData[shopId];

  if (!shop) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Shop not found 😢</h2>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9" }}>
      {/* Fixed Header Image Section */}
      <div
        style={{
          backgroundImage: `url(${shop.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
          position: "relative",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.4)",
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <h1 style={{ fontSize: "3.5rem", margin: "10px 0", fontWeight: "bold" }}>
            {shop.name} 🏪
          </h1>
          <p style={{ fontSize: "1.3rem", marginTop: "10px" }}>{shop.tagline}</p>
        </motion.div>
      </div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: "900px",
          margin: "60px auto",
          padding: "40px 20px",
          background: "white",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ 
          textAlign: "center", 
          fontSize: "2rem", 
          marginBottom: "40px",
          color: "#ff5a5f"
        }}>
          Menu & Prices 📋
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "1.1rem",
            }}
          >
            <thead>
              <tr style={{ background: "#ff5a5f", color: "white" }}>
                <th style={{ 
                  padding: "15px", 
                  textAlign: "left",
                  fontWeight: "bold"
                }}>
                  Item
                </th>
                <th style={{ 
                  padding: "15px", 
                  textAlign: "right",
                  fontWeight: "bold"
                }}>
                  Price (₹)
                </th>
              </tr>
            </thead>
            <tbody>
              {shop.menu.map((item, i) => (
                <motion.tr 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    borderBottom: "1px solid #eee",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <td style={{ padding: "15px", textAlign: "left" }}>{item.name}</td>
                  <td style={{ 
                    padding: "15px", 
                    textAlign: "right",
                    fontWeight: "bold",
                    color: "#ff5a5f"
                  }}>
                    {item.price}
                  </td>
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
        <button
          style={{
            background: "#ff5a5f",
            color: "white",
            padding: "12px 30px",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 4px 15px rgba(255, 90, 95, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "none";
          }}
        >
          Order Now 🍽️
        </button>
      </motion.div>
    </div>
  );
}
