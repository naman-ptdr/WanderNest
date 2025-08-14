import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import TripResults from "../pages/TripResults"; // ✅ NEW

const AppRoutes = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <Routes>
      <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trip-results"
        element={
          <ProtectedRoute>
            <TripResults />
          </ProtectedRoute>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
};

export default AppRoutes;
