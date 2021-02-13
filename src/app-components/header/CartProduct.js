import React, { useState } from 'react'

// components
import QuantityControl from '../../common-components/controls/QuantityControl';

// material components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

// icons

// jss styles
import makeStyles from '@material-ui/core/styles/makeStyles';
const useStyles = makeStyles(theme => ({
    productCard: {
        width: "100%",
        borderRadius: 0,
    },
    cardImg: {
        width: "100%",
        height: 90,
    },
    productContent: {
        display: "flex",
        justifyContent: "space-between",
        paddingRight: 3,
        paddingLeft: 3,
    },
    cardContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "inherit",
        padding: 8,
        paddingRight: 4,
        paddingLeft: 4
    },
    productTitle: {
        fontSize: "1.05rem"
    },
    qantityColumn: {
        marginBottom: 6,
        maxWidth: 30
    },
    deleteProductBtn: {
        display: "block !important",
        marginLeft: "27px !important",

        "& svg": {
            fill: theme.palette.secondary.main
        }
    }
}))

export default function CartProduct({ product, setCartProducts, updateQuantity }) {
    const [productSlide, setProductSlide] = useState(true)

    // product destructuring
    const { id, imgSrc, title, price, quantity } = product

    const classes = useStyles()

    // handle delete the product
    const deleteProductHandler = (id) => {
        setProductSlide(false)
        setTimeout(() => {
            setCartProducts(product)
        }, 300)
    }

    const quantityControlProps = {
        updateQuantity,
        quantity,
        product,
        setProductSlide,
        orientation: "column",
        className: classes.qantityColumn
    }


    return (
        <Slide in={productSlide} direction="left" timeout={{ enter: 250, exit: 300 }}>
            <Card variant="outlined" className={classes.productCard}>
                <Grid container spacing={1} style={{ marginBottom: -9.5 }}>
                    <Grid item xs={3}>
                        <CardMedia className={classes.cardImg} title={title} image={imgSrc} />
                    </Grid>
                    <Grid item xs={9} className={classes.productContent}>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="h6" className={classes.productTitle}>{title}</Typography>
                            <Typography color="error">{price}$</Typography>
                        </CardContent>
                        <CardActions>
                            {/* updateQuantity, setProductSlide */}
                            <QuantityControl {...quantityControlProps} />
                            <IconButton className={classes.deleteProductBtn}
                                onClick={() => deleteProductHandler(id)}>
                                <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z" /></svg>
                            </IconButton>
                        </CardActions>
                    </Grid>
                </Grid>
            </Card>
        </Slide>
    )
}
