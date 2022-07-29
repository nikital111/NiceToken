const MarketArtifacts = require('../../artifacts/contracts/nft/ERC721.sol/ERC721.json');

export default async function GetTokensOwned(web3: any, contractAddress: string, callback:any) {

    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(MarketArtifacts.abi, contractAddress);

    await MyContract.methods.tokensOwned(acc).call({ from: acc })
        .then((data: any) => {
            callback(data);
        });

    return 1;
}