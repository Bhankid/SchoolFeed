import React, { useEffect, useRef } from "react";
import { User, CreditCard, LogOut } from "lucide-react"; // Futuristic icons
import { useNavigate } from "react-router-dom";

interface ProfileDropdownMenuProps {
  isProfileDropdownOpen: boolean;
  darkMode: boolean;
  toggleProfileDropdown: () => void;
}

const ProfileDropdownMenu: React.FC<ProfileDropdownMenuProps> = ({
  isProfileDropdownOpen,
  darkMode,
//   toggleProfileDropdown,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target as Node)
//       ) {
//         toggleProfileDropdown(); // Close dropdown when clicking outside
//       }
//     }

//     if (isProfileDropdownOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isProfileDropdownOpen, toggleProfileDropdown]);

  return (
    <div
      ref={menuRef}
      className={`absolute right-0 mt-4 w-56 z-50 p-2 backdrop-blur-lg border border-gray-700/50 rounded-lg shadow-2xl transition-all duration-300 ${
        darkMode
          ? "bg-gray-900/80 text-gray-300 border-gray-700"
          : "bg-white/80 text-gray-800 border-gray-300"
      } ${
        isProfileDropdownOpen
          ? "translate-y-2 scale-100 opacity-100"
          : "translate-y-0 scale-95 opacity-0 pointer-events-none"
      }`}
    //   onClick={(e) => e.stopPropagation()} // Prevents click inside from triggering outside handler
    >
      <button
        onClick={() => navigate("/account-settings")}
        className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg transition-all hover:bg-gray-700/40"
      >
        <User className="w-5 h-5" />
        <span>Account Settings</span>
      </button>

      <button
        onClick={() => navigate("/meal-payments")}
        className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg transition-all hover:bg-gray-700/40"
      >
        <CreditCard className="w-5 h-5" />
        <span>Meal Payments</span>
      </button>

      <a
        href="/logout"
        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-500 transition-all hover:bg-red-700/30 rounded-lg"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </a>
    </div>
  );
};

export default ProfileDropdownMenu;
