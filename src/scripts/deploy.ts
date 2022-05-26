const MarketArtifacts = require('../artifacts/contracts/nft/Market.sol/Market.json');
export default async function Deploy(web3:any) {
    const [acc] = await web3.eth.getAccounts();
    const MyContract = new web3.eth.Contract(MarketArtifacts.abi);

    MyContract.deploy({
        data: MarketArtifacts.bytecode,
        arguments:["0x4AF47648dA52a1f19d20e669aaF0B0a55fF04d65"]
    })
    .send({
        from: acc
    })
    .then(function(newContractInstance:any){
        console.log(newContractInstance.options.address) // instance with the new contract address
    });
}