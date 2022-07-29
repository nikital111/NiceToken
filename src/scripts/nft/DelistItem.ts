const MarketArtifacts = require('../../artifacts/contracts/nft/Market.sol/Market.json');

export default async function DelistItem(web3: any, contractAddress: string, id:number) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(MarketArtifacts.abi, contractAddress);

    await MyContract.methods.delistItem(id).send({ from: acc })
        .then((data: any) => { console.log(data) });

    return 1;
}