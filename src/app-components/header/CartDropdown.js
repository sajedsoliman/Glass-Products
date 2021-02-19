// components
import DropDown from '../../common-components/Dropdown'
import CartProduct from './CartProduct'
import DarkTooltip from '../../common-components/DarkTooltip'

// material components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// jss Styles
const useStyles = makeStyles(theme => ({
    listItem: {
        paddingTop: 0,
        paddingBottom: 4,
        marginBottom: 3
    },
    totalPrice: {
        padding: "8px 5px 15px",
        "& span": {
            color: theme.palette.secondary.main
        }
    },
    clearAllbtn: {
        marginBottom: 2
    }
}))

export default function CartDropdown(props) {
    const classes = useStyles()

    // props destructuring
    const { products, onClose, open, setCartProducts, updateQuantity } = props

    // clear all cart products handling
    const handleClearAll = () => {
        setCartProducts([], true)
    }


    // map through products
    const mappedProducts = products.map(product => {
        return (
            <Fragment key={product.id}>
                <ListItem className={classes.listItem} disableGutters dense>
                    <CartProduct product={product} cartProducts={products} setCartProducts={setCartProducts} updateQuantity={updateQuantity} />
                </ListItem>
            </Fragment>
        )
    })

    const totalPrice = products.reduce((total, product) => total += parseFloat(product.price * product.quantity), 0)

    return (
        <DropDown open={open}
            title="Your Cart Products"
            transitionDirection="down"
            onClose={onClose}
            className="cart__dropdown">
            <List>
                {mappedProducts}
            </List>
            <Typography className={classes.totalPrice}>Total Price: <span>{totalPrice}</span>$ &nbsp;
                <DarkTooltip placement="right" title="Clear All">
                    <IconButton className={classes.clearAllbtn} onClick={handleClearAll}>
                        <DeleteForeverIcon />
                    </IconButton>
                </DarkTooltip>
            </Typography>
        </DropDown>
    )
}