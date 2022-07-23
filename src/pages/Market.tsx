import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputAdornment,FormHelperText, InputLabel, MenuItem, OutlinedInput, Typography, withWidth, Icon } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import Select from "@mui/material/Select";
import { makeStyles } from '@material-ui/core/styles';
// @ts-ignore: Unreachable code error
import EthImg from '../images/eth2-img.svg';
import MarketList from '../components/MarketList';

interface MarketInt {
    web3: any,
    MarketContract: string,
    NFTContract: string,
    balance: number,
    width: string,
    handleOpen: (text: string) => void,
    formatAddress: (address: string) => string,
    copyText: (text: string) => void,
}

const Market = ({ web3, MarketContract, NFTContract, balance, width, handleOpen, formatAddress, copyText }: MarketInt) => {

    const [values, setValues] = useState({
        id: '',
        sort: '',
    });

    const [valueSel, setValueSel] = useState(1);

    const handleChange = (title: string) => (e: any) => {
        setValues({ ...values, [title]: e.target.value });
    };

    const handleSelect = (e: any) => {
        setValueSel(e.target.value);
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
            padding: '25px',
            width:'110px'
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
        control:{
            width:'100%',
            display:'flex',
            justifyContent:'center'
        },
        inId: {
            color: 'white',
            marginRight:'15px',
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
                        marginTop: '10px'
                    }}
                >
                    <Box
                        className={classes.statCont}
                        style={{
                            borderRight: '1px solid black'
                        }}
                    >
                        <Typography className={classes.mainText}>
                            3
                        </Typography>
                        <Typography className={classes.subText}>
                            items
                        </Typography>
                    </Box>
                    <Box
                        className={classes.statCont}
                        style={{
                            borderRight: '1px solid black'
                        }}
                    >
                        <div className={classes.textCont}>
                            <img src={EthImg} className={classes.imgEth} />
                            <Typography className={classes.mainText}>
                                0.2
                            </Typography>
                        </div>
                        <Typography className={classes.subText}>
                            floor price
                        </Typography>
                    </Box>
                    <Box
                        className={classes.statCont}
                        style={{

                        }}
                    >
                        <div className={classes.textCont}>
                            <img src={EthImg} className={classes.imgEth} />
                            <Typography className={classes.mainText}>
                                1.4
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

            <MarketList web3={web3} MarketContract={MarketContract} sort={valueSel} search={+values.id} width={width}/>
        </Box>
    )

}

export default withWidth()(Market);