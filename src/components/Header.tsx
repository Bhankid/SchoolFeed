import React, { useState } from "react";
import { Search, Bell, User, ChevronDown } from "lucide-react";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-indigo-500 text-white py-4 px-6 flex items-center justify-between shadow-md">
      {/* Greeting Message */}
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold">SchoolFeed</h1>
        <span className="text-sm">Hello, Admin!</span>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
      </div>

      {/* Notifications and Profile */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <Bell className="w-6 h-6 cursor-pointer" />

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <User className="w-8 h-8 bg-gray-700 rounded-full" />
            <ChevronDown className="w-4 h-4" />
          </button>
          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg text-gray-700"
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                Account Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                Change Password
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
