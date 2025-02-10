import React from "react";
import {
  Home,
  Users,
  CreditCard,
  Calendar,
  Bell,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  darkMode: boolean;
  isSidebarOpen: boolean; // Managed by the parent component
  toggleSidebar: () => void; // Function to toggle sidebar
}

const Sidebar = ({
  activeTab,
  setActiveTab,
  darkMode,
  isSidebarOpen,
  toggleSidebar,
}: SidebarProps) => {
  // Define tabs
  const tabs = [
    { id: "dashboard", name: "Dashboard", icon: Home },
    { id: "students", name: "Students", icon: Users },
    { id: "payments", name: "Payments", icon: CreditCard },
    { id: "attendance", name: "Attendance", icon: Calendar },
    { id: "alerts", name: "Alerts", icon: Bell },
  ];

  return (
    <>
      {/* Sidebar Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${
          isSidebarOpen ? "block" : "hidden"
        } lg:hidden`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-50 top-0 left-0 h-full w-64 ${
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
          <button onClick={toggleSidebar} className="lg:hidden text-gray-700">
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
                toggleSidebar(); // Close sidebar on mobile after selecting a tab
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
    </>
  );
};

export default Sidebar;
