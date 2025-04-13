import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getContract } from "../contract";
import "../styles/UserDashboard.css";
import { FaRecycle, FaTruck, FaLeaf, FaFileDownload, FaCoins } from "react-icons/fa";

const UserDashboard = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [userId, setUserId] = useState("USER_ID");
    const [tokenBalance, setTokenBalance] = useState(0);

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
        <div className="user-dashboard-container">
            <h2><center>User Dashboard</center></h2>

            <div className="user-dashboard-buttons">
                <button className="dashboard-btn" onClick={connectWallet}>🔗 Connect Wallet</button>
                <button className="dashboard-btn" onClick={redeemReward}>🎁 Redeem Rewards</button>
            </div>

            <p><center>Wallet: {walletAddress || "❌Not Connected"}</center></p>
            <p><center>Token Balance: {tokenBalance} Tokens</center></p>

            <div className="dashboard-cards">
                <DashboardCard
                    icon={<FaLeaf />}
                    title="Carbon Footprint"
                    description="Estimate your waste impact."
                    background="/images/cf.jpg"
                />
                <DashboardCard
                    icon={<FaTruck />}
                    title="Schedule Pickup"
                    description="Book waste collection service."
                    background="/images/sp.jpg"
                />
                <DashboardCard
                    icon={<FaRecycle />}
                    title="Recycle Status"
                    description="Track your recycling progress."
                    background="/images/res.jpg"
                />
                <DashboardCard
                    icon={<FaFileDownload />}
                    title="Download Report"
                    description="Get your recycling history."
                    background="/images/dr.jpg"
                />
                <DashboardCard
                    icon={<FaCoins />}
                    title="Token Balance"
                    description={`${tokenBalance} Tokens Available`}
                    background="/images/ta.jpg"
                />
            </div>
        </div>
    );
};

const DashboardCard = ({ icon, title, description, background }) => (
    <div
        className="dashboard-card"
        style={{ backgroundImage: `url(${background})` }}
    >
        <div className="card-overlay">
            <div className="card-icon">{icon}</div>
            <div className="card-content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    </div>
);

export default UserDashboard;
