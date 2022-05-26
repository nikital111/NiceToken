const CrowdSaleArtifacts = require('../artifacts/contracts/CrowdSale.sol/Crowdsale.json');

export default async function CrowdSaleSub(web3, contractAddress, setOpenBuy) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(CrowdSaleArtifacts.abi, contractAddress);

    const myEvent = MyContract.events.TokenPurchase({
        filter: {beneficiary:acc}
    }, function (error, event) { })
        .on('data', function (event) {
            console.log(event,'event CrowdSaleSub'); // same results as the optional callback above
            setOpenBuy("Thank you for your purchase!");
        })
        .on('changed', function (event) {
            // remove event from local database
        })
        .on('error', console.error);
}