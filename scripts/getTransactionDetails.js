async function main() {
    const contractAddress = "";

    const SupplyChainContract = await ethers.getContractFactory("SupplyChainContract");
    const supplyChain = await SupplyChainContract.attach(contractAddress);

    // Dohvatanje i ispisivanje detalja transakcije
    const distributor = await supplyChain.distributor();
    const retailer = await supplyChain.retailer();
    const price = await supplyChain.price();
    const quantity = await supplyChain.quantity();
    const deliveryDate = await supplyChain.deliveryDate();

    console.log(`Detalji transakcije postavljeni: Distributer=${distributor}, Prodavac=${retailer}, Cena=${ethers.utils.formatEther(price)} ETH, Količina=${quantity}, Datum isporuke=${deliveryDate}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });