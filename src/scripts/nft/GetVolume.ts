const MarketArtifacts = require('../../artifacts/contracts/nft/Market.sol/Market.json');

export default async function GetVolume(web3: any, contractAddress: string) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(MarketArtifacts.abi, contractAddress);

    let volume = await MyContract.methods.getVolume().call({ from: acc });

    return volume;
}