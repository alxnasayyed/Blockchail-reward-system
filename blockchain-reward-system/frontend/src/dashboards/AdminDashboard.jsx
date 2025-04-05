import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getContract } from "../contract";
import "../styles/AdminDashboard.css"; // ✅ Import styles

const AdminDashboard = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [userId, setUserId] = useState("ADMIN_USER_ID");

  // ✅ Connect Wallet Function
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);

        await fetch("http://localhost:5000/api/auth/update-wallet/admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, wallet: address }),
        });

        alert(`✅ Wallet connected: ${address}`);
      } catch (error) {
        console.error("❌ Wallet connection failed:", error);
        alert("❌ Wallet connection failed. Please try again.");
      }
    } else {
      alert("❌ MetaMask not detected! Please install it.");
    }
  };

  // ✅ Add Recycler Function
  const addRecycler = async (address) => {
    try {
      const contract = await getContract();
      if (!contract) return;
      const tx = await contract.addRecyclingCenter(address);
      await tx.wait();
      alert(`✅ Recycler Added: ${address}`);
    } catch (error) {
      console.error("❌ Error adding recycler:", error);
      alert("❌ Failed to add recycler");
    }
  };

  // ✅ Add Collector Function
  const addCollector = async (address) => {
    try {
      const contract = await getContract();
      if (!contract) return;
      const tx = await contract.addRetailer(address);
      await tx.wait();
      alert(`✅ Collector Added: ${address}`);
    } catch (error) {
      console.error("❌ Error adding collector:", error);
      alert("❌ Failed to add collector");
    }
  };

  // ✅ Fetch Wallet Address on Load
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/admin?userId=${userId}`);
        const data = await res.json();
        if (data.walletAddress) setWalletAddress(data.walletAddress);
      } catch (error) {
        console.error("❌ Error fetching wallet:", error);
      }
    };
    fetchWallet();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>

      <div className="admin-dashboard-cards">
        <div className="admin-dashboard-card">
          <span className="icon">🔗</span>
          <div className="card-content">
            <h3>Connect MetaMask</h3>
            <p>Securely connect your wallet to manage recyclers and collectors.</p>
          </div>
          <button className="dashboard-btn" onClick={connectWallet}>Connect Wallet</button>
        </div>

        <div className="admin-dashboard-card">
          <span className="icon">🏭</span>
          <div className="card-content">
            <h3>Add Recycler</h3>
            <p>Register a new recycling center on the platform.</p>
          </div>
          <button className="dashboard-btn" onClick={() => addRecycler(prompt("Enter Recycler Address"))}>Add Recycler</button>
        </div>

        <div className="admin-dashboard-card">
          <span className="icon">🚛</span>
          <div className="card-content">
            <h3>Add Collector</h3>
            <p>Add a new waste collector to the network.</p>
          </div>
          <button className="dashboard-btn" onClick={() => addCollector(prompt("Enter Collector Address"))}>Add Collector</button>
        </div>

        <div className="admin-dashboard-card">
          <span className="icon">📊</span>
          <div className="card-content">
            <h3>View Recycle Reports</h3>
            <p>Access detailed reports on recycling activities.</p>
          </div>
          <button className="dashboard-btn">View Reports</button>
        </div>

        <div className="admin-dashboard-card">
          <span className="icon">📅</span>
          <div className="card-content">
            <h3>View Waste Schedules</h3>
            <p>Monitor and update waste collection schedules.</p>
          </div>
          <button className="dashboard-btn">View Schedules</button>
        </div>
      </div>

      <p className="wallet-info">Wallet: {walletAddress || "❌ Not Connected"}</p>
    </div>
  );
};

export default AdminDashboard;
