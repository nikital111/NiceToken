import { Box, InputAdornment, OutlinedInput, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withWidth from "@material-ui/core/withWidth";
import React, { useEffect, useState } from 'react';
// @ts-ignore: Unreachable code error
import EthImg from '../images/eth2-img.svg';
import GetList from '../scripts/nft/GetList';
import Item from './Item';
const NTImg = require("../images/NT.png");

interface IMarketList {
    web3: any,
    MarketContract: string,
    sort: number,
    search: number,
    width: string
}

const MarketList = ({ web3, MarketContract, sort, search, width }: IMarketList) => {

    const [list, setList] = useState([]);
    const [copyList, setCopyList] = useState([]);

    useEffect(() => {
        let myList = [...list];
        if (sort === 1) {
            myList.sort((a: any, b: any) => a.price - b.price);
            setList(myList);
        }
        if (sort === 2) {
            myList.sort((a: any, b: any) => b.price - a.price);
            setList(myList);
        }
        if (sort === 3) {
            myList.sort((a: any, b: any) => a.idNft - b.idNft);
            setList(myList);
        }
        if (sort === 4) {
            myList.sort((a: any, b: any) => b.idNft - a.idNft);
            setList(myList);
        }
    }, [sort])

    useEffect(()=>{
        if(!search){
            setList(copyList);
            return;
        }
        let myList:any = [...copyList];
        myList = myList.filter((item:any)=> {
            return +item.idNft === search;
        });
        setList(myList);
    },[search])

    const getListf = async () => {
        const data: any = await GetList(web3, MarketContract);
        setCopyList(data);
        setList(data);
    };

    useEffect(() => {
        getListf();
    }, [])

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
            <Item id={item.idNft} price={item.price} endSale={item.endSale} description={item.description} img={item.url} web3={web3} width={width} />
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

export default MarketList;