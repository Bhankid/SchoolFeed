import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ }: { darkMode: boolean }) {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("user"); 
      localStorage.removeItem("activeTab"); 
      navigate("/login"); 
    }, 4000);
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center transition-colors duration-300 
      bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-gray-200"
    >
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-800">
        <p className="text-lg font-semibold text-gray-300 animate-pulse">
          Logging out, please wait...
        </p>
      </div>
    </div>
  );
}

export default Logout;
