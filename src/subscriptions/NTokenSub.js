const NTokenArtifacts = require('../artifacts/contracts/NToken.sol/NToken.json');

export default async function NTokenSub(web3, contractAddress, filtAddress) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(NTokenArtifacts.abi, contractAddress);

    const myEvent = MyContract.events.Transfer({
        filter: {_from:filtAddress}
    }, function (error, event) { })
        .on('data', function (event) {
            console.log(event,'event NTokenSub'); // same results as the optional callback above
           // setOpenBuy(true);
        })
        .on('changed', function (event) {
            // remove event from local database
        })
        .on('error', console.error);
}