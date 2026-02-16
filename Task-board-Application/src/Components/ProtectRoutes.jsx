import { Navigate } from "react-router-dom";


const ProtectRoutes = ({ children }) => {
  const auth =
    JSON.parse(localStorage.getItem("auth")) ||
    JSON.parse(sessionStorage.getItem("auth"));

  return auth?.isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectRoutes
