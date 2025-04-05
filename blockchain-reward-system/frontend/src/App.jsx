import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./dashboards/UserDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";
import RecyclerDashboard from "./dashboards/RecyclerDashboard";
import CollectorDashboard from "./dashboards/CollectorDashboard";
import SchedulePickup from "./pages/SchedulePickup";  // ✅ FIXED: Import SchedulePickup
import ScheduledPickups from "./pages/recycler/ScheduledPickups";
import ConfirmPickup from "./pages/recycler/ConfirmPickup";
import UploadReport from "./pages/recycler/UploadReport";
import ViewReports from "./pages/recycler/ViewReports";
import TrackRecycledMaterial from "./pages/recycler/TrackRecycledMaterial";
import { ethers } from "ethers";
import { AuthProvider, useAuth } from "./context/AuthContext";


const PrivateRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();
  return user && allowedRoles.includes(user.role) ? element : <Navigate to="/login" />;
};
const connectWallet = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return signer;
  } else {
    alert("Please install Metamask!");
    return null;
  }
};
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/user" element={<PrivateRoute element={<UserDashboard />} allowedRoles={["user"]} />} />
          <Route path="/dashboard/admin" element={<PrivateRoute element={<AdminDashboard />} allowedRoles={["admin"]} />} />
          <Route path="/dashboard/recycler" element={<PrivateRoute element={<RecyclerDashboard />} allowedRoles={["recycler"]} />} />
          <Route path="/dashboard/collector" element={<PrivateRoute element={<CollectorDashboard />} allowedRoles={["collector"]} />} />
          <Route path="/recycler/scheduled-pickups" element={<ScheduledPickups />} />
          <Route path="/recycler/confirm-pickup" element={<ConfirmPickup />} />
          <Route path="/recycler/upload-report" element={<UploadReport />} />
          <Route path="/recycler/reports" element={<ViewReports />} />
          <Route path="/recycler/tracking" element={<TrackRecycledMaterial />} />
          <Route path="/recycler/track-recycled" element={<TrackRecycledMaterial />} />
 
          {/* ✅ FIXED: Added Route for SchedulePickup */}
          <Route path="/schedule-pickup" element={<SchedulePickup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
