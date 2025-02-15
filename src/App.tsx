import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./Home";
import Logout from "./pages/Logout";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the entire application */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
