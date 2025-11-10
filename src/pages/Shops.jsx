import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import pizzaImg from "../assests/pizza.jpg";
import burgerImg from "../assests/foodi.jpg";
import taco from "../assests/taco.jpg";
import biryani from "../assests/biryani.jpg";
import icecream from "../assests/food2.jpg";
import sushi from "../assests/sushi.jpg";
import salad from "../assests/salad.jpg";
import desert from "../assests/food3.jpg";
import coffee from "../assests/coffee.jpg";

export default function Shops() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("fs_favorites");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("fs_favorites", JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  function toggleFavorite(id) {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }
  const gridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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

  const filtered = useMemo(() => {
    let list = shops.filter((s) => s.name.toLowerCase().includes(query.trim().toLowerCase()));
    if (sort === "asc") list = list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "desc") list = list.sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [shops, query, sort]);

  return (
    <div className="shops-section">
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center" }}>
        Our Shops
      </motion.h2>

      <div style={{ display: "flex", justifyContent: "center", gap: 12, margin: "18px 0 24px" }}>
        <input
          aria-label="Search shops"
          placeholder="Search shops..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", width: 240 }}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}>
          <option value="default">Sort</option>
          <option value="asc">Name A → Z</option>
          <option value="desc">Name Z → A</option>
        </select>
      </div>

      <motion.div className="shop-grid" variants={gridVariants} initial="hidden" animate="visible">
        {filtered.map((shop, index) => (
          <div key={shop.id} className="shop-card" style={{ textDecoration: "none", color: "inherit", position: "relative" }}>
            <button
              aria-label={favorites.includes(shop.id) ? "Unfavorite" : "Favorite"}
              onClick={() => toggleFavorite(shop.id)}
              style={{ position: "absolute", top: 10, right: 10, zIndex: 3, background: "transparent", border: "none", cursor: "pointer", fontSize: 20 }}
              title={favorites.includes(shop.id) ? "Unfavorite" : "Favorite"}
            >
              {favorites.includes(shop.id) ? "💖" : "🤍"}
            </button>

            <Link to={`/shop/${shop.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <motion.div variants={cardVariants} whileHover={{ scale: 1.03 }} style={{ border: "1px solid #ddd", borderRadius: "10px", width: "100%", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", overflow: "hidden", background: "#fff", cursor: "pointer" }}>
                <img src={shop.image} alt={shop.name} className="shop-image" loading="lazy" />
                <h3 style={{ margin: "15px 0", textAlign: "center" }}>{shop.name}</h3>
              </motion.div>
            </Link>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
