const NFTArtifacts = require('../artifacts/contracts/nft/ERC721.sol/ERC721.json');

interface INFTSub {
    web3: any,
    contractAddress: string,
    setOpenBuy: (text: string) => void,
}

export default async function NFTSub({web3,contractAddress,setOpenBuy}:INFTSub) {

    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(NFTArtifacts.abi,contractAddress);

    const myEvent = MyContract.events.Transfer({
        filter: {to:acc}
    }, function (error:any, event:any) { })
        .on('data', function (event:any) {
            console.log(event,'event NFTSub'); // same results as the optional callback above
            setOpenBuy("Thank you for mint!");
           // setOpenBuy(true);
        })
        .on('changed', function (event:any) {
            // remove event from local database
        })
        .on('error', console.error);

}