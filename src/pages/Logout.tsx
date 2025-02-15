import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the authenticated user

  useEffect(() => {
    const logoutUser = async () => {
      try {
        if (user) {
          await signOut(auth); // Sign out from Firebase
        }
        localStorage.removeItem("user");
        localStorage.removeItem("activeTab");
        navigate("/login"); // Redirect to login after logout
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    // Call the logout function with a slight delay for UX
    setTimeout(() => {
      logoutUser();
    }, 2000);
  }, [navigate, user]);

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
};

export default Logout;
