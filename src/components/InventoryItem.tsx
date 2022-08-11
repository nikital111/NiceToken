import { Box, Button, InputAdornment, OutlinedInput, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withWidth from "@material-ui/core/withWidth";
import React, { useEffect, useState } from 'react';
// @ts-ignore: Unreachable code error
import EthImg from '../images/eth2-img.svg';
const NTImg = require("../images/NT.png");

interface IInventoryItem {
    id: number,
    web3: any,
    openSell: (id:number)=>void,
    width: string,
}
const url = "https://ipfs.io/ipfs/Qmd54YbBbxY5MSfLWS2G68jzD7fQAZM5V6LWY2ihK1W8uo?filename=myNft1232.jpg";
const InventoryItem = ({ id, web3, openSell, width }: IInventoryItem) => {

    const [acc, setAcc] = useState('');

    const getAcc = async()=>{
        const [acc1] = await web3.eth.getAccounts();
        setAcc(acc1);
    };

    useEffect(()=>{
        getAcc();
    },[])

    const useStyles = makeStyles((theme) => ({
        item: {
            width: "200px",
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            overflow: 'hidden',
            backgroundColor: "#272834",
            margin: "0px 10px 10px 10px"
        },
        img: {
            maxWidth: "100%",
        },
        titleCont: {
            margin: "10px 0px 10px 10px"
        },
        title: {
            fontSize: '16px',
            color: '#fff',
            fontWeight: 600
        },
        priceCont: {
            margin: "8px 0px 0px 10px"
        },
        price: {
            fontSize: '16px',
            color: '#fff',
            fontWeight: 600
        },
        end: {
            color: "#fff",
            fontSize: "16px",
            fontWeight: 600,
            margin: "8px 0px 10px 10px"
        },
        butt: {
            backgroundColor: 'rgb(72, 157, 254)',
            width: '100%',
            height: '40px',
            borderRadius: '0px',
            color: '#fff',
            marginTop: '0px',
            fontWeight: 'bold',
            fontSize: '15px',
            '&.MuiButton-contained:hover': {
                backgroundColor: 'rgb(72, 157, 254)',
                boxShadow: 'none',
            }

        },
    }));
    const classes = useStyles();

    return (
        <Box className={classes.item}>
            <img src={url} className={classes.img} />

            <Box className={classes.titleCont}>
                <Typography className={classes.title}>
                    NiceMonkeys #{id}
                </Typography>
            </Box>

                    <Button
                        className={classes.butt}
                        variant='contained'
                        onClick={()=>openSell(id)}
                    >
                        Sell
                    </Button>
            
        </Box>
    )
}

export default InventoryItem;