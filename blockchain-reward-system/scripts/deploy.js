const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();  
    console.log("Deploying contract with account:", deployer.address);

    const RewardToken = await hre.ethers.getContractFactory("RewardToken");
    const rewardToken = await RewardToken.deploy(deployer.address);

    await rewardToken.waitForDeployment();
    
    console.log("RewardToken deployed to:", await rewardToken.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
