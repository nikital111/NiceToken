const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Market", function () {
    let acc1, acc2, acc3, NFT, Market;
    beforeEach(async function () {
        [acc1, acc2, acc3] = await ethers.getSigners();

        const NFTContract = await ethers.getContractFactory("ERC721", acc1);
        NFT = await NFTContract.deploy("NiceMonkey", "NM", "https://ipfs.io/ipfs/Qmd54YbBbxY5MSfLWS2G68jzD7fQAZM5V6LWY2ihK1W8uo?filename=myNft1232.jpg", acc1.address);
        await NFT.deployed();

        const MarketContract = await ethers.getContractFactory("Market", acc1);
        Market = await MarketContract.deploy(NFT.address);
        await Market.deployed();
    });

    it("should be deployed", async function () {
        expect(NFT.address).to.be.properAddress;
        expect(Market.address).to.be.properAddress;
        console.log("address is valid");
    });

    it("list item", async function () {
        const valETH = "0.1";

        await NFT.safeMint(acc1.address);
        await NFT.addApprovedMarket(Market.address);
        await NFT.approve(Market.address, 1);

        const tx = await Market.listItem(1,ethers.utils.parseEther(valETH),"hi!",1432246534453);

        const time = (await ethers.provider.getBlock(tx.blockNumber)).timestamp;
        const arrItems = await Market.items(0);

        expect(arrItems[0]).to.eq(1);
        expect(arrItems[1]).to.eq("https://ipfs.io/ipfs/Qmd54YbBbxY5MSfLWS2G68jzD7fQAZM5V6LWY2ihK1W8uo?filename=myNft1232.jpg1");
        expect(arrItems[2]).to.eq(ethers.utils.parseEther(valETH));
        expect(arrItems[3]).to.eq("hi!");
        expect(arrItems[4]).to.eq(time);
        expect(arrItems[5]).to.eq(1432246534453);
        expect(arrItems[6]).to.eq(acc1.address);

        const balanceNft1 = await NFT.balanceOf(acc1.address);
        const balanceNft2 = await NFT.balanceOf(Market.address);

        expect(balanceNft1).to.eq(0);
        expect(balanceNft2).to.eq(1);

        expect(tx)
            .to.emit(Market, 'itemList')
            .withArgs(acc1.address, 1, ethers.utils.parseEther(valETH),time);
    });

    it("delist item", async function () {
        const valETH = "0.1";

        await NFT.safeMint(acc1.address);
        await NFT.addApprovedMarket(Market.address);
        await NFT.approve(Market.address, 1);

        await Market.listItem(1,ethers.utils.parseEther(valETH),"hi!",1432246534453);

        const tx = await Market.delistItem(1);

        const time = (await ethers.provider.getBlock(tx.blockNumber)).timestamp;
        const arrItems = await Market.getList();

        expect(arrItems.length).to.eq(0);

        const balanceNft1 = await NFT.balanceOf(acc1.address);
        const balanceNft2 = await NFT.balanceOf(Market.address);

        expect(balanceNft1).to.eq(1);
        expect(balanceNft2).to.eq(0);

        expect(tx)
            .to.emit(Market, 'itemDelist')
            .withArgs(acc1.address, 1, time);
    });

    it("buy item", async function () {
        const valETH = "0.1";
        const valETH90 = "0.09";
        await NFT.safeMint(acc1.address);
        await NFT.addApprovedMarket(Market.address);
        await NFT.approve(Market.address, 1);

        await Market.listItem(1,ethers.utils.parseEther(valETH),"hi!",1432246534453);

        const tx = await Market.connect(acc2).buyItem(1,{value: ethers.utils.parseEther(valETH)});

        const time = (await ethers.provider.getBlock(tx.blockNumber)).timestamp;
        const arrItems = await Market.getList();

        expect(arrItems.length).to.eq(0);

        await expect(() => tx).to.changeEtherBalances([acc2, acc1], [ethers.utils.parseEther(`-${valETH}`), ethers.utils.parseEther(valETH90)]);

        const balanceNft1 = await NFT.balanceOf(acc1.address);
        const balanceNft2 = await NFT.balanceOf(Market.address);
        const balanceNft3 = await NFT.balanceOf(acc2.address);

        expect(balanceNft1).to.eq(0);
        expect(balanceNft2).to.eq(0);
        expect(balanceNft3).to.eq(1);

        expect(tx)
            .to.emit(Market, 'itemSell')
            .withArgs(acc1.address, acc2.address, 1, ethers.utils.parseEther(valETH), time);

        
        const withdrawTx = await Market.withdraw(acc1.address);

        await expect(() => withdrawTx).to.changeEtherBalances([Market, acc1], [ethers.utils.parseEther('-0.01'), ethers.utils.parseEther('0.01')]);

    });
    
})