import React, { useState, useEffect } from "react";
import { Mail, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth =
      JSON.parse(localStorage.getItem("auth")) ||
      JSON.parse(sessionStorage.getItem("auth"));

    if (auth?.email) {
      setUserEmail(auth.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r  from-emerald-900 via-emerald-700 to-emerald-500 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">

        {/* Logo */}
        <h1 className="text-2xl font-bold">TaskBoard</h1>

      

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <Mail className="w-5 h-5 cursor-pointer" />
          <Bell className="w-5 h-5 cursor-pointer" />

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white text-blue-800 flex items-center justify-center font-bold">
              {userEmail?.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              className="text-sm hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;