import { useState } from "react"

// components
import AppPage from "../../../common-components/AppPage"
import ProductBox from "../../../common-components/ProductBox"
import Pagination from "../../../common-components/Pagination"

// material components
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import makeStyles from "@material-ui/core/styles/makeStyles"

// jss styles
const useStyles = makeStyles(theme => ({
    gridContainer: {
        "@media (min-width: 400px) and (max-width: 590px)": {

            "& .MuiGrid-item": {
                width: "55%",
                flexBasis: "50%",
                padding: 6,

                "& .MuiPaper-root": {
                    minHeight: 260
                }
            }
        },
    },
}))

export default function CartPage(props) {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

    // props destructuring
    const { cartProducts, setCartProducts, handleAlert, setDocTitle } = props

    setDocTitle("Cart")

    const classes = useStyles()

    // page props
    const pageProps = {
        title: "Your Cart",
        subTitle: "Here you can find all products that you've added to your cart.",
        withSearch: cartProducts.length > 50 ? 1 : 0,
        label: "Search Cart",
        search,
        setSearch,
        page,
        setPage,
        limit: 4,
        handleAlert,
        noProductsMessage: "You have no item in you your cart. hang out so you may like something :)",
        products: cartProducts,
        productBoxInfo: {
            needFavoriteAddition: false,
            needCartAddition: true,
            setCartProducts,
            cartProducts: cartProducts
        }
    }

    return (
        <AppPage {...pageProps} />
    )
}
