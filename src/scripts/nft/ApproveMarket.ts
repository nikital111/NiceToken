const NFTArtifacts = require('../../artifacts/contracts/nft/ERC721.sol/ERC721.json');

export default async function ApproveMarket(web3:any,contractAddress:string,approvedAddr:string) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(NFTArtifacts.abi,contractAddress);

    await MyContract.methods.addApprovedMarket(approvedAddr).send({from:acc})
    .on('transactionHash', function(hash:string){
        console.log(hash,' hash')
    })
    .on('receipt', function(receipt:any){
        console.log(receipt,' receipt');
    })
    .on('error', console.error);

}