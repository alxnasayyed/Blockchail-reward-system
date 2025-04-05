import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getContract } from "../contract";
import "../styles/RecyclerDashboard.css";  // ✅ Import new CSS
import { FaClipboardList, FaFileAlt, FaEye, FaChartBar } from "react-icons/fa"; // ✅ Icons

const RecyclerDashboard = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [userId, setUserId] = useState("RECYCLER_USER_ID");

  // ✅ Connect Wallet Function
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (!accounts.length) {
          alert("❌ No accounts returned from MetaMask.");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        setWalletAddress(address);

        const response = await fetch("http://localhost:5000/api/auth/update-wallet/recycler", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, wallet: address }),
        });

        if (!response.ok) throw new Error("❌ Failed to update wallet on backend.");

        console.log("✅ Wallet connected:", address);
        alert(`✅ Wallet connected: ${address}`);
      } catch (error) {
        console.error("❌ Wallet connection failed:", error);
        alert("❌ Wallet connection failed. Please try again.");
      }
    } else {
      alert("❌ MetaMask not detected! Please install it.");
    }
  };

  // ✅ Reward User Function
  const rewardUser = async (address, amount) => {
    try {
      if (!address || !amount) {
        alert("❌ Please enter valid user address and amount.");
        return;
      }

      const contract = await getContract();
      if (!contract) return;

      const tx = await contract.rewardRecycler(address, ethers.parseUnits(amount, 18));
      await tx.wait();

      alert(`✅ Successfully rewarded ${amount} tokens to: ${address}`);
    } catch (error) {
      console.error("❌ Error rewarding user:", error);
      alert("❌ Failed to reward user. Ensure you are connected and have sufficient permissions.");
    }
  };

  // ✅ Fetch Wallet Address from Backend
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/recycler?userId=${userId}`);
        if (!res.ok) throw new Error("❌ Failed to fetch wallet address.");

        const data = await res.json();
        if (data.walletAddress) setWalletAddress(data.walletAddress);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWallet();
  }, [userId]);

  return (
    <div className="dashboard-container">
      <h2>Recycler Dashboard</h2>

      {/* ✅ Wallet Buttons */}
      <div className="wallet-buttons">
        <button className="connect-wallet" onClick={connectWallet}>Connect MetaMask</button>
        <button className="reward-user" onClick={() => rewardUser(prompt("Enter User Address"), prompt("Enter Amount"))}>Reward User</button>
      </div>

      <p>Wallet: {walletAddress || "❌ Not Connected"}</p>

      {/* ✅ Recycler Features */}
      <div className="dashboard-cards">
        <DashboardCard icon={<FaClipboardList />} title="View Pickups" description="See scheduled pickups." />
        <DashboardCard icon={<FaFileAlt />} title="Generate Recycle Report" description="Download recycling data." />
        <DashboardCard icon={<FaEye />} title="Monitor Recycle" description="Track recycling process." />
        <DashboardCard icon={<FaChartBar />} title="Recycle Stats" description="View performance analytics." />
      </div>
    </div>
  );
};

// ✅ Reusable Card Component
const DashboardCard = ({ icon, title, description }) => (
  <div className="dashboard-card">
    <div className="icon">{icon}</div>
    <div className="card-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

export default RecyclerDashboard;
