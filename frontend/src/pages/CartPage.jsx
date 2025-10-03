// src/pages/CartPage.jsx
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map((item, idx) => (
              <li key={idx} className="border-b py-2">
                {item.name} - ₹{item.price}
              </li>
            ))}
          </ul>
          <p className="font-semibold mb-4">Total: ₹{total}</p>

          <div className="flex gap-4">
            <button
              onClick={() => {
                clearCart();
                navigate("/shop");
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                clearCart();
                alert("Order Placed Successfully!");
                navigate("/");
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Place Order
            </button>
          </div>
        </>
      )}

      <div className="mt-6">
        <Link to="/shop">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-lg">
            Back to Shop
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
