import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getContract } from "../contract";  
import "../styles/CollectorDashboard.css";

const CollectorDashboard = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [userId, setUserId] = useState("COLLECTOR_USER_ID");

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] });
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        setWalletAddress(address);

        await fetch("http://localhost:5000/api/auth/update-wallet/collector", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, wallet: address }),
        });

        console.log("✅ Wallet connected:", address);
      } catch (error) {
        console.error("❌ Wallet connection failed:", error);
      }
    } else {
      alert("MetaMask not detected! Please install MetaMask.");
    }
  };

  const redeemTokens = async (address, amount) => {
    try {
      const contract = await getContract();
      if (!contract) return;
      const tx = await contract.redeemTokens(address, amount);
      await tx.wait();
      alert(`✅ Redeemed ${amount} tokens from: ${address}`);
    } catch (error) {
      console.error("❌ Error redeeming tokens:", error);
      alert("❌ Failed to redeem tokens");
    }
  };

  useEffect(() => {
    const fetchWallet = async () => {
      const res = await fetch(`http://localhost:5000/api/auth/collector?userId=${userId}`);
      const data = await res.json();
      if (data.walletAddress) setWalletAddress(data.walletAddress);
    };
    fetchWallet();
  }, []);

  return (
    <div className="collector-dashboard-container">
      <h2>Collector Dashboard</h2>

      <div className="collector-dashboard-buttons">
      <button className="dashboard-btn" onClick={connectWallet}>🔗 Connect MetaMask</button>
        <button className="dashboard-btn" onClick={() => redeemTokens(prompt("Enter User Address"), prompt("Enter Amount"))}>
          💰 Redeem Tokens
        </button>
      </div>
      <p className="wallet-info">Wallet: {walletAddress || "❌ Not Connected"}</p>
      <div className="collector-dashboard-cards">

        {/* Pickup Requests */}
        <div className="collector-dashboard-card" style={{ backgroundImage: "url('/images/pr.jpeg')" }}>
          <div className="card-overlay">
            <div className="card-icon">📦</div>
            <div className="card-content">
              <h3>Pickup Requests</h3>
              <p>Manage scheduled waste pickups.</p>
            </div>
          </div>
        </div>

        {/* Track Waste Collection */}
        <div className="collector-dashboard-card" style={{ backgroundImage: "url('/images/twc.jpeg')" }}>
          <div className="card-overlay">
            <div className="card-icon">🚛</div>
            <div className="card-content">
              <h3>Track Waste Collection</h3>
              <p>Monitor ongoing waste collection routes.</p>
            </div>
          </div>
        </div>

        {/* Recycling Progress */}
        <div className="collector-dashboard-card" style={{ backgroundImage: "url('/images/rp.jpeg')" }}>
          <div className="card-overlay">
            <div className="card-icon">♻️</div>
            <div className="card-content">
              <h3>Recycling Progress</h3>
              <p>Check waste processing status.</p>
            </div>
          </div>
        </div>

        {/* User History */}
        <div className="collector-dashboard-card" style={{ backgroundImage: "url('/images/uh.jpg')" }}>
          <div className="card-overlay">
          <div className="card-icon">📜</div>
          <div className="card-content">
      <h3>User History</h3>
      <p>View past transactions and collection logs.</p>
            </div>
          </div>
        </div>

      </div>

      
    </div>
  );
};

export default CollectorDashboard;
