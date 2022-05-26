import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import "./App.css";
import CrowdSale from './pages/CrowdSale';
import Web3 from 'web3';
import CrowdSaleSub from './subscriptions/CrowdSaleSub';
import Header from './static/Header';
import { Box, Snackbar, Typography } from '@material-ui/core';
import NTokenSub from './subscriptions/NTokenSub';
import MintNFT from './pages/MintNFT';
import NFTSub from './subscriptions/NFTSub';
import getBalances from './scripts/getBalances';
import Market from './pages/Market';
let web3: any;
const NTokenContract = "0x42051f63cb7d35AF942c51Ba00F601d34894d4B9";
const CrowdSaleContract = "0xF32014F1f51853D0f17aa93c04eAC719F3AEA025";
const NFTContract = "0x4AF47648dA52a1f19d20e669aaF0B0a55fF04d65";
let MyContract = "0x4f66837cC7ca7362eA68c7D8C1b84BDC278e032d";
const MarketAddress = "0x7b10C26B2cd8a2419043B8B4C378b3e9e9B4fAe8";

declare let window: any;
function App() {

  useEffect(() => {
    ff();
  }, [])

  const [wallet, setWallet] = useState('');
  const [balance, setBalance] = useState(0);
  const [openSnack, setOpenSnack] = useState(false);
  const [textSnack, setTextSnack] = useState('');

  const ff = async () => {
    try {
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        console.log(web3);
        const [acc] = await web3.eth.getAccounts();
        await setWallet(acc);
        checkBalance(acc);
       // getBalances(web3,NTokenContract);
        web3.eth.defaultAccount = acc;
        CrowdSaleSub(web3, CrowdSaleContract, handleOpen);
        NTokenSub(web3, NTokenContract, CrowdSaleContract);
        NFTSub({web3:web3,contractAddress:NFTContract,setOpenBuy:handleOpen});
      }
      else {
        console.log('no')
      }
    }
    catch {
      console.log('error')
    }
  };

  const connectW = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.enable();
        const [acc] = await web3.eth.getAccounts();
        await setWallet(acc);
        checkBalance(acc);
        web3.eth.defaultAccount = acc;
      }
      else {
        console.log('no')
      }
    }
    catch {
      console.log('error')
    }
  }

  const checkBalance = (acc: string) => {
    if (acc) {
      web3.eth.getBalance(acc)
        .then((data: string) => {
          let val = web3.utils.fromWei(data, 'ether');
          setBalance(+val);
        })
    }
  }

  const handleOpen = (text: string) => {
    setOpenSnack(true);
    setTextSnack(text);
  }

  const handleClose = () => {
    setOpenSnack(false);
  }

  const formatAddress = (address: string) => {
    let formatAddress = address.split('');
    formatAddress.splice(5, 33, '.', '.', '.');
    let res = formatAddress.join('');
    return res;
  }

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    handleOpen("Copied!");
  }

  return (
    <div className="App">

      {/* <img src="https://ipfs.io/ipfs/QmbGPwa7yVNLeUBRrnCgrtiStSFVNxsWD5enPhswpdCE1F?filename=myNft.jpg"/> */}

      <Snackbar
        open={openSnack}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box style={{
          color: '#fff',
          backgroundColor: 'rgb(35, 36, 47)',
          padding: '20px',
          borderRadius: '10px'
        }}>
          <Typography variant='h6'>
            {textSnack}
          </Typography>
        </Box>
      </Snackbar>



      <Header 
      wallet={wallet} 
      connectW={connectW} 
      handleOpen={handleOpen} 
      formatAddress={formatAddress} 
      copyText={copyText}
      />
      <Routes>

        <Route
          path="/"
          element={
            <CrowdSale
              web3={web3}
              NTokenContract={NTokenContract}
              CrowdSaleContract={CrowdSaleContract}
              balance={balance}
              handleOpen={handleOpen}
              formatAddress={formatAddress}
              copyText={copyText}
            />}>
        </Route>

        <Route
          path="/mintnft"
          element={
            <MintNFT
              web3={web3}
              NTokenContract={NTokenContract}
              NFTContract={NFTContract}
              balance={balance}
              handleOpen={handleOpen}
              formatAddress={formatAddress}
              copyText={copyText}
            />}>
        </Route>

        <Route
          path="/market"
          element={
            <Market
              web3={web3}
              NTokenContract={NTokenContract}
              NFTContract={NFTContract}
              balance={balance}
              handleOpen={handleOpen}
              formatAddress={formatAddress}
              copyText={copyText}
            />}>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
