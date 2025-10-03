import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-8 flex flex-col items-center">
      <h2 className="text-3xl font-extrabold mb-6 text-[#3A6EA5] text-center">
        🛒 Your Cart
      </h2>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center gap-4 mt-10">
          <p className="text-gray-400 text-center text-lg">
            Your cart is empty
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-3 bg-[#3A6EA5] text-white rounded-xl hover:bg-[#2563EB] cursor-pointer transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="w-full max-w-5xl">
          <div className="bg-[#1E293B] rounded-2xl shadow-lg overflow-x-auto p-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="px-6 py-3 text-gray-400">Name</th>
                  <th className="px-6 py-3 text-gray-400">Unit</th>
                  <th className="px-6 py-3 text-gray-400">Price</th>
                  <th className="px-6 py-3 text-gray-400">Quantity</th>
                  <th className="px-6 py-3 text-gray-400">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-700 hover:bg-[#334155] transition"
                  >
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">
                      {item.chosenUnit === "single"
                        ? "single"
                        : item.chosenUnit}
                    </td>
                    <td className="px-6 py-4">₹{item.price}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4 text-[#3A6EA5] font-semibold">
                      ₹{item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
              <p className="font-bold text-xl text-white">Total: ₹{total}</p>
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 cursor-pointer transition"
              >
                Clear Cart
              </button>
            </div>

            <div className="flex gap-4 flex-wrap justify-center mt-6">
              <button
                onClick={() => navigate("/shop")}
                className="px-6 py-3 bg-[#3A6EA5] text-white rounded-xl hover:bg-[#2563EB] cursor-pointer transition"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  clearCart();
                  alert("Order Placed Successfully!");
                  navigate("/");
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 cursor-pointer transition"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
