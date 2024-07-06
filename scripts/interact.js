async function main() {
    const contractAddress = "";
    const SupplyChainContract = await ethers.getContractFactory("SupplyChainContract");
    const supplyChain = await SupplyChainContract.attach(contractAddress);

    const owner = await supplyChain.owner();
    console.log("Owner of the contract is:", owner);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });