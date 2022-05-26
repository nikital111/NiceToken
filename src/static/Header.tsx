import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, Typography, withWidth } from '@material-ui/core';
import "./Header.css"
import MailIcon from '@mui/icons-material/Mail';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@mui/icons-material/Menu';
const NTImg = require("../images/NT.png");

interface IHeader {
    wallet: string,
    connectW: () => void,
    width: string,
    handleOpen: (text: string) => void,
    formatAddress: (address:string) => string,
    copyText: (text: string) => void,
}

const Header = ({ wallet, connectW, width, handleOpen, formatAddress, copyText }: IHeader) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open: boolean) => {
        setIsOpen(open);
    }

    const StyledSwipeableDrawer = withStyles({
        paper: {
            backgroundColor: "rgb(35, 36, 47)",
            color: 'white!important',
            width: width === "xs" ? "100%" : "250px",
            "&.MuiListItem-root": {
                color: "white"
            }
        }
    })(SwipeableDrawer);

    const useStyles = makeStyles((theme) => ({
        header: {
            width: "100%",
            height: "70px",
            position: "absolute",
            top: "0px",
            right: "0px",
            left: "0px",
            backgroundColor: "rgb(35, 36, 47)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        cont: {
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "40px"
        },
        links: {
            color: "white",
            textDecoration: "none",
            fontSize: "14px",
            margin: "0px 10px",
            width: "70px",
            height: "20px",
            padding: "5px",
            borderRadius: "10px",
            border: "1px white solid",
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            "&:hover": {
                color: "#FFD966",
                borderColor: "#FFD966",
            },
        },
        divC: {
            color: "#fff",
            cursor: "pointer",
            display: 'flex',
            justifyContent: "flex-end",
            alignItems: 'stretch'
        },
        divNC: {
            color: "#fff",
            cursor: "pointer",
        },
        contI: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            marginLeft: "20px"
        },
        contC: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        contCC: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: "20px"
        },
        listIcon: {
            color: "white"
        },
    }));
    const classes = useStyles();

    const list = () => (
        <Box
            role="presentation"
            onClick={() => toggleDrawer(false)}
            onKeyDown={() => toggleDrawer(false)}
        >
            <List>
                <NavLink to='/' className="listIcon" style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Buy Token"} />
                    </ListItem>
                </NavLink>
                <NavLink to='/mintnft' className="listIcon" style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Mint NFT"} />
                    </ListItem>
                </NavLink>
                <NavLink to='/market' className="listIcon" style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem button>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Market"} />
                    </ListItem>
                </NavLink>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={()=>copyText(wallet)}>
                    <ListItemIcon>
                        <ContentCopyIcon className={classes.listIcon} />
                    </ListItemIcon>
                    <ListItemText primary={formatAddress(wallet)} />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <StyledSwipeableDrawer
                anchor="right"
                open={isOpen}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
            >
                {list()}
            </StyledSwipeableDrawer>

            <header className={classes.header}>
                <div className={classes.contI}>
                    <img src={NTImg} style={{ width: '40px' }} />
                </div>

                {width === "xs" ?
                    <Button
                        onClick={() => toggleDrawer(true)}
                    >
                        <IconButton>
                            <MenuIcon style={{ color: 'white' }} />
                        </IconButton>
                    </Button>
                    :
                    <div className={classes.contCC}>
                        <div className={classes.cont}>
                            <NavLink to='/' className={classes.links}>
                                Buy Token
                            </NavLink>
                            <NavLink to='/mintnft' className={classes.links}>
                                Mint NFT
                            </NavLink>
                            <NavLink to='/market' className={classes.links}>
                                Market
                            </NavLink>
                        </div>
                        <div className={classes.contC}>
                            {wallet ?
                                <div className={classes.divC} onClick={()=>copyText(wallet)}>
                                    {formatAddress(wallet)}
                                    <ContentCopyIcon className={classes.listIcon} style={{width:"20px",height:"17px"}}/>
                                </div>
                                :
                                <div
                                    className={classes.divNC}
                                    onClick={connectW}
                                >
                                    Connect wallet
                                </div>
                            }
                        </div>
                    </div>
                }

            </header>
        </>
    )
}

export default withWidth()(Header);