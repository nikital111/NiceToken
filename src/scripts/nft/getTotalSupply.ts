const NFTArtifacts = require('../../artifacts/contracts/nft/ERC721.sol/ERC721.json');

export default async function getTotalSupply(web3:any,contractAddress:string) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(NFTArtifacts.abi,contractAddress);

    const totalSupply = await MyContract.methods.totalSupply().call({from:acc});

    // console.log(totalSupply);

    return totalSupply;
}