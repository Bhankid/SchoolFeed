import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

function Login() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold">
            <span className="text-indigo-500">School</span>Feed
          </h1>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
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

          <div className="text-right">
            <a
              href="#"
              className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">
            OR
          </span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Sign in with Google
          </button>
          <button className="w-full flex items-center justify-center bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors">
            Sign in with Apple
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
