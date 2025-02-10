import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/login"); // Redirect to login
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg text-gray-700 dark:text-gray-300">Logging out...</p>
    </div>
  );
}

export default Logout;
