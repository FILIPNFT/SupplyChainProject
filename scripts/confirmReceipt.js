async function main() {
    const contractAddress = "";
    const [retailer] = await ethers.getSigners(); // Pretpostavlja se da je trenutni signer prodavac

    const SupplyChainContract = await ethers.getContractFactory("SupplyChainContract");
    const supplyChain = await SupplyChainContract.attach(contractAddress);

    const transaction = await supplyChain.connect(retailer).confirmReceipt();
    await transaction.wait();

    console.log("Prijem proizvoda potvrđen od strane prodavca.");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });