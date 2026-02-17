import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [open, setOpen] = useState(false);
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
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/20 border-b border-white/30 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white tracking-wide">
          TaskBoard
        </h1>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-6 text-white">
          <span className="text-sm opacity-90">
            {userEmail}
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-800 px-4 py-1 rounded-md hover:bg-emerald-600 transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden text-white">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-white bg-white/10 backdrop-blur-md">
          <span className="text-sm">{userEmail}</span>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;