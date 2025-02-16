import React, { useState } from "react";
import { Bell, ChevronDown, Menu, X, Sun, Moon } from "lucide-react";
import SearchBar from "./SearchBar";
import ProfileDropdownMenu from "./ProfileDropdownMenu";

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

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);

  // Toggle Profile Dropdown
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsNotificationDropdownOpen(false); // Close notification dropdown if open
  };

  // Toggle Notification Dropdown
  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    setIsProfileDropdownOpen(false); // Close profile dropdown if open
  };

  return (
    <header
      className={`py-4 px-6 flex items-center justify-between shadow-md w-full ${
        darkMode ? "bg-gray-900 text-white" : "bg-purple-600 text-white"
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
        <h1 className="text-xl font-bold">FeedTrack</h1>
        <span className="text-sm hidden sm:inline">Hello, Admin!</span>
      </div>

      {/* Middle Section: Search Bar (Hidden on Mobile) */}
      <SearchBar darkMode={darkMode} />
      
      {/* Right Section: Notifications, Dark Mode Toggle & Profile */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleNotificationDropdown}
            className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <Bell className="w-6 h-6 cursor-pointer hover:text-gray-300 transition-colors duration-200" />
          </button>
          {/* Notification Dropdown Menu */}
          <div
            className={`absolute right-0 mt-4 w-64 z-50 ${
              darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-700"
            } bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ${
              isNotificationDropdownOpen
                ? "translate-y-2 scale-100 opacity-100"
                : "translate-y-0 scale-95 opacity-0 pointer-events-none"
            }`}
          >
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-medium">Notifications</h3>
            </div>
            {/* Notification Content with Scroll Fix */}
            <div
              className="max-h-64 overflow-y-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: darkMode
                  ? "#4B5563 #1F2937"
                  : "#D1D5DB #FFFFFF",
              }}
            >
              {/* Notification Item */}
              <div
                className={`px-4 py-3 hover:bg-${
                  darkMode ? "gray-700" : "indigo-50"
                } transition-colors duration-200 cursor-pointer`}
              >
                <p className="text-sm">
                  <strong>Kofi Owusu</strong> made a recent deposit of ₵50.00
                </p>
                <small className="text-xs text-gray-500">Just now</small>
              </div>
              {/* Notification Item */}
              <div
                className={`px-4 py-3 hover:bg-${
                  darkMode ? "gray-700" : "indigo-50"
                } transition-colors duration-200 cursor-pointer`}
              >
                <p className="text-sm">
                  <strong>Akua Mensah</strong> has a low balance of -₵30.00
                </p>
                <small className="text-xs text-gray-500">10 minutes ago</small>
              </div>
              {/* Notification Item */}
              <div
                className={`px-4 py-3 hover:bg-${
                  darkMode ? "gray-700" : "indigo-50"
                } transition-colors duration-200 cursor-pointer`}
              >
                <p className="text-sm">
                  <strong>Yaa Asantewaa</strong> has not paid the feeding fee
                </p>
                <small className="text-xs text-gray-500">1 hour ago</small>
              </div>
              {/* Add more notifications here if needed */}
            </div>
          </div>
        </div>

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
            onClick={toggleProfileDropdown}
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
                transform: isProfileDropdownOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            />
          </button>
          {/* Profile Dropdown Menu */}
           <ProfileDropdownMenu
            isProfileDropdownOpen={isProfileDropdownOpen}
            darkMode={darkMode}
           toggleProfileDropdown={toggleProfileDropdown}
      />
          {/* <div
            className={`absolute right-0 mt-4 w-52 z-50 ${
              darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-700"
            } bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ${
              isProfileDropdownOpen
                ? "translate-y-2 scale-100 opacity-100"
                : "translate-y-0 scale-95 opacity-0 pointer-events-none"
            }`}
          >
            <a
              href="#"
              className={`block px-4 py-3 ${
                darkMode
                  ? "hover:bg-gray-700"
                  : "hover:bg-indigo-50 text-gray-700"
              } transition-colors`}
            >
              Account Settings
            </a>
            <a
              href="#"
              className={`block px-4 py-3 ${
                darkMode
                  ? "hover:bg-gray-700"
                  : "hover:bg-indigo-50 text-gray-700"
              } transition-colors`}
            >
              Change Password
            </a>
            <a
              href="/logout"
              className={`block px-4 py-3 ${
                darkMode
                  ? "text-red-400 hover:bg-red-800"
                  : "text-red-600 hover:bg-red-50"
              } transition-colors`}
            >
              Logout
            </a>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
