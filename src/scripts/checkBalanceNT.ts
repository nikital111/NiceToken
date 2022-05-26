const NTokenArtifacts = require('../artifacts/contracts/NToken.sol/NToken.json');

export default async function CheckBalanceNT(web3:any,contractAddress:string,target:string) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(NTokenArtifacts.abi,contractAddress);

    const tokens = await MyContract.methods.balanceOf(target).call({from:acc});

   // console.log(tokens);

    return tokens;
}