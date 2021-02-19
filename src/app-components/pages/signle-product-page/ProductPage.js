import { useState, useEffect } from "react"

// Router
import { useParams } from "react-router-dom"

// components
import AppPage from "../../../common-components/AppPage"
import ProductImagesSide from "./ProductImagesSide"
import ProductInfoSide from "./ProductInfoSide"

// material
import Grid from "@material-ui/core/Grid"

// jss styles and css
import "../../../styles/dist/product-page-styles.min.css"


export default function ProductPage({ setCartProducts, cartProducts }) {
    const [product, setProduct] = useState()

    // destructure params
    const { id } = useParams()

    // fetch current product
    useEffect(() => {
        // get the product from localStorage
        const allProducts = JSON.parse(localStorage.getItem("all-products"))
        const routedProduct = allProducts.find(product => product.id == id)

        setProduct(routedProduct)
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
        }
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
                </AppPage>
                : null}
        </>
    )
}
