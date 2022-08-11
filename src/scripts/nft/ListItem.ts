const MarketArtifacts = require('../../artifacts/contracts/nft/Market.sol/Market.json');

export default async function ListItem(web3: any, contractAddress: string, id:number, valSt: string, description: string, endTime: number) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(MarketArtifacts.abi, contractAddress);

    const val = web3.utils.toWei(valSt);

    const time = endTime / 1000;
    const myTime = time.toFixed(0);

    await MyContract.methods.listItem(id, val, description, myTime).send({ from: acc })
        .then((data: any) => { console.log(data) });

    return 1;
}