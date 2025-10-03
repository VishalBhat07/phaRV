// src/pages/LandingPage.jsx
import { useNavigate } from "react-router-dom";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import {
  Package,
  ShoppingBag,
  Clock,
  Shield,
  Truck,
  Heart,
  ArrowRight,
  Pill,
  Sparkles,
  LogOut,
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();

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

  const features = [
    {
      icon: Clock,
      title: "Quick Delivery",
      description: "Get your medicines delivered fast within the campus",
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "Your health data and payments are completely safe",
    },
    {
      icon: Truck,
      title: "Campus Wide",
      description: "We deliver to all RV hostels and departments",
    },
    {
      icon: Heart,
      title: "Student Care",
      description: "Special discounts and care for RV students",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#3A6EA5]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#3A6EA5]/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#3A6EA5] to-[#2563EB] rounded-xl flex items-center justify-center transform rotate-12 shadow-lg shadow-[#3A6EA5]/50">
              <Pill className="w-7 h-7 -rotate-12" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3A6EA5] to-[#2563EB] bg-clip-text text-transparent">
                PhaRV
              </h1>
              <p className="text-xs text-gray-400">Health at your doorstep</p>
            </div>
          </div>

          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 hidden sm:inline">
                Hi, {user?.firstName || "Student"}!
              </span>
              <button
                onClick={handleOrderClick}
                className="px-6 py-2.5 bg-gradient-to-r from-[#3A6EA5] to-[#2563EB] rounded-lg hover:shadow-lg hover:shadow-[#3A6EA5]/50 transition font-semibold"
              >
                Shop Now
              </button>
              <SignOutButton>
                <button className="px-4 py-2.5 bg-red-500/10 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/20 transition font-semibold flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </SignOutButton>
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="px-6 py-2.5 bg-[#1E293B] border border-gray-700 rounded-lg hover:bg-[#334155] transition font-semibold"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3A6EA5]/20 border border-[#3A6EA5]/50 rounded-full mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#3A6EA5]" />
            <span className="text-sm font-semibold text-[#3A6EA5]">
              Trusted by 1000+ RV Students
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Your Campus
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#3A6EA5] via-[#2563EB] to-[#3A6EA5] bg-clip-text text-transparent">
              Medicine Partner
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Swift, secure, and hassle-free medicine delivery platform
            exclusively for RV students
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={handleOrderClick}
              className="group px-8 py-4 bg-gradient-to-r from-[#3A6EA5] to-[#2563EB] text-white rounded-xl shadow-xl shadow-[#3A6EA5]/30 hover:shadow-2xl hover:shadow-[#3A6EA5]/50 transform hover:scale-105 transition-all duration-200 font-bold text-lg flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <ShoppingBag className="w-6 h-6" />
              Order Medicine Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {!isSignedIn && (
              <button
                onClick={handleLoginClick}
                className="px-8 py-4 bg-[#1E293B]/80 backdrop-blur-sm border-2 border-gray-700 text-gray-200 rounded-xl hover:bg-[#334155] hover:border-[#3A6EA5]/50 transition-all duration-200 font-bold text-lg w-full sm:w-auto"
              >
                Get Started Free
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-20">
            <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#3A6EA5] to-[#2563EB] bg-clip-text text-transparent mb-2">
                500+
              </div>
              <div className="text-sm text-gray-400">Medicines</div>
            </div>
            <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#3A6EA5] to-[#2563EB] bg-clip-text text-transparent mb-2">
                &lt;30min
              </div>
              <div className="text-sm text-gray-400">Delivery</div>
            </div>
            <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#3A6EA5] to-[#2563EB] bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-sm text-gray-400">Available</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#3A6EA5] to-[#2563EB] bg-clip-text text-transparent">
              PhaRV
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            We're built specifically for RV students, understanding your unique
            needs and campus life
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-[#1E293B]/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-[#3A6EA5]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#3A6EA5]/20 transform hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#3A6EA5]/20 to-[#2563EB]/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-[#3A6EA5]" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#3A6EA5] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="max-w-4xl mx-auto mt-20 bg-gradient-to-r from-[#1E293B] to-[#0F172A] p-8 md:p-12 rounded-3xl border border-[#3A6EA5]/30 shadow-2xl shadow-[#3A6EA5]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#3A6EA5]/10 rounded-full blur-3xl" />
          <div className="relative z-10 text-center">
            <Package className="w-16 h-16 mx-auto mb-6 text-[#3A6EA5]" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to get your medicines?
            </h2>
            <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
              Join hundreds of RV students who trust PhaRV for their healthcare
              needs
            </p>
            <button
              onClick={handleOrderClick}
              className="px-8 py-4 bg-gradient-to-r from-[#3A6EA5] to-[#2563EB] text-white rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#3A6EA5]/50 transform hover:scale-105 transition-all duration-200 font-bold text-lg inline-flex items-center gap-3"
            >
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-6 py-8 mt-20 border-t border-gray-700/50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3A6EA5] to-[#2563EB] rounded-lg flex items-center justify-center transform rotate-12">
              <Pill className="w-6 h-6 -rotate-12" />
            </div>
            <div>
              <p className="text-sm font-semibold">PhaRV</p>
              <p className="text-xs text-gray-500">Campus Medicine Delivery</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Made with <Heart className="w-4 h-4 inline text-red-500" /> for RV
            Students
          </p>
        </div>
      </footer>
    </div>
  );
}
