import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputAdornment, FormHelperText, InputLabel, MenuItem, OutlinedInput, Typography, withWidth, Icon, Backdrop } from '@material-ui/core';
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
import ListItem from '../scripts/nft/ListItem';
import InventoryList from '../components/InventoryList';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import Approve from '../scripts/nft/Approve';
import getApprove from '../scripts/nft/getApprove';
import DescriptionIcon from '@mui/icons-material/Description';
interface InventoryInt {
    web3: any,
    MarketContract: string,
    NFTContract: string,
    balance: number,
    width: string,
    handleOpen: (text: string) => void,
    formatAddress: (address: string) => string,
    copyText: (text: string) => void,
}
const url = "https://ipfs.io/ipfs/Qmd54YbBbxY5MSfLWS2G68jzD7fQAZM5V6LWY2ihK1W8uo?filename=myNft1232.jpg";
const Inventory = ({ web3, MarketContract, NFTContract, balance, width, handleOpen, formatAddress, copyText }: InventoryInt) => {

    const [tokens, setTokens] = useState([]);
    const [list, setList]: any = useState([]);
    const [copyList, setCopyList] = useState([]);

    const [sellOpened, setSellOpened] = useState(false);
    const [approved, setApproved] = useState('');
    const [sellState, setSellState]: any = useState({
        id: 0,
        value: '',
        description: '',
        sellEnd: 0,
    });

    const getListf = async () => {
        const data: any = await GetList(web3, MarketContract);
        setCopyList(data);
        setList(data);
    };

    const getApproved = async (id: number) => {
        const ap = await getApprove(web3, NFTContract, id);
        setApproved(ap);
    }

    useEffect(() => {
        getTokensOwned(web3, NFTContract, setTokens);
        getListf();
    }, []);

    useEffect(() => {
        console.log(approved)
    }, [approved])

    const listItemf = async () => {
        await ListItem(web3, MarketContract, sellState.id, sellState.value, sellState.description, sellState.sellEnd);
        closeSellf();
    };

    const approvef = async () => {
        await Approve(web3, NFTContract, MarketContract, sellState.id);
        getApproved(sellState.id);
    };

    const openSellf = (id: number) => {
        getApproved(id);
        setSellOpened(true);
        setSellState({ ...sellState, id: id });
    };

    const closeSellf = () => {
        setSellOpened(false);
        setSellState({
            id: 0,
            value: '',
            description: '',
            sellEnd: 0,
        });
    };

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
            borderRadius: '5px'
        },
        textCont: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        imgEth: {
            width: '24px',
            height:'24px'
        },
        statCont: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            padding: '25px',
            width: '110px'
        },
        mainText: {
            fontSize: "20px",
        },
        subText: {
            fontSize: "16px",
            color: "#BDC0C6"
        },
        marketCont: {
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
        },
        control: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        },
        in: {
            color: 'white',
            marginBottom: '15px',
            minWidth: '200px',
            width: '100%',
            alignSelf: 'flex-start',
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
        inSort: {
            color: 'white!important',
            minWidth: '182px',
            '& svg': {
                color: 'white'
            },
            '& fieldset': {
                borderColor: '#18507A'
            },
            '&:hover fieldset': {
                borderColor: '#2986CC!important'
            }
        },
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
            position:'relative'
        },
        title: {
            color: 'white',
            fontSize: '17px',
            alignSelf: 'flex-start',
            margin: '10px 0px 7px 3px'
        },
        date: {
            "& .MuiInputLabel-root": {
                color: 'white!important'
            },
            "& .MuiOutlinedInput-root": {
                color: 'white',
                border: "1px #18507A solid"
            },
            "& .MuiButtonBase-root": {
                color: 'white'
            },
            '&:hover .MuiOutlinedInput-root': {
                borderColor: '#2986CC!important'
            },
            width: '100%'
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
        close: {
            color:'red',
            position:'absolute',
            right:'30px',
            top:'30px',
            fontSize:'16px',
            cursor:'pointer'
        }
    }));
    const classes = useStyles();

    return (
        <>
            <Backdrop className={classes.back} open={sellOpened}>
                <Box className={classes.contBack}>
                    <Typography
                    className={classes.close}
                    onClick={closeSellf}
                    >
                        X
                    </Typography>
                    <img src={url} className={classes.image} />

                    <Typography
                        variant={width === "xs" ? 'h5' : 'h4'}
                        style={{
                            color: '#fff',
                            marginTop: '10px'
                        }}
                    >
                        Nice Monkeys #{sellState.id}
                    </Typography>


                    <Typography className={classes.title}>
                        Price
                    </Typography>

                    <OutlinedInput
                        type='number'
                        className={classes.in}
                        value={sellState.value}
                        onChange={(e) => setSellState({ ...sellState, value: e.target.value })}
                        placeholder="Value"
                        startAdornment={<InputAdornment position="start">
                            <div
                                className={classes.subText}
                                style={{
                                    display: 'flex',
                                    alignContent: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <img src={EthImg} className={classes.imgEth}/>
                            </div>
                        </InputAdornment>}
                    />

                    <Typography className={classes.title}>
                        Description
                    </Typography>

                    <OutlinedInput
                        type='text'
                        className={classes.in}
                        value={sellState.description}
                        onChange={(e) => setSellState({ ...sellState, description: e.target.value })}
                        placeholder="Description"
                        startAdornment={<InputAdornment position="start">
                            <div
                                className={classes.subText}
                                style={{
                                    display: 'flex',
                                    alignContent: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Icon>
                                    <DescriptionIcon />
                                </Icon>
                            </div>
                        </InputAdornment>}
                    />

                    <Typography className={classes.title}>
                        End sale
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            value={sellState.end}
                            onChange={(e) => setSellState({ ...sellState, sellEnd: +e })}
                            renderInput={(params) => <TextField {...params} className={classes.date} />}
                        />
                    </LocalizationProvider>

                    <Button
                        className={classes.butt}
                        variant='contained'
                        onClick={approved === MarketContract ? listItemf : approvef}
                        disabled={(!sellState.value || !sellState.description || !sellState.sellEnd) && approved === MarketContract}
                    >
                        {approved === MarketContract ? "Sell" : "Approve"}
                        
                    </Button>

                </Box>
            </Backdrop>

            <Box className={classes.mainCont}>
                <Box className={classes.inCont}>

                    <Typography
                        variant={width === "xs" ? 'h5' : 'h4'}
                        style={{
                            color: '#fff',
                            marginTop: '10px'
                        }}
                    >
                       Your Inventory
                    </Typography>

                </Box>


                <Box className={classes.marketCont}>

                </Box>

                <InventoryList web3={web3} MarketContract={MarketContract} list={tokens} openSell={openSellf} width={width} />
            </Box>
        </>
    )

}

export default withWidth()(Inventory);