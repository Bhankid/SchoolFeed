import React, { useState, useEffect } from "react";
import {
  Users,
  CreditCard,
  Calendar,
  Bell,
  Home,
  LogOut,
  Menu,
  X,
  Search,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/Dashboard";
import Students from "./components/Students";
import Payments from "./components/Payments";
import Attendance from "./components/Attendance";
import Alerts from "./components/Alerts";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen"; // Import the LoadingScreen component

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "dashboard";
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  const [isLoading, setIsLoading] = useState(true); // State for loading screen

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [activeTab, darkMode]);

  const tabs = [
    { id: "dashboard", name: "Dashboard", icon: Home },
    { id: "students", name: "Students", icon: Users },
    { id: "payments", name: "Payments", icon: CreditCard },
    { id: "attendance", name: "Attendance", icon: Calendar },
    { id: "alerts", name: "Alerts", icon: Bell },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard darkMode={darkMode} />;
      case "students":
        return <Students />;
      case "payments":
        return <Payments />;
      case "attendance":
        return <Attendance />;
      case "alerts":
        return <Alerts />;
      default:
        return <Dashboard darkMode={darkMode} />;
    }
  };

  // Handle loading completion
  const handleLoaded = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoaded={handleLoaded} />;
  }

  return (
    <div
      className={`flex flex-col h-screen ${
        darkMode ? "bg-gray-950" : "bg-gray-100"
      } transition-colors duration-200`}
    >
      {/* Header */}
      <header
        className={`${
          darkMode ? "bg-gray-900" : "bg-indigo-500"
        } text-white py-4 px-6 flex items-center justify-between shadow-md w-full`}
      >
        {/* Left Section: Sidebar Toggle & Greeting */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden focus:outline-none"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <h1 className="text-xl font-bold">SchoolFeed</h1>
          <span className="text-sm hidden sm:inline">Hello, Admin!</span>
        </div>
        {/* Middle Section: Search Bar (Hidden on Mobile) */}
        <div className="relative w-full max-w-md hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              darkMode
                ? "focus:ring-indigo-500 bg-gray-800 text-gray-300"
                : "focus:ring-indigo-500 bg-white text-gray-700"
            }`}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        {/* Right Section: Notifications & Profile */}
        <div className="flex items-center space-x-4">
          <Bell className="w-6 h-6 cursor-pointer" />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              {/* Profile Image */}
              <img
                src="/self.jpg"
                alt="Profile Photo"
                className="w-8 h-8 rounded-full object-cover border border-white"
                onError={(e) => (e.currentTarget.src = "/default-avatar.jpg")}
              />
              <ChevronDown className="w-4 h-4" />
            </button>
            {isDropdownOpen && (
              <div
                className={`absolute z-50 right-0 mt-2 py-2 w-48 ${
                  darkMode ? "bg-gray-900" : "bg-white"
                } rounded-md shadow-lg text-gray-900 dark:text-gray-100`}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <a
                  href="#"
                  className={`block px-4 py-2 ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-400"
                  }`}
                >
                  Account Settings
                </a>
                <a
                  href="#"
                  className={`block px-4 py-2 ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-400"
                  }`}
                >
                  Change Password
                </a>
                <a
                  href="#"
                  className={`block px-4 py-2 ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-400"
                  }`}
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar with Mobile Toggle */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${
            isSidebarOpen ? "block" : "hidden"
          } lg:hidden`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        <div
          className={`fixed lg:relative z-50 lg:z-auto top-0 left-0 h-full w-64 ${
            darkMode ? "bg-gray-900" : "bg-white"
          } shadow-lg transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          {/* Sidebar Header */}
          <div className="p-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                <span
                  className={`${darkMode ? "text-gray-300" : "text-gray-800"}`}
                >
                  School
                </span>
                <span
                  className={`${
                    darkMode ? "text-indigo-500" : "text-indigo-600"
                  }`}
                >
                  Feed
                </span>
              </h1>
              <p className="text-sm">
                <span
                  className={`${
                    darkMode ? "text-indigo-500" : "text-indigo-600"
                  }`}
                >
                  Feeding Fee{" "}
                </span>
                <span
                  className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Management
                </span>
              </p>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {/* Navigation */}
          <nav className="mt-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center px-6 py-4 ${
                  darkMode
                    ? "text-gray-300 hover:bg-gray-800 hover:text-indigo-500"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                } transition-colors ${
                  activeTab === tab.id
                    ? darkMode
                      ? "bg-gray-800 text-indigo-500"
                      : "bg-indigo-50 text-indigo-600"
                    : ""
                }`}
              >
                <tab.icon className="w-5 h-5 mr-3" />
                {tab.name}
              </button>
            ))}
            <button
              className={`w-full flex items-center px-6 py-4 ${
                darkMode
                  ? "text-red-500 hover:bg-gray-800"
                  : "text-red-600 hover:bg-red-50"
              } transition-colors mt-auto`}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </nav>
        </div>
        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">{renderContent()}</div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
      {/* Toaster for notifications */}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
