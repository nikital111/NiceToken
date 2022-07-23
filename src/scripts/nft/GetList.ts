const MarketArtifacts = require('../../artifacts/contracts/nft/Market.sol/Market.json');

export default async function GetList(web3: any, contractAddress: string) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(MarketArtifacts.abi, contractAddress);

    let list;
    await MyContract.methods.getList().call({ from: acc })
        .then((data: any) => {
            list = data;
        });

    return list;
}