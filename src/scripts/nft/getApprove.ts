const NFTArtifacts = require('../../artifacts/contracts/nft/ERC721.sol/ERC721.json');

export default async function getApprove(web3: any, contractAddress: string, id:number) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(NFTArtifacts.abi, contractAddress);

    let res = await MyContract.methods.getApproved(id).call({ from: acc });

    return res;
}