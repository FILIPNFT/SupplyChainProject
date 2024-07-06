async function main() {
    const contractAddress = "";
    const [deployer] = await ethers.getSigners();

    const SupplyChainContract = await ethers.getContractFactory("SupplyChainContract");
    const supplyChain = await SupplyChainContract.attach(contractAddress);

    // Parametri funkcije
    const distributor = ""; // Adresa distributera
    const retailer = ""; // Adresa prodavca
    const price = ethers.utils.parseEther("0.5"); // Cena u etherima, na primer 1 ETH
    const quantity = 2; // Količina
    const deliveryDate = "2024-01-01"; // Datum isporuke

    await supplyChain.connect(deployer).setTransactionDetails(distributor, retailer, price, quantity, deliveryDate);

    console.log("Detalji transakcije su postavljeni!");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });