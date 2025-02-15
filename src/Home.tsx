import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import Dashboard from "./components/Dashboard";
import Students from "./components/Students";
import Payments from "./components/Payments";
import Attendance from "./components/Attendance";
import Alerts from "./components/Alerts";
import Logout from "./pages/Logout";

function Home() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "dashboard";
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  const [isLoading, setIsLoading] = useState(true);

  // Persist active tab and theme in localStorage
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

  // Render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard darkMode={darkMode} />;
      case "students":
        return <Students darkMode={darkMode} />;
      case "payments":
        return <Payments darkMode={darkMode} />;
      case "attendance":
        return <Attendance darkMode={darkMode} />;
      case "alerts":
        return <Alerts darkMode={darkMode} />;
      case "logout":
        return <Logout darkMode={darkMode} />;
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
      }`}
    >
      {/* Header */}
      <Header
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode((prev) => !prev)}
      />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-8">{renderContent()}</div>
      </div>

      {/* Footer */}
      <Footer darkMode={darkMode} />

      {/* Toaster for notifications */}
      <Toaster position="top-right" />
    </div>
  );
}

export default Home;
