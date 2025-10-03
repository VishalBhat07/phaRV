// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0F172A] text-white">
      {/* Logo / Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#3A6EA5] mb-4">
        Welcome to PhaRV
      </h1>
      <p className="text-gray-400 mb-10 text-center max-w-lg">
        Swift, Secure and Hassle-free medicine delivery platform for RV
        students.
      </p>

      {/* Buttons */}
      <div className="flex gap-6">
        <Link to="/shop">
          <button className="px-6 py-3 bg-[#3A6EA5] text-white rounded-xl shadow-md hover:bg-[#2563EB] transition">
            Order Medicine
          </button>
        </Link>
        <button className="px-6 py-3 bg-[#1E293B] text-gray-200 rounded-xl border border-gray-600 hover:bg-[#334155] transition">
          Login
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
