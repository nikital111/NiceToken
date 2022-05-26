const NFTArtifacts = require('../../artifacts/contracts/nft/ERC721.sol/ERC721.json');

export default async function Mint(web3:any,contractAddress:string) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(NFTArtifacts.abi,contractAddress);

    const myValue = web3.utils.toWei("0.1");

    MyContract.methods.buyNFT().send({from:acc,value:myValue})
    .on('transactionHash', function(hash:string){
        console.log(hash,' hash')
    })
    .on('receipt', function(receipt:any){
        console.log(receipt,' receipt');
    })
    // .on('confirmation', function(confirmationNumber, receipt){ 
    //     console.log(receipt,' receipt ',confirmationNumber, ' confirmationNumber') 
    // })
    .on('error', console.error); // If a out of gas error, the second parameter is the receipt.

}