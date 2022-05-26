const MarketArtifacts = require('../artifacts/contracts/nft/Market.sol/Market.json');

export default async function Test(web3:any,contractAddress:string) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(MarketArtifacts.abi,contractAddress);

    const map = await MyContract.methods.getListMap(3).call({from:acc});

    const arr = await MyContract.methods.getList().call({from:acc});

    console.log(arr,map);

    return 1;
}