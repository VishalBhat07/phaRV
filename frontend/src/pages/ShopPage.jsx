// src/pages/ShopPage.jsx
import { useState } from "react";
import { medicines } from "../data/medicines";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartIcon } from "lucide-react";

function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [quantities, setQuantities] = useState({});
  const { addToCart, cart, clearCart } = useCart();
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

  const handleAddToCart = (medicine) => {
    const quantity = quantities[medicine.id] || 1;
    addToCart({ ...medicine, quantity, chosenUnit: medicine.unit });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-6 relative">
      {/* Top Buttons */}
      <div className="flex justify-end gap-3 mb-6">
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-white text-sm transition"
          >
            Clear Cart
          </button>
        )}
        <button
          onClick={() => navigate("/")}
          className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded-lg text-white text-sm transition"
        >
          Home
        </button>
        <Link to="/cart" className="relative">
          <ShoppingCartIcon
            size={30}
            className="text-[#3A6EA5] cursor-pointer"
          />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
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
          <option value="First Aid">First Aid</option>
          <option value="Supplements">Supplements</option>
          <option value="Skin Care">Skin Care</option>
          <option value="Eye Care">Eye Care</option>
          <option value="Nasal Care">Nasal Care</option>
          <option value="General">General</option>
        </select>
      </div>

      {/* Medicines Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="bg-[#1E293B] p-3 rounded-xl shadow-md hover:shadow-lg transition flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-md text-white">{m.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{m.category}</p>
                <p className="mt-1 text-[#3A6EA5] font-semibold text-sm">
                  ₹{m.price}
                </p>
              </div>

              <div
                className={`h-10 w-10 flex items-center justify-center rounded-full text-lg ${getCategoryColor(
                  m.category
                )}`}
              >
                {getCategoryEmoji(m.category)}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm text-gray-300">Qty:</span>
              <input
                type="number"
                min="1"
                value={quantities[m.id] || 1}
                onChange={(e) =>
                  setQuantities({
                    ...quantities,
                    [m.id]: parseInt(e.target.value),
                  })
                }
                className="w-16 text-black px-2 py-1 rounded-md"
              />
              {m.unitSize > 1 ? (
                <span className="text-xs text-gray-400">
                  {m.unit} ({m.unitSize}{" "}
                  {m.unit === "strip" ? "tablets" : m.unit})
                </span>
              ) : (
                <span className="text-xs text-gray-400">{m.unit}</span>
              )}
            </div>

            <button
              onClick={() => handleAddToCart(m)}
              className="mt-3 w-full px-2 py-1.5 bg-[#3A6EA5] text-white rounded-md hover:bg-[#2563EB] transition-colors text-sm cursor-pointer"
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
