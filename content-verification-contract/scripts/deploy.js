const hre = require("hardhat");

async function main() {
  // Deploy ContentVerification Contract
  const ContentVerification = await hre.ethers.getContractFactory("ContentVerification");
  const contentVerification = await ContentVerification.deploy();
  await contentVerification.waitForDeployment();
  console.log("ContentVerification deployed to:", contentVerification.target);

  // Deploy MyToken Contract
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy();
  await myToken.waitForDeployment();
  console.log("MyToken deployed to:", myToken.target);

  // ✅ Deploy MyNFT Contract (Add this part)
  const MyNFT = await hre.ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy(); // If your constructor requires arguments, add them inside ()
  await myNFT.waitForDeployment();
  console.log("MyNFT deployed to:", myNFT.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
