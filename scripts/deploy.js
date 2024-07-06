async function main() {
    const SupplyChainContract = await ethers.getContractFactory("SupplyChainContract");
    const supplyChainContract = await SupplyChainContract.deploy();
    console.log("SupplyChainContract deployed to:", supplyChainContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });