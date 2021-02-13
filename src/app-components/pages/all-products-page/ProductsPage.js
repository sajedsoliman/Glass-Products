import React, { useState } from 'react'

// material components
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

// components
import AppPage from '../../../common-components/AppPage'
import ProductBox from '../../../common-components/ProductBox'
import Pagination from '../../../common-components/Pagination'

const useStyles = makeStyles(theme => ({
    gridContainer: {
        "@media (min-width: 500px) and (max-width: 590px)": {

            "& .MuiGrid-item": {
                width: "55%",
                flexBasis: "50%",
                padding: 6,
            },
            "& .MuiPaper-root": {
                minHeight: 260
            }
        },
    },
    noProductsHeading: {
        marginBottom: 30,
        [theme.breakpoints.down("750")]: {
            fontSize: "1.1em",
            lineHeight: 1.5
        }
    }
}))

export default function ProductsPage({ setCartProducts, cartProducts, favoriteProducts, setFavoriteProducts, products, handleAlert }) {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

    return (
        <AppPage
            title="All Products"
            subTitle="Products by all sellers"
            withSearch={true}
            setSearch={setSearch}
            search={search}
            label="Search Product"
            page={page}
            setPage={setPage}
            limit={4}
            needPagination={true}
            products={products}
            handleAlert={handleAlert}
            noProductsMessage="Couldn't find your wish. contact us if you need more help :)"
            productBoxInfo={{
                needFavoriteAddition: true,
                needCartAddition: true,
                setCartProducts,
                cartProducts,
                favoriteProducts,
                setFavoriteProducts,
            }}
        />
    )
}
