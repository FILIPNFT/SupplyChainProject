// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Definisanje ugovora SupplyChainContract za upravljanje B2B transakcijama u lancu snabdevanja
contract SupplyChainContract {
    // Drži adresu vlasnika ugovora
    address public owner;
    // Adresa distributera u transakciji
    address public distributor;
    // Adresa prodavca u transakciji
    address public retailer;
    // Cena proizvoda u wei
    uint public price;
    // Količina proizvoda u transakciji
    uint public quantity;
    // Predviđeni datum isporuke
    string public deliveryDate;

    // Eventi za logovanje promena u transakcijama
    event TransactionDetailsSet(address distributor, address retailer, uint price, uint quantity, string deliveryDate);
    event TransactionAccepted(address retailer);
    event ProductShipped(address distributor);
    event ReceiptConfirmed(address retailer);

    // Enumeracija za praćenje stanja transakcije
    enum State { Created, Accepted, Shipped, Received }
    State public state;

    // Konstruktor postavlja vlasnika ugovora na adresu koja deployuje ugovor
    constructor() {
        owner = msg.sender;
    }

    // Modifikator koji dozvoljava samo vlasniku ugovora da izvršava funkciju
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action.");
        _;
    }

    // Modifikator koji proverava da li je transakcija u odgovarajućem stanju
    modifier inState(State _state) {
        require(state == _state, "Invalid state for this action.");
        _;
    }

    // Funkcija za postavljanje detalja transakcije, dostupna samo vlasniku
    function setTransactionDetails(address _distributor, address _retailer, uint _price, uint _quantity, string memory _deliveryDate) public onlyOwner {
        distributor = _distributor;
        retailer = _retailer;
        price = _price;
        quantity = _quantity;
        deliveryDate = _deliveryDate;
        state = State.Created; // Postavljanje početnog stanja transakcije
        emit TransactionDetailsSet(_distributor, _retailer, _price, _quantity, _deliveryDate);
    }

    // Funkcija koju poziva retailer da prihvati transakciju
    function acceptTransaction() public inState(State.Created) {
        require(msg.sender == retailer, "Only the designated retailer can accept the transaction.");
        state = State.Accepted;
        emit TransactionAccepted(msg.sender);
    }

    // Funkcija koju poziva distributor da označi proizvod kao isporučen
    function shipProduct() public inState(State.Accepted) {
        require(msg.sender == distributor, "Only the designated distributor can ship the product.");
        state = State.Shipped;
        emit ProductShipped(msg.sender);
    }

    // Funkcija koju poziva retailer da potvrdi prijem proizvoda
    function confirmReceipt() public inState(State.Shipped) {
        require(msg.sender == retailer, "Only the designated retailer can confirm receipt of the product.");
        state = State.Received;
        emit ReceiptConfirmed(msg.sender);
    }
}
