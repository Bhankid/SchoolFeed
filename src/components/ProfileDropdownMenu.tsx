import React from "react";

interface ProfileDropdownMenuProps {
  isProfileDropdownOpen: boolean;
  darkMode: boolean;
  toggleProfileDropdown: () => void;
}

const ProfileDropdownMenu: React.FC<ProfileDropdownMenuProps> = ({
  isProfileDropdownOpen,
  darkMode,
  toggleProfileDropdown,
}) => {
  return (
    <div
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
          darkMode ? "hover:bg-gray-700" : "hover:bg-indigo-50 text-gray-700"
        } transition-colors`}
      >
        Account Settings
      </a>
      <a
        href="#"
        className={`block px-4 py-3 ${
          darkMode ? "hover:bg-gray-700" : "hover:bg-indigo-50 text-gray-700"
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
    </div>
  );
};

export default ProfileDropdownMenu;
