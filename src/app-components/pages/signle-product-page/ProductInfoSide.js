// material
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import makeStyles from "@material-ui/core/styles/makeStyles"

// jss styles
const useStyles = makeStyles(theme => ({
    wrapper: {
        height: 420,
        borderRadius: 10,
    },
    card: {
        width: "100%",
        minHeight: "100%",
        backgroundColor: "transparent",
        textShadow: "0 0 2px #00b8ff40",
        display: "flex",
        flexDirection: "column",
    },
    price: {
        textShadow: "1.5px 1.5px 2px #ff08087a"
    },
    cardActions: {
        marginTop: "auto",

        "& .MuiButton-root": {
            width: "50%",
            minWidth: 10,
            boxSizing: "border-box",
            borderRadius: 20,
            fontWeight: 600,
            fontSize: 16,
            transition: "all .4s",
            color: "rgba(255,255,255,1)",
            height: 43,

            "&:hover": {
                color: "#222",
                // transform: "scale(1.02) translateY(-2px)"
            }
        }
    },
    buyNowBtn: {
        background: theme.palette.error.main,

        "&:hover": {
            backgroundColor: "transparent",
            border: `1px solid ${theme.palette.error.main}`,
        }
    },
    addToCartButton: {
        backgroundColor: theme.palette.info.dark,

        "&:hover": {
            backgroundColor: "transparent",
            border: `2px solid ${theme.palette.info.dark}`,
        }
    }
}))

export default function ProductInfoSide({ product, cartProducts, setCartProducts }) {
    // destructuring the product
    const { id, title, price, description } = product

    const classes = useStyles()

    // card header props
    const headerProps = {
        className: classes.header,
        title,
        action: <Typography variant="h6" color="error" className={classes.price}>{price}$</Typography>
    }

    // add the product to the cart handing
    const addToCartHandler = () => {
        setCartProducts({ ...product, quantity: 1 })
    }

    // already in cart implement
    let belongCart = cartProducts.some(item => item.id == id);


    return (
        <div className={classes.wrapper}>
            <Card className={classes.card} elevation={5}>
                <CardHeader {...headerProps} />
                <CardContent>
                    <Typography>{description}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button className={classes.buyNowBtn}>Buy Now</Button>
                    <Button
                        disabled={belongCart}
                        className={classes.addToCartButton}
                        onClick={addToCartHandler}>
                        {belongCart ? "Already in cart" : "Add to cart"}
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}
