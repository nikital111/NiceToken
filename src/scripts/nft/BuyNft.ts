const MarketArtifacts = require('../../artifacts/contracts/nft/Market.sol/Market.json');

export default async function BuyNft(web3: any, contractAddress: string, id:number, val: number) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(MarketArtifacts.abi, contractAddress);

    await MyContract.methods.buyItem(id).send({ from: acc, value:val })
        .then((data: any) => { console.log(data) });

    return 1;
}