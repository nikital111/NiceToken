const CrowdSaleArtifacts = require('../artifacts/contracts/CrowdSale.sol/Crowdsale.json');

export default async function BuyTokens(web3:any,contractAddress:string,value:number, balance:number, callback:any) {
    const [acc] = await web3.eth.getAccounts();

    let st = value.toString();
    let myValue = web3.utils.toWei(st);

    // let st2 = balance.toString();
    // const balanceInWei = web3.utils.toWei(st2);

    // const gasUse = 60336;
    // const gasPrice = await web3.eth.getGasPrice();
    // const gasTotal = gasUse * gasPrice;
    // const gasInETH = web3.utils.fromWei(gasTotal.toString());
   // console.log(gasPrice,gasTotal,gasInETH,balance,myValue,balanceInWei);

    // if((myValue + gasTotal) > balanceInWei){
    //     myValue = balanceInWei - gasTotal;
    // }

    // await web3.eth.estimateGas({from: acc, to: contractAddress, amount: web3.utils.toWei("1", "ether")})
    // .then((data:number)=>console.log(data,"data"))

    const MyContract = new web3.eth.Contract(CrowdSaleArtifacts.abi,contractAddress);
    // var BN = web3.utils.BN;
    // let myValue = new BN(value + '0'.repeat(18))
    MyContract.methods.receiveFunds().send({from:acc, value: myValue})
    .on('transactionHash', function(hash:string){
        console.log(hash,' hash')
    })
    .on('receipt', function(receipt:any){
        callback();
        console.log(receipt,' receipt');
    })
    // .on('confirmation', function(confirmationNumber, receipt){ 
    //     console.log(receipt,' receipt ',confirmationNumber, ' confirmationNumber') 
    // })
    .on('error', console.error); // If a out of gas error, the second parameter is the receipt.
}