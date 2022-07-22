import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, withWidth } from '@material-ui/core';
import InputCrowdSale from '../components/InputCrowdSale';
import BuyTokens from '../scripts/buyTokens';
import { makeStyles } from '@material-ui/core/styles';
import Deploy from '../scripts/deploy';
import MintNToken from '../scripts/mintNToken';
import CheckBalanceNT from '../scripts/checkBalanceNT';
import deployNToken from '../scripts/deployNToken';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Test from '../scripts/test';
import Approve from '../scripts/nft/Approve';
import ApproveMarket from '../scripts/nft/ApproveMarket';
const Arrow = require("../images/arrowDown.png");
const NTImg = require("../images/NT.png");

interface CrowdSaleInt {
    web3: any,
    NTokenContract: string,
    CrowdSaleContract: string,
    balance: number,
    width: string,
    handleOpen: (text: string) => void,
    formatAddress: (address: string) => string,
    copyText: (text: string) => void,
}

const CrowdSale = ({ web3, NTokenContract, CrowdSaleContract, balance, width, formatAddress, copyText }: CrowdSaleInt) => {

    const [tokens, setTokens] = useState(0);

    const checkTokens = async () => {
        const myTokens = await CheckBalanceNT(web3, NTokenContract, CrowdSaleContract);
        setTokens(web3.utils.fromWei(myTokens));
    }

    useEffect(() => {
        if (web3) {
            checkTokens();
        }
    }, [web3]);

    useEffect(() => {
        console.log(width)
    }, [width]);

    const useStyles = makeStyles((theme) => ({
        contToken: {
            display: "flex",
            justifyContent: "space-between",
            width: '100%',
            flexDirection: width === "xs" ? "column" : "row"
        },
        mainCont: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: width === 'xs' ? '30px' : '50px',
            flexDirection: 'column'
        },
        inCont: {
            maxWidth: '600px',
            width: width === "xs" ? "none" : '90%',
            height: '360px',
            padding: '20px',
            backgroundColor: 'rgb(70, 71, 93)',
            borderRadius: '24px',
            boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            margin: "0px 10px"
        },
        rightCont: {
            color: '#fff',
            marginTop: '8px',
            alignSelf: width === "xs" ? "flex-start" : "flex-end",
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
        },
        leftCont: {
            color: '#fff',
            marginTop: '8px',
            alignSelf: 'flex-start',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
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


    const [amountSend, setAmountSend] = useState(0);
    const [amountGet, setAmountGet] = useState(0);

    const changeAmountSend = (e: any) => {
        if (e.target.value < 0) {
            setAmountSend(0);
            setAmountGet(0);
        }
        else {
            setAmountSend(e.target.value);
            setAmountGet(e.target.value * 10000);
        }
    }

    const changeAmountGet = (e: any) => {

        if (e.target.value < 0) {
            setAmountSend(0);
            setAmountGet(0);
        }
        else {
            setAmountGet(e.target.value);
            setAmountSend(e.target.value / 10000);
        }


    }

    const buyToken = () => {
        BuyTokens(web3, CrowdSaleContract, amountSend, balance);
    }

    return (
        <Box className={classes.mainCont}>
            {/* <button onClick={()=>{MintNToken(web3,NTokenContract,CrowdSaleContract,100000)}}>111111111111</button> */}
            {/* <button onClick={()=>{Deploy(web3)}}>222222222222222</button> */}
            {/* <button onClick={()=>{deployNToken(web3)}}>4444444444444444444</button> */}
            <button onClick={() => { Test(web3, "0xc03B403e92777072be14B7712B7b327b302acDE9") }}>4444444444444444444</button>
            {/* <button onClick={() => { ApproveMarket(web3, "0x7DbB866DCc7C0c8DF67aFe32CBDC0A3D7bdDEa4C", "0xc03B403e92777072be14B7712B7b327b302acDE9") }}>ApproveMarket</button> */}
            {/* <button onClick={()=>{CheckBalanceNT(web3,NTokenContract,CrowdSaleContract)}}>333333333333</button> */}
            {/* <button onClick={() => { Approve(web3, "0x7DbB866DCc7C0c8DF67aFe32CBDC0A3D7bdDEa4C", "0xc03B403e92777072be14B7712B7b327b302acDE9", 1) }}>approve</button> */}
            <Typography
                variant={width === "xs" ? 'h4' : 'h3'}
                style={{
                    marginBottom: '20px',
                    color: '#fff'
                }}
            >
                Buy Tokens
            </Typography>
            <Box className={classes.inCont}>
                <InputCrowdSale
                    type={true}
                    changeAmountSend={changeAmountSend}
                    amountSend={amountSend}
                    setAmountSend={setAmountSend}
                    setAmountGet={setAmountGet}
                    balance={balance}
                    width={width}
                />

                <Box className={classes.rightCont}>
                    <Typography variant='caption'>
                        {balance.toFixed(4)} ETH
                    </Typography>
                </Box>

                <img src={Arrow} style={{
                    transform: 'rotate(90deg)',
                    margin: '0px 0px 20px 0px'
                }} />

                <InputCrowdSale
                    type={false}
                    changeAmountGet={changeAmountGet}
                    amountGet={amountGet}
                    setAmountSend={setAmountSend}
                    setAmountGet={setAmountGet}
                    balance={balance}
                    width={width}
                />

                <Box className={classes.contToken}>
                    <Box className={classes.leftCont}>
                        <Typography variant='caption'>
                            Tokens left: {tokens}/100000
                        </Typography>
                    </Box>

                    <Box className={classes.rightCont}>
                        <img src={NTImg} style={{
                            margin: '0px 5px 0px 0px',
                            width: '20px'
                        }} />
                        <Typography variant='caption' onClick={() => copyText(NTokenContract)} style={{ cursor: "pointer" }}>
                            {width === "xs" ? formatAddress(NTokenContract) : NTokenContract}
                        </Typography>
                        <ContentCopyIcon onClick={() => copyText(NTokenContract)} style={{ width: "20px", height: "17px", color: "white", cursor: "pointer" }} />
                    </Box>
                </Box>

                <Button
                    className={classes.butt}
                    variant='contained'
                    onClick={buyToken}
                    disabled={amountSend > 0 && amountSend <= balance ? false : true}
                >
                    Buy
                </Button>


            </Box>
        </Box>
    )
}

export default withWidth()(CrowdSale);