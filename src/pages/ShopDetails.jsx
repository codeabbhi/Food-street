import { useParams, Link } from "react-router-dom";

export default function ShopDetails() {
  const { id } = useParams();

  // 🔸 Temporary shop data
  const shopData = {
    1: {
      name: "Burger Hub",
      desc: "Serving juicy burgers, crispy fries, and refreshing shakes.",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      menu: ["Cheese Burger", "Chicken Burger", "French Fries", "Milkshake"],
    },
    2: {
      name: "Pizza Palace",
      desc: "Authentic pizzas with fresh toppings baked in a stone oven.",
      image: "https://images.unsplash.com/photo-1601924582971-6b6c5b5d5a3d",
      menu: ["Margherita", "Pepperoni", "Veggie Supreme", "Garlic Bread"],
    },
    3: {
      name: "Taco Town",
      desc: "Delicious tacos and Mexican delicacies made fresh daily.",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      menu: ["Chicken Tacos", "Veggie Burrito", "Nachos", "Quesadilla"],
    },
  };

  const shop = shopData[id];

  if (!shop) return <h2>Shop not found</h2>;

  return (
    <div className="shop-details">
      <img src={shop.image} alt={shop.name} className="shop-banner" />
      <h1>{shop.name}</h1>
      <p>{shop.desc}</p>

      <h2>Menu</h2>
      <ul>
        {shop.menu.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <Link to="/shop" className="back-btn">← Back to Shops</Link>
    </div>
  );
}
