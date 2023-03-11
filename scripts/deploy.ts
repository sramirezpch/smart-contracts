import { Contract } from "ethers";
import { ethers } from "hardhat";

async function seed(nft: Contract) {
  const accounts = await ethers.getSigners();

  for (let i = 0; i < 5; i++) {
    await nft.safeMint(accounts[i % 2].address, "");
  }
}

async function main() {
  const network = process.env.HARDHAT_NETWORK;

  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();

  await nft.deployed();

  const contractAddresses = {
    nft: nft.address,
  };

  console.log(`NFT contract deployed at ${contractAddresses.nft}`);

  if (network == "localhost") await seed(nft);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
