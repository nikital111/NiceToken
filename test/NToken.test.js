const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NToken", function () {
    let acc1, acc2, acc3, NToken;
    beforeEach(async function () {
        [acc1, acc2, acc3] = await ethers.getSigners();
        const NTokenContract = await ethers.getContractFactory("NToken", acc1);
        NToken = await NTokenContract.deploy();
        await NToken.deployed();
    });

    it("should be deployed", async function () {
        expect(NToken.address).to.be.properAddress;
        console.log("address is valid");
    });

    it("mint", async function () {
        const val = 1000;
        let address0 = "0x0000000000000000000000000000000000000000";
        const tx = await NToken.mint(acc2.address, val);

        expect(tx)
            .to.emit(NToken, 'Transfer')
            .withArgs(address0, acc2.address, val);

        const balance = await NToken.balanceOf(acc2.address);
        console.log(balance);

        expect(balance).to.eq(val);
    });

    it("transfer", async function () {
        const val = 1000;

        await NToken.mint(acc1.address, val);

        const transfer = await NToken.transfer(acc2.address, val);

        expect(transfer)
            .to.emit(NToken, 'Transfer')
            .withArgs(acc1.address, acc2.address, val);

        const balance1 = await NToken.balanceOf(acc1.address);
        const balance2 = await NToken.balanceOf(acc2.address);
        console.log(balance1, balance2);

        expect(balance1).to.eq(0);
        expect(balance2).to.eq(val);

    });

    it("approve", async function () {
        const val = 1000;

        const tx = await NToken.approve(acc2.address, val);

        expect(tx)
            .to.emit(NToken, 'Approval')
            .withArgs(acc1.address, acc2.address, val);

        const allowVal = await NToken.allowance(acc1.address, acc2.address);
        console.log(allowVal);
        expect(allowVal).to.eq(val);
    });

    it("transfer from", async function () {
        const val = 1000;

        await NToken.mint(acc1.address, val);
        await NToken.approve(acc3.address, val);

        const transferFrom = await NToken.connect(acc3).transferFrom(acc1.address, acc2.address, val);

        expect(transferFrom)
            .to.emit(NToken, 'Transfer')
            .withArgs(acc1.address, acc2.address, val);

        const balance1 = await NToken.balanceOf(acc1.address);
        const balance2 = await NToken.balanceOf(acc2.address);
        console.log(balance1, balance2);

        expect(balance1).to.eq(0);
        expect(balance2).to.eq(val);

    });
})