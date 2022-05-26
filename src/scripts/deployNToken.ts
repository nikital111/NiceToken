const NTokenArtifacts = require('../artifacts/contracts/NToken.sol/NToken.json');
export default async function deployNToken(web3:any) {
    const [acc] = await web3.eth.getAccounts();
    const MyContract = new web3.eth.Contract(NTokenArtifacts.abi);

    MyContract.deploy({
        data: NTokenArtifacts.bytecode
    })
    .send({
        from: acc
    })
    .then(function(newContractInstance:any){
        console.log(newContractInstance.options.address) // instance with the new contract address
    });
}