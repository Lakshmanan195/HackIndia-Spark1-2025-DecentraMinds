const hre = require("hardhat");

async function main() {
  const ethers = hre.ethers;
  const [deployer] = await ethers.getSigners();

  console.log(`Estimating gas with deployer: ${deployer.address}`);

  // Replace with your actual contract name
  const ContractFactory = await ethers.getContractFactory("ContentVerification");

  // If your contract has constructor arguments, pass them to deploy()
  // e.g., const deployment = ContractFactory.deploy(arg1, arg2);
  const deployment = ContractFactory.deploy();

  // Estimate gas for deployment
  const estimatedGas = await deployment.estimateGas({ from: deployer.address });

  // Get current gas price
  const gasPrice = await ethers.provider.getFeeData().then(feeData => feeData.gasPrice);

  // Calculate total gas cost
  const estimatedCost = estimatedGas.mul(gasPrice);

  console.log(`Estimated Gas: ${estimatedGas.toString()} units`);
  console.log(`Estimated Gas Price: ${ethers.utils.formatUnits(gasPrice, "gwei")} Gwei`);
  console.log(`Estimated Cost: ${ethers.utils.formatEther(estimatedCost)} ETH`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });