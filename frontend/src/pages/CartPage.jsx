// src/pages/CartPage.jsx
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";

function CartPage() {
  const { cart, clearCart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const { user } = useUser();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 500 ? 0 : subtotal * 0.05;
  const total = subtotal + deliveryFee - discount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(subtotal * 0.1);
      alert("Promo code applied! 10% discount");
    } else if (promoCode.toUpperCase() === "FIRST50") {
      setDiscount(50);
      alert("Promo code applied! ₹50 off");
    } else {
      alert("Invalid promo code");
    }
  };

  const handlePlaceOrder = () => {
    if (!phone) return alert("Please enter your phone number");
    if (!address) return alert("Please enter your delivery address");

    const orderDetails = {
      items: cart,
      user: {
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
        phone,
        address,
      },
      deliveryNote,
      subtotal,
      deliveryFee,
      discount,
      total,
      timestamp: new Date().toISOString(),
    };

    console.log("Order placed:", orderDetails);
    alert("Order Placed Successfully! We'll contact you soon.");
    clearCart();
    navigate("/shop");
  };

  if (cart.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white flex flex-col items-center justify-center p-6">
        <div className="bg-[#1E293B]/50 backdrop-blur-sm p-12 rounded-2xl border border-gray-700/50 shadow-2xl max-w-md w-full text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-[#3A6EA5]/20 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-[#3A6EA5]" />
          </div>
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-[#3A6EA5] to-[#2563EB] bg-clip-text text-transparent">
            Your Cart is Empty
          </h2>
          <p className="text-gray-400 mb-8">
            Start adding items to your cart and they'll appear here
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="px-8 py-4 bg-gradient-to-r from-[#3A6EA5] to-[#2563EB] text-white rounded-xl hover:shadow-lg hover:shadow-[#3A6EA5]/50 transform hover:scale-105 transition-all duration-200 font-semibold flex items-center gap-2 mx-auto"
          >
            <ShoppingBag className="w-5 h-5" />
            Start Shopping
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Shop
        </button>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#3A6EA5] to-[#2563EB] bg-clip-text text-transparent">
            Checkout
          </h2>
          <div className="bg-[#3A6EA5]/20 px-4 py-2 rounded-lg border border-[#3A6EA5]/50">
            <span className="text-sm text-gray-400">Items: </span>
            <span className="text-xl font-bold text-[#3A6EA5]">
              {cart.length}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto lg:items-start">
        {/* Left Column: Cart Items */}
        <div className="flex-1 lg:flex-[2] space-y-4">
          <div className="bg-[#1E293B]/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-xl">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-[#3A6EA5]" />
              Your Items
            </h3>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0F172A]/50 p-4 rounded-xl border border-gray-700/50 hover:border-[#3A6EA5]/50 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-400 mb-2">
                        {item.unitSize > 1
                          ? `${item.unit} (${item.unitSize})`
                          : item.unit}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-[#3A6EA5] font-bold text-lg">
                          ₹{item.price}
                        </span>
                        <div className="flex items-center gap-2 bg-[#1E293B] rounded-lg p-1">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="p-1.5 hover:bg-[#3A6EA5]/20 rounded transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1.5 hover:bg-[#3A6EA5]/20 rounded transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xl font-bold text-[#3A6EA5]">
                        ₹{item.price * item.quantity}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className="mt-6 w-full px-6 py-3 bg-red-500/10 text-red-400 border border-red-500/50 rounded-xl hover:bg-red-500/20 transition font-semibold flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Clear Cart
            </button>
          </div>
        </div>

        {/* Right Column: Details & Summary - Sticky on desktop */}
        <div className="flex-1 lg:sticky lg:top-6 space-y-6 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-2 scrollbar-thin scrollbar-thumb-[#3A6EA5] scrollbar-track-transparent">
          {/* User Details */}
          <div className="bg-[#1E293B]/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-[#3A6EA5]">
              Delivery Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-1">Name</label>
                <input
                  type="text"
                  value={user?.fullName || ""}
                  readOnly
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0F172A]/50 text-white border border-gray-700 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.emailAddresses[0]?.emailAddress || ""}
                  readOnly
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0F172A]/50 text-white border border-gray-700 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0F172A]/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6EA5] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">
                  Delivery Address <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your complete address"
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0F172A]/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6EA5] focus:border-transparent transition resize-none"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">
                  Delivery Note (Optional)
                </label>
                <input
                  type="text"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="Any special instructions?"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0F172A]/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6EA5] focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          {/* Promo Code */}
          <div className="bg-[#1E293B]/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-[#3A6EA5]">
              Promo Code
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 px-4 py-2.5 rounded-lg bg-[#0F172A]/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A6EA5] focus:border-transparent transition"
              />
              <button
                onClick={handleApplyPromo}
                className="px-6 py-2.5 bg-[#3A6EA5] text-white rounded-lg hover:bg-[#2563EB] transition font-semibold"
              >
                Apply
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Try: SAVE10 or FIRST50</p>
          </div>

          {/* Order Summary */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-6 rounded-2xl border border-[#3A6EA5]/50 shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-[#3A6EA5]">
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Delivery Fee</span>
                <span className={deliveryFee === 0 ? "text-green-400" : ""}>
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              {subtotal <= 500 && (
                <p className="text-xs text-gray-500">
                  Add ₹{500 - subtotal} more for free delivery!
                </p>
              )}
              <div className="border-t border-gray-700 pt-3 mt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-[#3A6EA5]">Total</span>
                  <span className="text-[#3A6EA5]">₹{total}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-600/50 transform hover:scale-[1.02] transition-all duration-200 font-bold text-lg"
            >
              Place Order - ₹{total}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
