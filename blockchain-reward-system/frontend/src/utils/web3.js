import { ethers } from "ethers";
import rewardTokenABI from "../RewardToken.json" assert { type: "json" };

const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // ✅ Replace with your actual contract address

// ✅ Connect Wallet Function
export const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed! Please install it.");
      return;
    }
  
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      return accounts[0]; // Return the first connected account
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

// ✅ Get Token Balance Function
export const getTokenBalance = async (walletAddress) => {
    try {
        if (!window.ethereum) throw new Error("MetaMask is not installed");

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const rewardToken = new ethers.Contract(tokenAddress, rewardTokenABI, signer);
        const balance = await rewardToken.balanceOf(walletAddress);

        return ethers.formatUnits(balance, 18); // Convert from Wei
    } catch (error) {
        console.error("Error fetching token balance:", error);
        return "0";
    }
};
