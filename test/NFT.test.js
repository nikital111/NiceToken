const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT", function () {
    let acc1, acc2, acc3, NFT;
    beforeEach(async function () {
        [acc1, acc2, acc3] = await ethers.getSigners();
        const NFTContract = await ethers.getContractFactory("ERC721", acc1);
        NFT = await NFTContract.deploy("NiceMonkey", "NM", "https://ipfs.io/ipfs/Qmd54YbBbxY5MSfLWS2G68jzD7fQAZM5V6LWY2ihK1W8uo?filename=myNft1232.jpg", acc1.address);
        await NFT.deployed();
    });

    it("should be deployed", async function () {
        expect(NFT.address).to.be.properAddress;
        console.log("address is valid");
    });

    it("Buy nft", async function () {
        const valETH = "0.1";
        const address0 = "0x0000000000000000000000000000000000000000";
        const url = "https://ipfs.io/ipfs/Qmd54YbBbxY5MSfLWS2G68jzD7fQAZM5V6LWY2ihK1W8uo?filename=myNft1232.jpg1";

        const buyTx = await NFT.connect(acc2).buyNFT({ value: ethers.utils.parseEther(valETH) });

        expect(buyTx)
            .to.emit(NFT, 'Transfer')
            .withArgs(address0, acc2.address, 1);

        await expect(() => buyTx).to.changeEtherBalances([acc2, acc1], [ethers.utils.parseEther(`-${valETH}`), ethers.utils.parseEther(valETH)]);

        const infoNFTTx = await NFT.connect(acc2).getInfoToken(1);
        console.log(JSON.stringify(infoNFTTx));

        expect(infoNFTTx[0]).to.eq(acc2.address);
        expect(infoNFTTx[1]).to.eq(address0);
        expect(infoNFTTx[2]).to.eq(url);



    });

    it("approve nft", async function () {
        const valETH = "0.1";

        await NFT.buyNFT({ value: ethers.utils.parseEther(valETH) });

        const approveTx = await NFT.approve(acc2.address, 1);

        expect(approveTx)
            .to.emit(NFT, 'Approval')
            .withArgs(acc1.address, acc2.address, 1);

        const getApproveTx = await NFT.getApproved(1);

        expect(getApproveTx).to.eq(acc2.address);
    });

    it("approve all nft", async function () {
        const approveAllTx = await NFT.setApprovalForAll(acc2.address, acc1.address);

        expect(approveAllTx)
            .to.emit(NFT, 'ApprovalForAll')
            .withArgs(acc1.address, acc2.address, true);

        const getApproveAllTx = await NFT.isApprovedForAll(acc1.address, acc2.address);

        expect(getApproveAllTx).to.eq(true);
    });

    it("transfer nft", async function () {
        const valETH = "0.1";
        const address0 = "0x0000000000000000000000000000000000000000";
        const url = "https://ipfs.io/ipfs/Qmd54YbBbxY5MSfLWS2G68jzD7fQAZM5V6LWY2ihK1W8uo?filename=myNft1232.jpg1";
        
        await NFT.buyNFT({ value: ethers.utils.parseEther(valETH) });

        await NFT.approve(acc2.address, 1);

        const transferTx = await NFT.safeTransferFrom(acc1.address, acc2.address, 1);

        expect(transferTx)
            .to.emit(NFT, 'Transfer')
            .withArgs(acc1.address, acc2.address, 1);

            const infoNFTTx = await NFT.connect(acc2).getInfoToken(1);
    
            expect(infoNFTTx[0]).to.eq(acc2.address);
            expect(infoNFTTx[1]).to.eq(address0);
            expect(infoNFTTx[2]).to.eq(url);
    });
})