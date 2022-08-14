import { Box, InputAdornment, OutlinedInput, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withWidth from "@material-ui/core/withWidth";
import React, { useEffect, useState } from 'react';
// @ts-ignore: Unreachable code error
import EthImg from '../images/eth2-img.svg';
import Item from './Item';

const NTImg = require("../images/NT.png");

interface IMarketList {
    web3: any,
    MarketContract: string,
    buyItem: (id:number, val:number)=>{},
    delistItem: (id:number)=>{},
    wallet:string,
    getNumberItems:()=>number,
    width: string,
    list: Array<any>,
}

const MarketList = ({ web3, MarketContract, list, buyItem, delistItem,wallet,getNumberItems, width }: IMarketList) => {

    

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

    const isMyItems = ()=>{
        let res = false;
        for(let i = 0; i < list.length; i++){
            if(wallet === list[i].seller){
                res = true;
            }
        }
        return res;
    };

    const mapList = list.map((item: any, i) => ((
        <Box key={i}>
            <Item id={item.idNft} price={item.price} endSale={item.endSale} description={item.description} img={item.url} seller={item.seller} buyItem={buyItem} delistItem={delistItem} web3={web3} width={width} />
        </Box>
    )));

    return (
        <Box className={classes.marketList}>
            {
            getNumberItems() > 0 || isMyItems()
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

export default MarketList;