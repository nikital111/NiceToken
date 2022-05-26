const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrowdSale", function () {
    let acc1, acc2, acc3, NToken, CrowdSale;
    beforeEach(async function () {
        [acc1, acc2, acc3] = await ethers.getSigners();

        const NTokenContract = await ethers.getContractFactory("NToken", acc1);
        NToken = await NTokenContract.deploy();
        await NToken.deployed();

        const CrowdSaleContract = await ethers.getContractFactory("Crowdsale", acc1);
        CrowdSale = await CrowdSaleContract.deploy(10000, acc1.address, NToken.address);
        await CrowdSale.deployed();
    });

    it("should be deployed", async function () {
        expect(CrowdSale.address).to.be.properAddress;
        expect(NToken.address).to.be.properAddress;
        console.log("address is valid");
    });

    it("buy tokens", async function () {
        const val = "100000";
        const valETH = "1";
        const tokens = "10000";

        await NToken.mint(CrowdSale.address, ethers.utils.parseEther(val));
        const balance = await NToken.balanceOf(CrowdSale.address);
        console.log(balance);
        expect(balance).to.eq(ethers.utils.parseEther(val));
        
        const tx = await CrowdSale.connect(acc2).buyTokens(acc2.address, {value:ethers.utils.parseEther(valETH)});

        expect(tx)
            .to.emit(CrowdSale, 'TokenPurchase')
            .withArgs(acc2.address, acc2.address, ethers.utils.parseEther(valETH), ethers.utils.parseEther(tokens));

        await expect(()=>tx).to.changeEtherBalances([acc2,acc1],[ethers.utils.parseEther(`-${valETH}`),ethers.utils.parseEther(valETH)]);

        const balance1 = await NToken.balanceOf(CrowdSale.address);
        const balance2 = await NToken.balanceOf(acc2.address);
        console.log(balance1, balance2);

        expect(balance1).to.eq(ethers.utils.parseEther(`${100000-tokens}`));
        expect(balance2).to.eq(ethers.utils.parseEther(tokens));

    });



    
})