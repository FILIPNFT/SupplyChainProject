const { expect } = require("chai");

describe("SimpleStorage", function () {
    let simpleStorage;
    let owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await SimpleStorage.deploy(); // Ovo automatski čeka na deployment.
    });

    it("Should store and retrieve value correctly", async function () {
        await simpleStorage.store(42);
        expect(await simpleStorage.retrieve()).to.equal(42);
    });
});