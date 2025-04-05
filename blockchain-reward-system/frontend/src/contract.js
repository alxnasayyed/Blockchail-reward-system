import { ethers } from "ethers";
import { getSigner } from "./web3Provider"; 
import contractABI from "./RewardToken.json"; // Ensure ABI is in `src/` or update path

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3E";

// ✅ Get Contract Instance
export const getContract = async () => {
  try {
    const signer = await getSigner();
    if (!signer) {
      alert("❌ Please connect your wallet first.");
      return null;
    }
    return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
  } catch (error) {
    console.error("❌ Error getting contract:", error);
    alert("❌ Failed to load contract");
    return null;
  }
};

// ✅ Get token balance of a user
export const getBalance = async (address) => {
  try {
    const contract = await getContract();
    if (!contract) return "0";
    const balance = await contract.balanceOf(address);
    return ethers.formatUnits(balance, 18);
  } catch (error) {
    console.error("❌ Error fetching balance:", error);
    return "0";
  }
};

// ✅ Add Recycler (Only Admin)
export const addRecycler = async (address) => {
  try {
    const contract = await getContract();
    if (!contract) return;
    const tx = await contract.addRecyclingCenter(address);
    await tx.wait();
    alert(`✅ Recycler added: ${address}`);
  } catch (error) {
    console.error("❌ Error adding recycler:", error);
    alert("❌ Failed to add recycler");
  }
};

// ✅ Add Collector (Only Admin)
export const addCollector = async (address) => {
  try {
    const contract = await getContract();
    if (!contract) return;
    const tx = await contract.addRetailer(address);
    await tx.wait();
    alert(`✅ Collector added: ${address}`);
  } catch (error) {
    console.error("❌ Error adding collector:", error);
    alert("❌ Failed to add collector");
  }
};

// ✅ Reward User (Recycler mints tokens to user)
export const rewardRecycler = async (address, amount) => {
  try {
    const contract = await getContract();
    if (!contract) return;
    const tx = await contract.rewardRecycler(address, ethers.parseUnits(amount, 18));
    await tx.wait();
    alert(`✅ Rewarded ${amount} tokens to: ${address}`);
  } catch (error) {
    console.error("❌ Error rewarding user:", error);
    alert("❌ Failed to reward user");
  }
};

// ✅ Redeem Tokens (Collector transfers tokens from user)
export const redeemTokens = async (address, amount) => {
  try {
    const contract = await getContract();
    if (!contract) return;
    const tx = await contract.redeemTokens(address, ethers.parseUnits(amount, 18));
    await tx.wait();
    alert(`✅ Redeemed ${amount} tokens from: ${address}`);
  } catch (error) {
    console.error("❌ Error redeeming tokens:", error);
    alert("❌ Failed to redeem tokens");
  }
};
