import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
let signer;

export const connectWallet = async () => {
  if (!window.ethereum) {
    alert("MetaMask not detected. Please install it.");
    return null;
  }
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    signer = await provider.getSigner();
    return signer;
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
};

export const getSigner = () => signer;
export default provider;
