import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getContract } from "../contract";  
import "../styles/UserDashboard.css";  
import { FaRecycle, FaTruck, FaLeaf, FaFileDownload, FaCoins } from "react-icons/fa";  // ✅ Importing Icons

const UserDashboard = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [userId, setUserId] = useState("USER_ID");
    const [tokenBalance, setTokenBalance] = useState(0);

    // ✅ Connect Wallet Function
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setWalletAddress(address);

                await fetch("http://localhost:5000/api/auth/update-wallet/user", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId, wallet: address }),
                });

                console.log("✅ Wallet connected:", address);
            } catch (error) {
                console.error("❌ Wallet connection failed:", error);
            }
        } else {
            alert("❌ MetaMask not detected! Please install it.");
        }
    };

    // ✅ Fetch Token Balance
    useEffect(() => {
        const fetchTokenBalance = async () => {
            try {
                const contract = await getContract();
                if (!contract || !walletAddress) return;
                const balance = await contract.balanceOf(walletAddress);
                setTokenBalance(Number(balance));
            } catch (error) {
                console.error("❌ Failed to fetch token balance:", error);
            }
        };

        fetchTokenBalance();
    }, [walletAddress]);

    // ✅ Reward Function
    const redeemReward = async () => {
        try {
            const contract = await getContract();
            if (!contract || !walletAddress) return;
            const tx = await contract.redeemReward(walletAddress);
            await tx.wait();
            alert("✅ Reward Redeemed Successfully!");
        } catch (error) {
            console.error("❌ Error redeeming reward:", error);
            alert("❌ Failed to redeem reward");
        }
    };

    return (
        <div className="dashboard-container">
            <h2>User Dashboard</h2>

            {/* ✅ Styled Wallet Buttons */}
            <div className="wallet-buttons">
                <button className="connect-wallet" onClick={connectWallet}>🔗 Connect Wallet</button>
                <button className="redeem-rewards" onClick={redeemReward}>🎁 Redeem Rewards</button>
            </div>

            <p>Wallet: {walletAddress || "Not Connected"}</p>
            <p>Token Balance: {tokenBalance} Tokens</p>

            {/* ✅ Dashboard Cards */}
            <div className="dashboard-cards">
                <DashboardCard icon={<FaLeaf />} title="Carbon Footprint" description="Estimate your waste impact." />
                <DashboardCard icon={<FaTruck />} title="Schedule Pickup" description="Book waste collection service." />
                <DashboardCard icon={<FaRecycle />} title="Recycle Status" description="Track your recycling progress." />
                <DashboardCard icon={<FaFileDownload />} title="Download Report" description="Get your recycling history." />
                <DashboardCard icon={<FaCoins />} title="Token Balance" description={`${tokenBalance} Tokens Available`} />
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

export default UserDashboard;
