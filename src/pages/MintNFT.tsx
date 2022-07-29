import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, withWidth } from '@material-ui/core';
import InputCrowdSale from '../components/InputCrowdSale';
import BuyTokens from '../scripts/buyTokens';
import Mint from '../scripts/nft/mint';
import { makeStyles } from '@material-ui/core/styles';
import getTotalSupply from '../scripts/nft/getTotalSupply';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Arrow = require("../images/arrowDown.png");
const NTImg = require("../images/NT.png");

interface MintNFTInt {
    web3: any,
    NTokenContract: string,
    NFTContract: string,
    balance: number,
    width: string,
    handleOpen: (text: string) => void,
    formatAddress: (address:string) => string,
    copyText: (text: string) => void,
}

const MintNFT = ({ web3, NTokenContract, NFTContract, balance, width, handleOpen, formatAddress, copyText }: MintNFTInt) => {

    const [totalSupply,setTotalSupply] = useState(0);

    const supplyF = async()=>{
        const supply = await getTotalSupply(web3,NFTContract);
        setTotalSupply(supply);
    }

    useEffect(()=>{
        supplyF();
    },[])

    const useStyles = makeStyles((theme) => ({
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
            width: '90%',
            minHeight: '360px',
            padding: '20px',
            backgroundColor: 'transparent',
            borderRadius: '24px',
            boxShadow: 'none',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
            margin: "0px 0px"
        },
        image: {
            maxWidth: '600px',
            width: '100%',
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
        infoCont: {
            color: "white",
            marginTop: "25px",
            width: "100%",
        },
        textCont: {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end"
        },
        mainText: {
            fontSize: "20px",
        },
        subText: {
            fontSize: "16px",
            marginLeft: "3px",
            color: "#BDC0C6"
        }
    }));
    const classes = useStyles();

    const mintNFT = () => {
        Mint(web3,NFTContract,supplyF);
    };

    return (
        <Box className={classes.mainCont}>
            <Typography
                variant={width === "xs" ? 'h4' : 'h3'}
                style={{
                    color: '#fff'
                }}
            >
                Mint NFT
            </Typography>

            <Box className={classes.inCont}>
                <img src="https://ipfs.io/ipfs/Qmd54YbBbxY5MSfLWS2G68jzD7fQAZM5V6LWY2ihK1W8uo?filename=myNft1232.jpg"
                    className={classes.image}
                />

                <Box className={classes.infoCont}>
                    <Box className={classes.textCont}>
                    <Typography className={classes.mainText}>Price:</Typography>
                    <Typography className={classes.subText}>0.1 Ether</Typography>
                    </Box>
                    <Box className={classes.textCont}>
                    <Typography className={classes.mainText}>Total minted:</Typography>
                    <Typography className={classes.subText}>{totalSupply}/100</Typography>
                    </Box>
                    <Box className={classes.textCont}>
                    <Typography className={classes.mainText}>Address:</Typography>
                    <Typography onClick={()=>copyText(NFTContract)} className={classes.subText} style={{display:"flex",alignItems:"center",cursor:"pointer"}}>
                    {width === "xs" ? formatAddress(NFTContract) : NFTContract}
                    <ContentCopyIcon style={{width:"20px", height:"18px", color:"#BDC0C6", cursor:"pointer"}}/>
                    </Typography>
                    
                    </Box>
                </Box>


                <Button
                    className={classes.butt}
                    variant='contained'
                    onClick={mintNFT}
                >
                    Mint
                </Button>
            </Box>

        </Box>
    )
}

export default withWidth()(MintNFT);