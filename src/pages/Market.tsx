import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputAdornment,FormHelperText, InputLabel, MenuItem, OutlinedInput, Typography, withWidth, Icon } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import Select from "@mui/material/Select";
import { makeStyles } from '@material-ui/core/styles';
// @ts-ignore: Unreachable code error
import EthImg from '../images/eth2-img.svg';
import MarketList from '../components/MarketList';
import getTokensOwned from "../scripts/nft/GetTokensOwned";
import BuyNft from '../scripts/nft/BuyNft';
import DelistItem from '../scripts/nft/DelistItem';
import GetList from '../scripts/nft/GetList';
import GetVolume from '../scripts/nft/GetVolume';
interface MarketInt {
    web3: any,
    MarketContract: string,
    NFTContract: string,
    balance: number,
    width: string,
    handleOpen: (text: string) => void,
    formatAddress: (address: string) => string,
    copyText: (text: string) => void,
    wallet:string
}
declare let window: any;
const Market = ({ web3, MarketContract, NFTContract, balance, width, handleOpen, formatAddress, copyText,wallet }: MarketInt) => {

    const [values, setValues] = useState({
        id: '',
        sort: '',
    });

    const [valueSel, setValueSel] = useState(1);
    const [tokens, setTokens] = useState([]);
    const [list, setList]:any = useState([]);
    const [copyList, setCopyList] = useState([]);
    const [volume, setVolume]:any = useState(0);

    useEffect(() => {
        let myList = [...list];
        if (valueSel === 1) {
            myList.sort((a: any, b: any) => a.price - b.price);
            setList(myList);
        }
        if (valueSel === 2) {
            myList.sort((a: any, b: any) => b.price - a.price);
            setList(myList);
        }
        if (valueSel === 3) {
            myList.sort((a: any, b: any) => a.idNft - b.idNft);
            setList(myList);
        }
        if (valueSel === 4) {
            myList.sort((a: any, b: any) => b.idNft - a.idNft);
            setList(myList);
        }
    }, [valueSel])

    useEffect(()=>{
        if(!values.id){
            setList(copyList);
            return;
        }
        let myList:any = [...copyList];
        myList = myList.filter((item:any)=> {
            return +item.idNft === +values.id;
        });
        setList(myList);
    },[values.id])

    const getListf = async () => {
        const data: any = await GetList(web3, MarketContract);
        setCopyList(data);
        setList(data);
    };

    function handleWalletChanged(_chainId: any) {
        getTokensOwned(web3, NFTContract, setTokens);
        setList([]);
        getListf();
        console.log("change acc");
      }

    useEffect(()=>{
        getTokensOwned(web3, NFTContract, setTokens);
        getListf();
        getVolume();
        window.ethereum.on('accountsChanged', handleWalletChanged);
    },[]);

    const handleChange = (title: string) => (e: any) => {
        setValues({ ...values, [title]: e.target.value });
    };

    const handleSelect = (e: any) => {
        setValueSel(e.target.value);
    };

    const buyItem = async(id:number, val:number)=>{
        BuyNft(web3, MarketContract, id, val);
    };

    const delistItem = async(id:number)=>{
        DelistItem(web3, MarketContract, id);
    };

    const getFloorPrice = ()=>{
        let res = 0;
        const time = Date.now();
        for(let i = 0; i < list.length; i++){
            const myTime = +list[i].endSale*1000;
            console.log(time < myTime);
            if((res > list[i].price || res === 0) && myTime > time) res = list[i].price;
        }
        const myRes = res.toString();
        return web3.utils.fromWei(myRes);
    };

    const getNumberItems = ()=>{
        let res = 0;
        const all = list.length;
        const time = Date.now();
        for(let i = 0; i < list.length; i++){
            const myTime = +list[i].endSale*1000;
            if(myTime < time) res++;
        }
        return all - res;
    };

    const getVolume = async()=>{
       const res = await GetVolume(web3,MarketContract);
       setVolume(web3.utils.fromWei(res));
    };
    

    const useStyles = makeStyles((theme) => ({
        mainCont: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: width === 'xs' ? '10px' : '30px',
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
            maxWidth: '200px',
            width: '100%',
            borderRadius: '50%'
        },
        textCont: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        imgEth: {
            marginRight: '3px',
            width: '15px'
        },
        statCont: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            padding: width === "xs" ? "15px 0px" : '25px',
            width: width === "xs" ? "100%" : '110px',
        },
        mainText: {
            fontSize: "20px",
        },
        subText: {
            fontSize: "16px",
            color: "#BDC0C6"
        },
        marketCont: {
            maxWidth: width === 'xs' ? '100%' : '600px',
            width: width === 'xs' ? '100%' : '',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
        },
        control:{
            width:'100%',
            display:'flex',
            justifyContent:'center',
            flexDirection: width === 'xs' ? 'column' : 'row'
        },
        inId: {
            color: 'white',
            marginRight: width === 'xs' ? '0' : '15px',
            marginBottom: width === 'xs' ? '15px' : '0',
            minWidth:'200px',
            '& fieldset': {
                borderColor: '#18507A'
            },
            '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2986CC'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2986CC'
            },
            
        },
        inSort:{
            color:'white!important',
            minWidth:'182px',
            '& svg':{
                color:'white'
            },
            '& fieldset': {
                borderColor: '#18507A'
            },
            '&:hover fieldset':{
                borderColor: '#2986CC!important'
            }
        }
    }));
    const classes = useStyles();

    return (
        <Box className={classes.mainCont}>
            <Box className={classes.inCont}>
                <img
                    src="https://ipfs.io/ipfs/Qmd54YbBbxY5MSfLWS2G68jzD7fQAZM5V6LWY2ihK1W8uo?filename=myNft1232.jpg"
                    className={classes.image}
                />

                <Typography
                    variant={width === "xs" ? 'h5' : 'h4'}
                    style={{
                        color: '#fff',
                        marginTop: '10px'
                    }}
                >
                    Nice Monkeys
                </Typography>

                <Box
                    style={{
                        border: '1px solid black',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '10px',
                        flexDirection: width === "xs" ? "column" : "row",
                        width: width === "xs" ? "100%" : ""
                    }}
                >
                    <Box
                        className={classes.statCont}
                        style={{
                            borderRight: width === "xs" ? "none" : '1px solid black',
                            borderBottom:  width === "xs" ? "1px solid black" : 'none'
                        }}
                    >
                        <Typography className={classes.mainText}>
                            {getNumberItems()}
                        </Typography>
                        <Typography className={classes.subText}>
                            items
                        </Typography>
                    </Box>
                    <Box
                        className={classes.statCont}
                        style={{
                            borderRight: width === "xs" ? "none" : '1px solid black',
                            borderBottom:  width === "xs" ? "1px solid black" : 'none'
                        }}
                    >
                        <div className={classes.textCont}>
                            <img src={EthImg} className={classes.imgEth} />
                            <Typography className={classes.mainText}>
                                {list.length ? getFloorPrice() : 0}
                            </Typography>
                        </div>
                        <Typography className={classes.subText}>
                            floor price
                        </Typography>
                    </Box>
                    <Box
                        className={classes.statCont}
                    >
                        <div className={classes.textCont}>
                            <img src={EthImg} className={classes.imgEth} />
                            <Typography className={classes.mainText}>
                               {volume}
                            </Typography>
                        </div>
                        <Typography className={classes.subText}>
                            volume traded
                        </Typography>
                    </Box>

                </Box>

            </Box>

            <Box className={classes.marketCont}>
                <Box className={classes.control}>
                    <OutlinedInput
                        type='number'
                        className={classes.inId}
                        value={values.id}
                        onChange={handleChange('id')}
                        placeholder="ID"
                        startAdornment={<InputAdornment position="start">
                            <div 
                            className={classes.subText}
                            style={{
                                display:'flex',
                                alignContent:'center',
                                justifyContent:'center'
                            }}
                            >
                            <Icon>
                                <SearchIcon/>
                            </Icon>
                            </div>
                            </InputAdornment>}
                    />
                        <Select
                            value={valueSel}
                            onChange={handleSelect}
                            variant="outlined"
                            className={classes.inSort}
                            MenuProps={{
                                MenuListProps:{
                                    style:{
                                    backgroundColor:'#41424d',
                                    color:'white'
                                    }
                                }
                            }}
                        >
                            <MenuItem value={1}>Price: Low to High</MenuItem>
                            <MenuItem value={2}>Price High to Low</MenuItem>
                            <MenuItem value={3}>ID: Low to High</MenuItem>
                            <MenuItem value={4}>ID: High to Low</MenuItem>
                        </Select>
                </Box>
            </Box>

            <MarketList web3={web3} MarketContract={MarketContract} buyItem={buyItem} list={list} delistItem={delistItem} wallet={wallet} width={width}/>
        </Box>
    )

}

export default withWidth()(Market);