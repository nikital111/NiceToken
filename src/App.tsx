import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import "./App.css";
import CrowdSale from './pages/CrowdSale';
import Web3 from 'web3';
import CrowdSaleSub from './subscriptions/CrowdSaleSub';
import Header from './static/Header';
import { Backdrop, Box, Button, Icon, Snackbar, Typography } from '@material-ui/core';
import NTokenSub from './subscriptions/NTokenSub';
import MintNFT from './pages/MintNFT';
import NFTSub from './subscriptions/NFTSub';
import getBalances from './scripts/getBalances';
import Market from './pages/Market';
import Inventory from './pages/Inventory';
import ErrorIcon from '@mui/icons-material/Error';
import { makeStyles } from '@material-ui/core/styles';
const NTokenContract = "0x42051f63cb7d35AF942c51Ba00F601d34894d4B9";
const CrowdSaleContract = "0xF32014F1f51853D0f17aa93c04eAC719F3AEA025";
const NFTContract = "0x2F8475FD6EC9b5FCF102b6eC75a31d91b12AA2B5";
let MyContract = "0x4f66837cC7ca7362eA68c7D8C1b84BDC278e032d";
const MarketAddress = "0x944B3De9e7702eC3fC775D586b14B8b217Bd1664";

declare let window: any;
function App() {

  const [web3, setWeb3] = useState(new Web3(window.ethereum));
  const [wallet, setWallet] = useState('');
  const [balance, setBalance] = useState(0);
  const [openSnack, setOpenSnack] = useState(false);
  const [textSnack, setTextSnack] = useState('');
  const [openBack, setOpenBack] = useState(false);
  const [openBackNoEth, setOpenBackNoEth] = useState(false);

  useEffect(() => {
    if(window.ethereum){
    ff();
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('accountsChanged', handleWalletChanged);
    }
    else {
      setOpenBackNoEth(true);
    }
  }, []);

  useEffect(() => {
    if(window.ethereum){
    if (window.ethereum.chainId !== "0x4" && window.ethereum.chainId !== null) {
      setOpenBack(true);
      changeChain();
    }
  }
  }, [web3]);



  function handleChainChanged(_chainId: any) {
    window.location.reload();
  }

  function handleWalletChanged(_chainId: any) {
    connectW();
  }

  const changeChain = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: '0x4',
          },
        ],
      });
    } catch (addError) {
      console.log(addError);
    }
  };

  const ff = async () => {
    try {
      if (window.ethereum) {
        // web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(new Web3(window.ethereum));
        const myWeb3 = new Web3(window.ethereum);
        const [acc] = await myWeb3.eth.getAccounts();
        setWallet(acc);
        web3.eth.defaultAccount = acc;
        checkBalance(acc);
        CrowdSaleSub(myWeb3, CrowdSaleContract, handleOpen);
        NTokenSub(myWeb3, NTokenContract, CrowdSaleContract);
        NFTSub({ web3: myWeb3, contractAddress: NFTContract, setOpenBuy: handleOpen });
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
        setWallet(acc);
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

  const toMetamask = ()=>{
    window.location = "https://metamask.io/";
  };

  const useStyles = makeStyles((theme) => ({
    back: {
      zIndex: 1299,
      backdropFilter: "blur(5px)",
    },
    contBack: {
      maxWidth: "500px",
      width: '90%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '40px',
      backgroundColor: 'rgb(35, 36, 47)',
      borderRadius: '10px',
      position: 'relative',
      margin:'0px 10px'
    },
    title: {
      color: 'white',
      fontSize: '17px',
    },
    butt: {
      backgroundColor: 'rgb(72, 157, 254)',
      width: '100%',
      height: '50px',
      borderRadius: '20px',
      color: '#fff',
      marginTop: '25px',
      fontWeight: 'bold',
      fontSize: '15px',
      '&.MuiButton-contained:hover': {
        backgroundColor: 'rgb(72, 157, 254)',
        boxShadow: 'none'
      }
    },
  }));
  const classes = useStyles();

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

      <Backdrop open={openBackNoEth} className={classes.back}>
        <Box className={classes.contBack}>
          <Icon
            style={{
              width: '60px',
              height: '60px',
              marginBottom: '15px'
            }}
          >
            <ErrorIcon
              style={{
                color: 'white',
                width: '60px',
                height: '60px'
              }}
            ></ErrorIcon>
          </Icon>
          <Typography className={classes.title}>
          Please install MetaMask!
          </Typography>
          <Button
            className={classes.butt}
            variant='contained'
            onClick={toMetamask}
          >
            install MetaMask
          </Button>
        </Box>
      </Backdrop>

      <Backdrop open={openBack} className={classes.back}>
        <Box className={classes.contBack}>
          <Icon
            style={{
              width: '60px',
              height: '60px',
              marginBottom: '15px'
            }}
          >
            <ErrorIcon
              style={{
                color: 'white',
                width: '60px',
                height: '60px'
              }}
            ></ErrorIcon>
          </Icon>
          <Typography className={classes.title}>
            Please change the network in metamask to Rinkeby!
          </Typography>
          <Button
            className={classes.butt}
            variant='contained'
            onClick={changeChain}
          >
            Change Chain
          </Button>
        </Box>
      </Backdrop>

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
              MarketContract={MarketAddress}
              NFTContract={NFTContract}
              balance={balance}
              handleOpen={handleOpen}
              formatAddress={formatAddress}
              copyText={copyText}
              wallet={wallet}
            />}>
        </Route>

        <Route
          path="/inventory"
          element={
            <Inventory
              web3={web3}
              MarketContract={MarketAddress}
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
