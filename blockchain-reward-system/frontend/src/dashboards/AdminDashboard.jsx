import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getContract } from "../contract";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [userId] = useState("ADMIN_USER_ID");

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

  const addRetailer = async (address) => {
    try {
      const contract = await getContract();
      if (!contract) return;
      const tx = await contract.addRetailer(address);
      await tx.wait();
      alert(`✅ Retailer Added: ${address}`);
    } catch (error) {
      console.error("❌ Error adding retailer:", error);
      alert("❌ Failed to add retailer");
    }
  };

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
  }, [userId]);

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>

      <div className="admin-dashboard-buttons">
        <button className="dashboard-btn" onClick={connectWallet}>
          🔗 Connect MetaMask
        </button>
      </div>
      <p className="wallet-info">Wallet: {walletAddress || "❌ Not Connected"}</p>
      <div className="admin-dashboard-cards">
        {/* Add Recycler */}
        <div
          className="admin-dashboard-card"
          onClick={() => addRecycler(prompt("Enter Recycler Address"))}
          style={{ backgroundImage: "url('/images/recycler.jpg')" }}
        >
          <div className="card-overlay"></div>
          <div className="icon">🏭</div>
          <div className="card-content">
            <h3>Add Recycler</h3>
            <p>Register a new recycling center on the platform.</p>
          </div>
        </div>

        {/* Add Collector */}
        <div
          className="admin-dashboard-card"
          onClick={() => addCollector(prompt("Enter Collector Address"))}
          style={{ backgroundImage: "url('/images/collector.jpg')" }}
        >
          <div className="card-overlay"></div>
          <div className="icon">🚛</div>
          <div className="card-content">
            <h3>Add Collector</h3>
            <p>Add a new waste collector to the network.</p>
          </div>
        </div>

        {/* Add Retailer */}
        <div
          className="admin-dashboard-card"
          onClick={() => addRetailer(prompt("Enter Retailer Address"))}
          style={{ backgroundImage: "url('/images/retailer.jpg')" }}
        >
          <div className="card-overlay"></div>
          <div className="icon">🏪</div>
          <div className="card-content">
            <h3>Add Retailer</h3>
            <p>Add a new retailer to the recycling network.</p>
          </div>
        </div>

        {/* View Reports */}
        <div
          className="admin-dashboard-card"
          onClick={() => alert("🚧 Report viewing not implemented yet.")}
          style={{ backgroundImage: "url('/images/reports.jpg')" }}
        >
          <div className="card-overlay"></div>
          <div className="icon">📊</div>
          <div className="card-content">
            <h3>View Recycle Reports</h3>
            <p>Access detailed reports on recycling activities.</p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default AdminDashboard;
