// src/pages/ShopPage.jsx
import { useState } from "react";
import { medicines } from "../data/medicines";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  Home,
  Trash2,
  Plus,
  Minus,
  Package,
} from "lucide-react";

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

  const categories = [
    "All",
    "Pain Relief",
    "Allergy",
    "Cold & Flu",
    "Digestive",
    "First Aid",
    "Supplements",
    "Skin Care",
    "Eye Care",
    "Nasal Care",
    "General",
  ];

  const getCategoryColor = (cat) => {
    switch (cat) {
      case "Pain Relief":
        return "from-red-600 to-red-500";
      case "Allergy":
        return "from-green-600 to-green-500";
      case "Cold & Flu":
        return "from-blue-600 to-blue-500";
      case "Digestive":
        return "from-yellow-500 to-yellow-400";
      case "First Aid":
        return "from-purple-600 to-purple-500";
      case "Supplements":
        return "from-orange-600 to-orange-500";
      case "Skin Care":
        return "from-pink-600 to-pink-500";
      case "Eye Care":
        return "from-cyan-600 to-cyan-500";
      case "Nasal Care":
        return "from-teal-600 to-teal-500";
      default:
        return "from-gray-600 to-gray-500";
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
      case "First Aid":
        return "🩹";
      case "Supplements":
        return "💪";
      case "Skin Care":
        return "✨";
      case "Eye Care":
        return "👁️";
      case "Nasal Care":
        return "👃";
      default:
        return "❔";
    }
  };

  const handleAddToCart = (medicine) => {
    const quantity = quantities[medicine.id] || 1;
    addToCart({ ...medicine, quantity, chosenUnit: medicine.unit });

    // Optional: Show feedback
    const button = document.getElementById(`add-btn-${medicine.id}`);
    if (button) {
      button.textContent = "✓ Added!";
      button.classList.add("!bg-green-600");
      setTimeout(() => {
        button.textContent = "Add to Cart";
        button.classList.remove("!bg-green-600");
      }, 1000);
    }
  };

  const updateQuantity = (id, value) => {
    const newValue = Math.max(1, parseInt(value) || 1);
    setQuantities({ ...quantities, [id]: newValue });
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-[#0F172A]/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3A6EA5] to-[#2563EB] rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#3A6EA5] to-[#2563EB] bg-clip-text text-transparent">
                  phaRV
                </h1>
                <p className="text-xs text-gray-400">Your Health Partner</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/20 transition text-sm font-semibold"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </button>
              )}
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition text-sm font-semibold"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </button>
              <Link
                to="/cart"
                className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3A6EA5] to-[#2563EB] rounded-lg hover:shadow-lg hover:shadow-[#3A6EA5]/50 transition font-semibold"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                      {cart.length}
                    </span>
                    <span className="hidden md:inline text-sm">
                      ₹{cartTotal}
                    </span>
                  </>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-[#3A6EA5] via-[#2563EB] to-[#3A6EA5] bg-clip-text text-transparent">
            Browse Our Medicines
          </h2>
          <p className="text-gray-400 text-lg">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}{" "}
            available
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1E293B]/80 backdrop-blur-sm text-white border border-gray-700 pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3A6EA5] focus:border-transparent transition shadow-lg"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  category === cat
                    ? "bg-gradient-to-r from-[#3A6EA5] to-[#2563EB] text-white shadow-lg scale-105"
                    : "bg-[#1E293B]/80 text-gray-300 hover:bg-[#1E293B] border border-gray-700/50"
                }`}
              >
                {cat === "All" ? "🌟 All" : `${getCategoryEmoji(cat)} ${cat}`}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-[#1E293B] rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((m) => (
              <div
                key={m.id}
                className="group bg-[#1E293B]/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-[#3A6EA5]/20 transition-all duration-300 overflow-hidden border border-gray-700/50 hover:border-[#3A6EA5]/50 flex flex-col"
              >
                {/* Category Badge */}
                <div
                  className={`h-2 bg-gradient-to-r ${getCategoryColor(
                    m.category
                  )}`}
                />

                <div className="p-5 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-white mb-1 group-hover:text-[#3A6EA5] transition">
                        {m.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(
                            m.category
                          )} text-white font-semibold`}
                        >
                          {getCategoryEmoji(m.category)} {m.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold bg-gradient-to-r from-[#3A6EA5] to-[#2563EB] bg-clip-text text-transparent">
                        ₹{m.price}
                      </span>
                      <span className="text-sm text-gray-400">/{m.unit}</span>
                    </div>
                    {m.unitSize > 1 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Contains {m.unitSize}{" "}
                        {m.unit === "strip" ? "tablets" : m.unit}
                      </p>
                    )}
                  </div>

                  {/* Spacer to push quantity and button to bottom */}
                  <div className="flex-1" />

                  {/* Quantity Controls */}
                  <div className="mb-3">
                    <label className="text-sm text-gray-400 mb-2 block">
                      Quantity
                    </label>
                    <div className="flex items-center gap-2 bg-[#0F172A]/50 rounded-lg p-1.5 border border-gray-700">
                      <button
                        onClick={() =>
                          updateQuantity(m.id, (quantities[m.id] || 1) - 1)
                        }
                        className="p-2 hover:bg-[#3A6EA5]/20 rounded-lg transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantities[m.id] || 1}
                        onChange={(e) => updateQuantity(m.id, e.target.value)}
                        className="flex-1 bg-transparent text-white text-center font-semibold focus:outline-none w-16"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(m.id, (quantities[m.id] || 1) + 1)
                        }
                        className="p-2 hover:bg-[#3A6EA5]/20 rounded-lg transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    id={`add-btn-${m.id}`}
                    onClick={() => handleAddToCart(m)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-[#3A6EA5] to-[#2563EB] text-white rounded-xl hover:shadow-lg hover:shadow-[#3A6EA5]/50 transform hover:scale-[1.02] transition-all duration-200 font-bold flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Cart Summary (Mobile) */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 sm:hidden">
          <Link
            to="/cart"
            className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#3A6EA5] to-[#2563EB] rounded-full shadow-2xl shadow-[#3A6EA5]/50 text-white font-bold"
          >
            <ShoppingCart className="w-6 h-6" />
            <div className="text-left">
              <div className="text-xs opacity-90">{cart.length} items</div>
              <div className="text-lg leading-tight">₹{cartTotal}</div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ShopPage;
