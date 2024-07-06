async function main() {
    const contractAddress = "";
    const [distributor] = await ethers.getSigners(); // Pretpostavlja se da je trenutni signer distributer

    const SupplyChainContract = await ethers.getContractFactory("SupplyChainContract");
    const supplyChain = await SupplyChainContract.attach(contractAddress);

    const transaction = await supplyChain.connect(distributor).shipProduct();
    await transaction.wait();

    console.log("Proizvod isporučen od strane distributera.");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });