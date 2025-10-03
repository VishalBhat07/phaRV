// src/pages/SignInPage.jsx
import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] p-6">
      <SignIn />
    </div>
  );
}
