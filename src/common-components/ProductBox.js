// router import
import { Link } from "react-router-dom"

import { useState } from "react"

// component
import DarkTooltip from ".././common-components/DarkTooltip"

// import scroll bar
import { Scrollbar, ScrollbarProps } from "react-scrollbars-custom"

// material components
import Grid from "@material-ui/core/Grid"
import Collapse from "@material-ui/core/Collapse"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import Fade from "@material-ui/core/Fade"

// icons
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

// jss styles
const useStyles = makeStyles(theme => ({
    productCard: {
        maxHeight: 320,
        minHeight: 300,
    },
    cardImg: {
        paddingTop: "50%",
        transition: "all .3s",
        backgroundPosition: "center top -20px",
        [theme.breakpoints.down("sm")]: {
            backgroundPosition: "center center",
        },

        "&:hover": {
            backgroundPosition: "center center"
        }
    },
    productPrice: {
        fontSize: 14.5,
    },
    productTitle: {
        fontSize: 17,
        marginTop: -2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    cardContent: {
        padding: 10
    },
    productActions: {
        padding: "0 10px",
        justifyContent: "space-between",
    },
    collapsedContent: {
        paddingBottom: "10px !important"
    }
}))


// remove from cart fadeness

export default function ProductBox({ product, needCartAddition, needFavoriteAddition = true, setCartProducts, cartProducts, favoriteProducts, setFavoriteProducts, handleAlert }) {
    const [expandedDescription, setExpand] = useState(false)
    const [fadeEffect, setFadeEffect] = useState(true)

    // product destructuring
    const { id, title, description, imgSrc, price } = product

    // handle open expanded description
    const handleExpandOpen = () => {
        setExpand(!expandedDescription)
    }

    // implement favorite proudcts
    let belongFavorites
    let favoriteIcon
    if (needFavoriteAddition) {
        belongFavorites = favoriteProducts.some(product => product.id == id);
        favoriteIcon = belongFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />;
    }

    // implement add to cart icon
    let belongCart
    let cartIcon
    if (needCartAddition) {
        belongCart = cartProducts.some(product => product.id == id)
        cartIcon = belongCart ? <RemoveShoppingCartIcon /> : <AddShoppingCartIcon />
    }

    // add/delete localStorage Function
    const handleLocalStorage = (product, setFunc, where) => {
        const currentPage = window.location.pathname;

        if (currentPage == "/wish-list") {
            setFadeEffect(false)
            handleAlert("success", `Removed From ${where}`)
            setTimeout(() => {
                setFunc(product)
                setFadeEffect(true)
            }, 200)
        } else if (currentPage == "/cart") {
            setFadeEffect(false)
            handleAlert("success", `Removed from ${where}`)
            setTimeout(() => {
                setFunc(product)
                setFadeEffect(true)
            }, 200)
        } else {
            if (where == "cart") {
                handleAlert("success", `${belongCart ? "Removed From" : "Added to"} ${where}`)
                setFunc({ ...product, quantity: 1 })
                setFadeEffect(true)
            } else if (where == "wish list") {
                handleAlert("success", `${belongFavorites ? "Removed From" : "Added to"} ${where}`)
                setFunc(product)
                setFadeEffect(true)
            }
            setFadeEffect(true)
        }
    }

    const classes = useStyles()


    return (
        <Fade in={fadeEffect}>
            <Grid item xs={12} sm={6} md={3} xl={3} key={id}>
                <Card className={classes.productCard} variant="elevation" raised>
                    <Scrollbar noDefaultStyles>
                        {/* Product cover */}
                        <CardMedia title={title}
                            image={imgSrc}
                            className={classes.cardImg}
                        />

                        {/* Product Content (title + price + controls) */}
                        <CardContent className={classes.cardContent}>
                            <Typography className={classes.productPrice} color='error'>{price}$</Typography>
                            <Typography style={{ fontSize: title.length > 47 ? 15 : 17 }} className={classes.productTitle} variant="h6">
                                {title}
                                {needFavoriteAddition ?
                                    <IconButton color={belongFavorites ? "secondary" : "default"} onClick={() =>
                                        handleLocalStorage(product, setFavoriteProducts, "wish list")}
                                    >
                                        <DarkTooltip title={belongFavorites ? "Remove" : "Add"}>
                                            {favoriteIcon}
                                        </DarkTooltip>
                                    </IconButton> : null}
                            </Typography>
                        </CardContent>

                        {/* Product Actions (buy, more info, add to cart and etc...) */}
                        <CardActions className={classes.productActions}>
                            <div>
                                <Button variant="contained"
                                    color="secondary"
                                    size="small"
                                    component={Link}
                                    to={`/products/${id}`}
                                    // href={`/products/${id}`}
                                    startIcon={<ShoppingBasketIcon />}>Buy Now</Button>
                                <Tooltip placement="top" title="More Info">
                                    <IconButton onClick={handleExpandOpen}>
                                        {expandedDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </IconButton>
                                </Tooltip>
                            </div>
                            {needCartAddition ?
                                <DarkTooltip title={belongCart ? "Remove from cart" : "Add to cart"}>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleLocalStorage(product, setCartProducts, "cart")}>
                                        {cartIcon}
                                    </IconButton>
                                </DarkTooltip> : null
                            }
                        </CardActions>
                        {/* More Info about the products collapable area */}
                        <Collapse in={expandedDescription}>
                            <CardContent className={classes.collapsedContent}>
                                <Typography paragraph>{description}</Typography>
                                <IconButton onClick={handleExpandOpen}>
                                    <ExpandLessIcon />
                                </IconButton>
                            </CardContent>
                        </Collapse>
                    </Scrollbar>
                </Card>
            </Grid>
        </Fade>
    )
}