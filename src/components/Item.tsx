import { Box, Button, InputAdornment, OutlinedInput, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withWidth from "@material-ui/core/withWidth";
import React, { useEffect, useState } from 'react';
// @ts-ignore: Unreachable code error
import EthImg from '../images/eth2-img.svg';
const NTImg = require("../images/NT.png");

interface IItem {
    id: number,
    price: number,
    endSale: number,
    description: string,
    img: string,
    seller: string,
    buyItem: (id: number, val: number) => {},
    delistItem: (id: number) => {},
    web3: any,
    width: string
}

const Item = ({ id, price, endSale, description, img, seller, buyItem, delistItem, web3, width }: IItem) => {

    const [acc, setAcc] = useState('');

    const getAcc = async () => {
        const [acc1] = await web3.eth.getAccounts();
        setAcc(acc1);
    };

    useEffect(() => {
        getAcc();
    }, [])

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
            margin: "10px 0px 0px 10px"
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

    const getDate = () => {
        const dateNow = Date.now();
        const dateEnd = endSale * 1000;

        if (dateEnd - dateNow > 86400000) {
            const dif = (dateEnd - dateNow) / 86400000;
            const days = Math.floor(dif);
            return `${days} days`;
        }
        else if (dateEnd - dateNow > 3600000) {
            const dif = (dateEnd - dateNow) / 3600000;
            const hours = Math.floor(dif);
            return `${hours} hours`;
        }
        else {
            const dif = (dateEnd - dateNow) / 60000;
            const mins = Math.floor(dif);
            return `${mins} minutes`;
        }
    };


    if ((endSale * 1000 < Date.now()) && seller !== acc) {
        return (
            <></>
        )
    }
    else {
        return (
            <Box className={classes.item}>
                <img src={img} className={classes.img} />

                <Box className={classes.titleCont}>
                    <Typography className={classes.title}>
                        NiceMonkeys #{id}
                    </Typography>
                </Box>

                <Box className={classes.priceCont}>

                    <Typography className={classes.price}>
                        Price
                    </Typography>

                    <Box
                        style={{
                            display: 'flex'
                        }}
                    >
                        <img src={EthImg} style={{ width: "11px", marginRight: '3px' }} />
                        <Typography className={classes.price}>
                            {web3.utils.fromWei(price)}
                        </Typography>
                    </Box>

                </Box>

                <Box className={classes.end}>
                    Ends in {getDate()}
                </Box>

                {
                    seller === acc ?
                        <Button
                            className={classes.butt}
                            variant='contained'
                            style={{
                                backgroundColor: "red"
                            }}
                            onClick={() => delistItem(id)}
                        >
                            Delist
                        </Button>
                        :
                        <Button
                            className={classes.butt}
                            variant='contained'
                            onClick={() => buyItem(id, price)}
                        >
                            Buy Now
                        </Button>
                }

            </Box>
        )
    }




}

export default Item;