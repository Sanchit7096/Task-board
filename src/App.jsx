import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ProtectedRoute from "./Components/ProtectRoutes";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Route */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <>
                <NavBar />
                <Home />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;