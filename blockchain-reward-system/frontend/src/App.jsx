import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero"; // ✅ Keeps the Home Page
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./dashboards/UserDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";
import RecyclerDashboard from "./dashboards/RecyclerDashboard";
import CollectorDashboard from "./dashboards/CollectorDashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";

// ✅ Private Route (Protects Dashboards)
const PrivateRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();
  return user && allowedRoles.includes(user.role) ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} /> {/* ✅ Home Page */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ Role-Based Dashboards */}
          <Route path="/dashboard/user" element={<PrivateRoute element={<UserDashboard />} allowedRoles={["user"]} />} />
          <Route path="/dashboard/admin" element={<PrivateRoute element={<AdminDashboard />} allowedRoles={["admin"]} />} />
          <Route path="/dashboard/recycler" element={<PrivateRoute element={<RecyclerDashboard />} allowedRoles={["recycler"]} />} />
          <Route path="/dashboard/collector" element={<PrivateRoute element={<CollectorDashboard />} allowedRoles={["collector"]} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
