const MarketArtifacts = require('../artifacts/contracts/nft/Market.sol/Market.json');

export default async function Test(web3: any, contractAddress: string) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(MarketArtifacts.abi, contractAddress);

    await MyContract.methods.getList().call({from:acc})
    .then((data:any)=>{console.log(data[0])});





    // const val = web3.utils.toWei("0.2");

    // const time = (Date.now() + 3600000) / 1000;
    // const myTime = time.toFixed(0);

    // await MyContract.methods.listItem(1, val, "test", myTime).send({ from: acc })
    //     .then((data: any) => { console.log(data) });


    return 1;
}