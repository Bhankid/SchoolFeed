import React, { useState } from "react";
import { Search, Bell, ChevronDown, Menu, X, Sun, Moon } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  isSidebarOpen,
  darkMode,
  toggleDarkMode,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header
      className={`py-4 px-6 flex items-center justify-between shadow-md w-full ${
        darkMode ? "bg-gray-900 text-white" : "bg-indigo-500 text-white"
      }`}
    >
      {/* Left Section: Sidebar Toggle & Greeting */}
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden focus:outline-none"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        {/* Greeting */}
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
              ? "bg-gray-800 text-gray-300 focus:ring-indigo-500"
              : "bg-white text-gray-700 focus:ring-indigo-500"
          } shadow-sm`}
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
      </div>

      {/* Right Section: Notifications, Dark Mode Toggle & Profile */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <Bell className="w-6 h-6 cursor-pointer hover:text-gray-300 transition-colors duration-200" />

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 cursor-pointer focus:outline-none"
          >
            {/* Profile Image */}
            <img
              src="/self.jpg"
              alt="Profile Photo"
              className="w-9 h-9 rounded-full object-cover border-2 border-white transition-all duration-200"
              onError={(e) => (e.currentTarget.src = "/default-avatar.jpg")}
            />
            <ChevronDown
              className="w-4 h-4 transition-transform duration-300 ease-in-out"
              style={{
                transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {/* Dropdown Menu with Animation */}
          <div
            className={`absolute right-0 mt-4 w-52 z-50 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ${
              isDropdownOpen
                ? "translate-y-2 scale-100 opacity-100"
                : "translate-y-0 scale-95 opacity-0 pointer-events-none"
            }`}
          >
            <a
              href="#"
              className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors"
            >
              Account Settings
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors"
            >
              Change Password
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
