import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getContract } from "../contract";  
import "../styles/CollectorDashboard.css"; // ✅ Import new styles

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

      <div className="collector-dashboard-cards">
        <div className="collector-dashboard-card">
          <span className="icon">📦</span>
          <div className="card-content">
            <h3>Pickup Requests</h3>
            <p>Manage scheduled waste pickups.</p>
          </div>
        </div>

        <div className="collector-dashboard-card">
          <span className="icon">🚛</span>
          <div className="card-content">
            <h3>Track Waste Collection</h3>
            <p>Monitor ongoing waste collection routes.</p>
          </div>
        </div>

        <div className="collector-dashboard-card">
          <span className="icon">♻️</span>
          <div className="card-content">
            <h3>Recycling Progress</h3>
            <p>Check waste processing status.</p>
          </div>
        </div>

        <div className="collector-dashboard-card">
          <span className="icon">📜</span>
          <div className="card-content">
            <h3>User History</h3>
            <p>View past transactions and collection logs.</p>
          </div>
        </div>
      </div>

      <p className="wallet-info">Wallet: {walletAddress || "Not Connected"}</p>
    </div>
  );
};

export default CollectorDashboard;
