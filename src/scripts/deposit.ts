
// async function checkBalance(address, msg) {
//     const bal = await eth.provider.getBalance(address);
//     console.log(bal, msg);
// }

export default async function Deposit(web3:any,contractAddress:string,setStatus:any) {
    const [acc] = await web3.eth.getAccounts();

    web3.eth.sendTransaction({
        to: contractAddress,
        value: '200000000000000000'
    })
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
    .on('error', console.error) // If a out of gas error, the second parameter is the receipt.
}