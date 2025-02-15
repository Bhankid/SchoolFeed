import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.ts";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleSignUp = async (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    navigate("/login"); // Redirect to login page after successful sign up
  } catch (err: any) {
    const errorCode = err.code;
    switch (errorCode) {
      case "auth/email-already-in-use":
        setError("Email address is already in use. Please try again.");
        break;
      case "auth/invalid-email":
        setError("Invalid email address. Please try again.");
        break;
      case "auth/weak-password":
        setError("Password is too weak. Please try again.");
        break;
      case "auth/network-request-failed":
        setError("Network error. Please try again.");
        break;
      default:
        setError("An error occurred. Please try again.");
    }
    setLoading(false);
  }
};

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 transition-colors duration-300 
      bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-gray-200"
    >
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-800">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold">
            <span className="text-indigo-400">Feed</span>Track
          </h1>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form className="space-y-6" onSubmit={handleSignUp}>
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-800 text-white border-gray-700"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-800 text-white border-gray-700"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-800 text-white border-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-violet-400 hover:underline">
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
