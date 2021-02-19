import { useRef } from "react"

// react router
import { Link } from "react-router-dom"

// material components
import Badge from "@material-ui/core/Badge"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles, Typography } from "@material-ui/core"

// icons
import MenuIcon from "@material-ui/icons/Menu"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// jss styling
const useStyles = makeStyles(theme => ({
    headerControlsWrapper: {
        position: "relative"
    }
}))

export default function HeaderControls({ openMobileNavHandler, cartProducts, cartOpen, setCartOpen }) {
    const classes = useStyles()

    const linkToCartRef = useRef()

    // cart appearance
    const handleCartOpen = () => {
        if (window.innerWidth < 980) {
            linkToCartRef.current.click()
        } else {
            setCartOpen(!cartOpen)
        }
    }

    return (
        <>
            <div>
                <IconButton color="inherit" onClick={openMobileNavHandler}>
                    <MenuIcon />
                </IconButton>
                <IconButton color="inherit" onClick={handleCartOpen}>
                    <Badge color="primary"
                        variant="standard"
                        overlap="rectangle"
                        showZero
                        badgeContent={cartProducts.length}
                        max={99}>
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <Typography variant="srOnly">
                    <Link ref={linkToCartRef} to="/cart">hidden cart link</Link>
                </Typography>
            </div>
        </>
    )
}
