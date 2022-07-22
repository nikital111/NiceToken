import { InputAdornment, OutlinedInput, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// @ts-ignore: Unreachable code error
import EthImg from '../images/eth2-img.svg';
const NTImg = require("../images/NT.png");
interface Input {
    type: Boolean,
    changeAmountSend?: (event: any) => void,
    amountSend?: number,
    changeAmountGet?: (event: any) => void,
    amountGet?: number,
    setAmountSend: any,
    setAmountGet: any,
    balance: number,
    width: string
}

const InputCrowdSale = ({ type, changeAmountSend, amountSend,changeAmountGet, amountGet, setAmountSend, setAmountGet, balance, width }: Input) => {

    const setMax = () => {
    setAmountSend(balance);
    setAmountGet(balance*10000);
    }

    const useStyles = makeStyles((theme) => ({
        in: {
            width: '100%',
            height: '70px',
            color: 'rgb(249, 249, 253)',
            fontSize: width === 'xs' ? '14px' : '16px',
            "& img": {
                width: width === 'xs' ? '35px' : '50px',
                height: width === 'xs' ? '35px' : '50px',
                marginRight: width === 'xs' ? '4px' : '5px'
            },
            "& input": {
                fontSize: width === 'xs' ? '19px' : '24px'
            },
            "& fieldset": {
                border: 'none',
                boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 8px'
            },
            "&.MuiOutlinedInput-root":{
                borderRadius:'20px'
            }
        }
    }));
    const classes = useStyles();

    return (
        <>
            {
                type ?
                    <OutlinedInput
                        className={classes.in}
                        type="number"
                        onChange={changeAmountSend}
                        value={amountSend}
                        startAdornment={
                            <InputAdornment position='start'>
                                <img src={EthImg} />
                                You send:
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position='end'>
                                <Typography 
                                variant='h6'
                                onClick={setMax}
                                style={{
                                    cursor:'pointer',
                                    fontSize: width === 'xs' ? '19px' : '1.25rem'
                                }}
                                >
                                    Max
                                </Typography>
                            </InputAdornment>
                        }
                    />
                    :
                    <OutlinedInput
                        className={classes.in}
                        type="number"
                        onChange={changeAmountGet}
                        value={amountGet}
                        startAdornment={
                            <InputAdornment position='start'>
                                <img src={NTImg} />
                                You get:
                            </InputAdornment>
                        }
                    />
            }
        </>
    )
}

export default InputCrowdSale;