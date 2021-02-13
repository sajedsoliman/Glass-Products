// components
import DropDown from '../../common-components/Dropdown'
import CartProduct from './CartProduct'

// material components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useState, useEffect, Fragment } from 'react';
import { Typography } from '@material-ui/core';

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
    }
}))

export default function CartDropdown(props) {
    const classes = useStyles()

    // props destructuring
    const { products, onClose, open, setCartProducts, updateQuantity } = props

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
            <Typography className={classes.totalPrice}>Total Price: <span>{totalPrice}</span>$</Typography>
        </DropDown>
    )
}