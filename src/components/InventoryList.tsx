import { Box, InputAdornment, OutlinedInput, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withWidth from "@material-ui/core/withWidth";
import React, { useEffect, useState } from 'react';
// @ts-ignore: Unreachable code error
import EthImg from '../images/eth2-img.svg';
import ListItem from '../scripts/nft/ListItem';
import InventoryItem from './InventoryItem';
import Item from './Item';

const NTImg = require("../images/NT.png");

interface IInventoryItem {
    web3: any,
    MarketContract: string,
    openSell:(id:number)=>void,
    width: string,
    list: Array<any>,
}

const InventoryList = ({ web3, MarketContract, list, openSell, width }: IInventoryItem) => {

    const useStyles = makeStyles((theme) => ({
        marketList: {
            marginTop: "30px",
            maxWidth: "1000px",
            width: "100%",
            display: "flex",
            justifyContent: "flex-start"
        },
        nothing:{
            width:'100%',
            marginTop:'40px',
            color:'#fff',
            fontSize:'25px',
            display:'flex',
            justifyContent:'center'
        }
    }));
    const classes = useStyles();

    const mapList = list.map((item: any, i) => ((
        <Box key={i}>
            <InventoryItem id={item} web3={web3} openSell={openSell} width={width} />
        </Box>
    )));

    return (
        <Box className={classes.marketList}>
            {
            list.length > 0 
            ? 
            mapList 
            : 
            <Typography className={classes.nothing}>
                No items found
            </Typography>
            }
        </Box>
    )
}

export default InventoryList;