// src/pages/LandingPage.jsx
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { isSignedIn } = useUser();
  console.log(user, isSignedIn);

  const handleOrderClick = () => {
    if (isSignedIn) {
      navigate("/shop");
    } else {
      navigate("/sign-in");
    }
  };

  const handleLoginClick = () => {
    if (isSignedIn) {
      navigate("/shop");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0F172A] text-white p-6">
      {/* Logo / Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#3A6EA5] mb-4">
        Welcome to PhaRV
      </h1>
      <p className="text-gray-400 mb-10 text-center max-w-lg">
        Swift, Secure, and Hassle-free medicine delivery platform for RV
        students.
      </p>

      {/* Buttons */}
      <div className="flex gap-6 flex-wrap justify-center">
        <button
          onClick={handleOrderClick}
          className="px-6 py-3 bg-[#3A6EA5] text-white rounded-xl shadow-md hover:bg-[#2563EB] transition"
        >
          Order Medicine
        </button>
        {!isSignedIn && (
          <button
            onClick={handleLoginClick}
            className="px-6 py-3 bg-[#1E293B] text-gray-200 rounded-xl border border-gray-600 hover:bg-[#334155] transition"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
