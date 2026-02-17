import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../Components/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const correctEmail = "intern@demo.com";
  const correctPassword = "intern123";

  const handleLogin = (email, password, remember) => {
    if (email === correctEmail && password === correctPassword) {
      const loginData = {
        isAuthenticated: true,
        email,
      };

      if (remember) {
        localStorage.setItem("auth", JSON.stringify(loginData));
      } else {
        sessionStorage.setItem("auth", JSON.stringify(loginData));
      }

      navigate("/home");
    } else {
      setError("❌ Invalid email or password");
    }
  };

  return <LoginForm onLogin={handleLogin} error={error} />;
};

export default Login;