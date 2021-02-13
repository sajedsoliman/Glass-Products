import React, { useEffect, useState } from 'react'
import "../../styles/dist/header.min.css"

// components
import MobileNavbar from "./MobileNavbar"
import HeaderControls from "./HeaderControls"
import NavbarNav from "./NavbarNav"
import CartDropdown from './CartDropdown'


// matarial components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';


// icons

// jss styles
const useStyles = makeStyles(theme => ({
    header: {
        position: "relative",
        fontFamily: "Poppins",
        overflow: "visible",

        "& a": {
            textDecoration: "none",
        }
    },
    headerControls: {
        justifyContent: "flex-end",

        [theme.breakpoints.up("sm")]: {
            "& button:first-child": {
                display: "none"
            }
        }
    }
}))


export default function AppHeader({ cartProducts, setCartProducts, updateQuantity }) {
    const [mobileNav, setMobileNav] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)

    // handle cart open when products change
    useEffect(() => {
        if (cartOpen && cartProducts.length == 0) {
            setCartOpen(false)
        }
    }, [cartProducts])

    // handle opening mobile navbar
    const handleMobileNavOpen = () => {
        setMobileNav(true)
    }

    // handle closeing mobile navbar
    const handleMobileNavClose = () => {
        setMobileNav(false)
    }

    // jss styles
    const classes = useStyles()

    return (
        <AppBar className={classes.header} position="relative" elevation={0} color="transparent">
            <Grid container>
                <Grid item xs={7} sm={12} md={8}>
                    {/* Wide screen (desktop screens) header's nav */}
                    <NavbarNav />
                </Grid>
                <Grid item xs={5} sm={12} md={4}>
                    {/* Header Controls's toolbar */}
                    <Toolbar className={classes.headerControls}>
                        {/* because it's (drawer) transparent the controls will appear behind them. so i did this to aviod that problem */}
                        {!mobileNav ? <HeaderControls cartProducts={cartProducts} cartOpen={cartOpen} setCartOpen={setCartOpen} openMobileNavHandler={handleMobileNavOpen} /> : null}
                    </Toolbar>
                </Grid>
            </Grid>
            {/* narrow secreens (mobile screens) header's Drawer */}
            <MobileNavbar open={mobileNav} onClose={handleMobileNavClose} onOpen={handleMobileNavOpen} />

            {/* card dropdown */}
            <CartDropdown
                products={cartProducts}
                open={cartOpen}
                onClose={() => setCartOpen(false)}
                setCartProducts={setCartProducts}
                updateQuantity={updateQuantity}
            />
        </AppBar>
    )
}
