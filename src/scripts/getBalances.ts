const NTokenArtifacts = require('../artifacts/contracts/NToken.sol/NToken.json');

export default async function getBalances(web3:any,contractAddress:string) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(NTokenArtifacts.abi,contractAddress);

    const balances = await MyContract.methods.balances().call({from:acc});

    console.log(balances);

    return balances;
}