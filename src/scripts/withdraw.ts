const DemoArtifacts = require('../artifacts/contracts/Demo.sol/Demo.json');

// async function checkBalance(address, msg) {
//     const bal = await eth.provider.getBalance(address);
//     console.log(bal, msg);
// }

export default async function Withdraw(web3:any,contractAddress:string,setStatus:any) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(DemoArtifacts.abi,contractAddress);

    MyContract.methods.withdrawFunds(acc).send({from:acc})
    .on('transactionHash', function(hash:any){
        console.log(hash,' hash')
    })
    .on('receipt', function(receipt:any){
        console.log(receipt,' receipt');
        setStatus(1);
    })
    // .on('confirmation', function(confirmationNumber, receipt){ 
    //     console.log(receipt,' receipt ',confirmationNumber, ' confirmationNumber') 
    // })
    .on('error', console.error); // If a out of gas error, the second parameter is the receipt.
}