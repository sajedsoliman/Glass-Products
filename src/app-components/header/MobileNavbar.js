import { useEffect, useRef } from 'react'

// matarial components
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Link } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';

// icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// styles
const useStyles = makeStyles(theme => ({
    drawerWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
    },
    linksMenu: {
        fontFamily: "Poppins",

        "& li": {
            height: "50px",

            "& a": {
                display: "flex",
                alignItems: "center",
                height: "100%",
                backgroundColor: "rgba(0,255,255,.6)",
                borderBottom: "1.5px solid rgba(255,255,255,.55)",
                color: "rgba(0,0,0,.7)",
                fontWeight: 530,
                paddingLeft: 10,
                boxShadow: "inset -7px 0 16px -10px rgba(0,0,0,.6)",
                transition: "all .3s",
                textDecoration: "none",

                "& svg, & i": {
                    marginRight: 8,
                    color: "black"
                },

                "&:hover": {
                    paddingLeft: 15,
                }
            },
        }
    },
    drawerControls: {
        [theme.breakpoints.down("xs")]: {
            textAlign: "right"
        },
    }
}))

export default function MobileNavbar({ open, onClose, onOpen }) {
    const classes = useStyles()

    const handleLinkClick = () => {
        onClose()
    }

    return (
        <SwipeableDrawer open={open}
            onClose={onClose}
            onOpen={onOpen}
            variant="temporary"
            anchor="right"
            BackdropProps={{ invisible: true }}
            swipeAreaWidth={30}
            className="header__mobile-navbar"
        >
            <div className={classes.drawerWrapper}>
                <div className="upper-section">
                    <div className={classes.drawerControls}>
                        <IconButton color="inherit" onClick={onClose}>
                            <ExitToAppIcon />
                        </IconButton>
                    </div>
                    <ul className={classes.linksMenu}>
                        <li><Link onClick={handleLinkClick} to="/"><i className="fas fa-home" />Home</Link></li>
                        <li><Link onClick={handleLinkClick} to="/products"><i className="fas fa-box-open" />Products</Link></li>
                        <li><Link onClick={handleLinkClick} to="/add-product"><AddCircleIcon fontSize="small" />Add Product</Link></li>
                        <li><Link onClick={handleLinkClick} to="/wish-list"><svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24"><path d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" /></svg>Wish List</Link></li>
                        <li><Link onClick={handleLinkClick} to="/cart" underline="none"><AddShoppingCartIcon />Cart</Link></li>
                    </ul>
                </div>
                <div className="down-section image-wrapper">
                    <img src="https://cdn.onlinewebfonts.com/svg/img_400462.png" alt="Shopping Cart Image" />
                </div>
            </div>
        </SwipeableDrawer>
    )
}
