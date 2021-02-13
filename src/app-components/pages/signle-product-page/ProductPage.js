import { useState, useEffect } from "react"

// Router
import { useParams } from "react-router-dom"

// components
import AppPage from "../../../common-components/AppPage"
import ProductImagesSide from "./ProductImagesSide"
import ProductInfoSide from "./ProductInfoSide"
import PopUp from "../../../common-components/PopUp"
import FullScreenSlider from "./FullScreenSlider"

// material
import Grid from "@material-ui/core/Grid"

// jss styles and css
import "../../../styles/dist/product-page-styles.min.css"


export default function ProductPage({ setCartProducts, cartProducts }) {
    const [product, setProduct] = useState()
    const [fullscreenSlider, setFullscreenSlider] = useState(false)

    // destructure params
    const { id } = useParams()

    // fetch current product
    useEffect(async () => {
        // fetch the product
        const res = await fetch(`http://localhost:5500/products/${id}`)
        const data = await res.json();

        setProduct(data)
    }, [])

    const appPageProps = {
        title: "Product Page",
        subTitle: "Here you can see more details about a product",
        needScrollTop: false,
        needPagination: false,
        products: [],
    }

    let imagesSliderProps;
    if (product) {
        imagesSliderProps = {
            images: [product.imgSrc, ...product.images],
            setFullscreenSlider
        }
    }

    // popup props
    const fullscreenSliderProps = {
        formFunc: {
            title: "Product Images Fullscreen Slider",
            isOpen: fullscreenSlider
        },
        closeHandle: () => setFullscreenSlider(false),
        maxWidth: "lg",
        dividers: false,
        contentStyles: "fullscreen-dialog-content"
    }

    return (
        <>
            {product ?
                <AppPage {...appPageProps}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <ProductImagesSide {...imagesSliderProps} sliderHeight={420} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ProductInfoSide product={product} cartProducts={cartProducts} setCartProducts={setCartProducts} />
                        </Grid>
                    </Grid>
                    <PopUp {...fullscreenSliderProps}>
                        <FullScreenSlider sliderHeight={"80vh"} {...imagesSliderProps} />
                    </PopUp>
                </AppPage>
                : null}
        </>
    )
}
