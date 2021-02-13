import { useEffect, useState } from 'react'

// components
import AppPage from '../../../common-components/AppPage'
import ProductBox from '../../../common-components/ProductBox'

// material components
import makeStyles from "@material-ui/core/styles/makeStyles"
import { Slide } from '@material-ui/core'

// jss styles
const useStyles = makeStyles(theme => ({}))

export default function WishListPage({ products, setFavoriteProducts, handleAlert }) {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

    const classes = useStyles()

    return (
        <AppPage
            title="Your Wishes"
            subTitle="Here you can find your wishes products (I hope you can afford buying them :))"
            needScrollTop={false}
            withSearch={products.length > 20 ? true : false}
            label="Search Product"
            search={search}
            setSearch={setSearch}
            page={page}
            setPage={setPage}
            products={products}
            limit={4}
            handleAlert={handleAlert}
            noProductsMessage="You don't wish any item. look around so you may wish something :)"
            productBoxInfo={{
                needFavoriteAddition: true,
                favoriteProducts: products,
                setFavoriteProducts,
                needCartAddition: false
            }}
        />
    )
}