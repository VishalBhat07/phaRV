// src/pages/ShopPage.jsx
import { useState } from "react";
import { medicines } from "../data/medicines";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { addToCart, cart, clearCart } = useCart(); // Added clearCart
  const navigate = useNavigate();

  const filtered = medicines.filter(
    (m) =>
      (category === "All" || m.category === category) &&
      m.name.toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryColor = (cat) => {
    switch (cat) {
      case "Pain Relief":
        return "bg-red-600";
      case "Allergy":
        return "bg-green-600";
      case "Cold & Flu":
        return "bg-blue-600";
      case "Digestive":
        return "bg-yellow-400 text-black";
      default:
        return "bg-gray-600";
    }
  };

  const getCategoryEmoji = (cat) => {
    switch (cat) {
      case "Pain Relief":
        return "💊";
      case "Allergy":
        return "🤧";
      case "Cold & Flu":
        return "🌡️";
      case "Digestive":
        return "🥗";
      default:
        return "❔";
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-6 relative">
      {/* Cart Badge */}
      <div className="absolute top-6 right-6 flex gap-4 items-center">
        <Link to="/cart">
          <div className="relative">
            <span className="material-icons text-3xl text-[#3A6EA5] cursor-pointer">
              shopping_cart
            </span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </div>
        </Link>

        {/* Clear Cart Button */}
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-white text-sm transition"
          >
            Clear Cart
          </button>
        )}

        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded-lg text-white text-sm transition"
        >
          Home
        </button>
      </div>

      {/* Header */}
      <h2 className="text-3xl font-extrabold text-[#3A6EA5] mb-6 text-center">
        🛒 Shop Medicines
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 bg-[#1E293B] text-white border border-gray-600 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3A6EA5]"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-1/4 bg-[#1E293B] text-white border border-gray-600 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3A6EA5]"
        >
          <option value="All">All</option>
          <option value="Pain Relief">Pain Relief</option>
          <option value="Allergy">Allergy</option>
          <option value="Cold & Flu">Cold & Flu</option>
          <option value="Digestive">Digestive</option>
        </select>
      </div>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="bg-[#1E293B] p-4 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 flex flex-col"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg text-white">{m.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{m.category}</p>
                <p className="mt-1 text-[#3A6EA5] font-bold">₹{m.price}</p>
              </div>

              {/* Emoji/Icon */}
              <div
                className={`h-12 w-12 flex items-center justify-center rounded-full text-xl ${getCategoryColor(
                  m.category
                )}`}
              >
                {getCategoryEmoji(m.category)}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(m)}
              className="mt-3 w-full px-3 py-2 bg-[#3A6EA5] text-white rounded-lg hover:bg-[#2563EB] transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopPage;
