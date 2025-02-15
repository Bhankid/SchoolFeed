import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase"; // Ensure correct path

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Google Auth Provider
  const googleProvider = new GoogleAuthProvider();

  // Handle Sign In with Email and Password
  const handleSignIn = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setLoading(true);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/home"); // Redirect after successful login
  } catch (err: any) {
    const errorCode = err.code;
    switch (errorCode) {
      case "auth/invalid-email":
        setError("Invalid email address. Please try again.");
        break;
      case "auth/wrong-password":
        setError("Incorrect password. Please try again.");
        break;
      case "auth/user-not-found":
        setError("User not found. Please try again.");
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

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home"); // Redirect after successful login
    } catch (err) {
      setError("Google authentication failed. Please try again.");
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

        <form className="space-y-6" onSubmit={handleSignIn}>
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
                placeholder="Enter your password"
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
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-violet-400 hover:underline"
              type="button"
            >
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="mx-4 text-sm text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        {/* Google Sign In Button */}
        <button
          className="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleGoogleSignIn}
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google Logo"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>

        {/* Apple Sign In Button (Unimplemented) */}
        <button className="w-full flex items-center justify-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors mt-3">
          <img
            src="https://www.apple.com/favicon.ico"
            alt="Apple Logo"
            className="w-5 h-5 mr-2"
          />
          Sign in with Apple
        </button>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-violet-400 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
