const NFTArtifacts = require('../../artifacts/contracts/nft/ERC721.sol/ERC721.json');

export default async function Approve(web3:any,contractAddress:string,approvedAddr:string,tokenId:number,callback:(id: number) => Promise<void>) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(NFTArtifacts.abi,contractAddress);

    MyContract.methods.approve(approvedAddr,tokenId).send({from:acc})
    .on('transactionHash', function(hash:string){
        console.log(hash,' hash');
    })
    .on('receipt', function(receipt:any){
        console.log(receipt,' receipt');
        callback(tokenId);
    })
    .on('error', console.error);

}