const NTokenArtifacts = require('../artifacts/contracts/NToken.sol/NToken.json');

export default async function MintNToken(web3:any,contractAddress:string,target:string,value:number) {
    const [acc] = await web3.eth.getAccounts();
    let st = value.toString();
    let myValue = web3.utils.toWei(st);
    const MyContract = new web3.eth.Contract(NTokenArtifacts.abi,contractAddress);

    MyContract.methods.mint(target,myValue).send({from:acc})
    .on('transactionHash', function(hash:any){
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