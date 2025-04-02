import { ethers } from "ethers";
import provider, { getSigner } from "./web3Provider";
import contractABI from "./RewardToken.json"; // Ensure ABI is in `src/` or update path

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3E";

export const getContract = async () => {
  const signer = getSigner();
  if (!signer) {
    alert("Please connect your wallet first.");
    return null;
  }
  return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
};

export const getBalance = async (address) => {
  const contract = await getContract();
  if (!contract) return "0";
  const balance = await contract.balanceOf(address);
  return ethers.formatUnits(balance, 18);
};
