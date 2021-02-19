import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group";

// other info
import testProducts from "./testProducts"

// compoennts
import AppHeader from './app-components/header/AppHeader'
import NotificationSnackbar from './common-components/NotificationSnackbar'
import ProductsPage from './app-components/pages/all-products-page/ProductsPage'
import ProductPage from './app-components/pages/signle-product-page/ProductPage'
import AddProduct from './app-components/pages/add-product-page/AddProduct'
import WishListPage from './app-components/pages/wish-list-page/WishListPage'
import useLocalStorage from "./common-components/useLocalStorage"
import useAlert from './common-components/useAlert'
import CartPage from './app-components/pages/cart-page/CartPage'

// styles
import "normalize.css"
import "./styles/dist/main.min.css"

function App() {
    const [cartProducts, setCartProducts, updateQuantity] = useLocalStorage("in-cart-products")
    const [favoriteProducts, setFavoriteProducts] = useLocalStorage("favorite-products")
    const [docTitle, setDocTitle] = useState("Glass Products")

    // change document title useEffect
    useEffect(() => {
        document.title = docTitle
    }, [docTitle])

    // products from localStorage
    const [products, addItem] = useLocalStorage("all-products", testProducts)

    // use notification
    const {
        notificationMsg,
        alertSeverity,
        processSettings,
        closeAlert
    } = useAlert()

    // handle notification message
    const handleAlert = (severity, msg) => {
        processSettings(severity, msg)
    }

    // add product handling
    const handleAddProduct = (product) => {
        handleAlert("success", "Product Created")
        addItem({ ...product, id: new Date().getTime() })
    }

    const productsPage = <ProductsPage setDocTitle={setDocTitle} handleAlert={handleAlert} favoriteProducts={favoriteProducts} setFavoriteProducts={setFavoriteProducts} products={products} setCartProducts={setCartProducts} cartProducts={cartProducts} />

    return (
        <Router>
            <main>
                <AppHeader cartProducts={cartProducts} setCartProducts={setCartProducts} updateQuantity={updateQuantity} />

                <Route
                    path="/" exact
                    render={(props) => productsPage} />

                <Route
                    path="/products" exact
                    render={(props) => productsPage} />

                <Route
                    path="/add-product"
                    render={(props) => <AddProduct setDocTitle={setDocTitle} addProductHandler={handleAddProduct} />} />

                <TransitionGroup>
                    <CSSTransition classNames="fade" timeout={300}>
                        <Switch >
                            <Route
                                path="/wish-list"
                                render={(props) => <WishListPage setDocTitle={setDocTitle} handleAlert={handleAlert} products={favoriteProducts} setFavoriteProducts={setFavoriteProducts} />} />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>


                <Route
                    path="/cart"
                    render={(props) => <CartPage setDocTitle={setDocTitle} cartProducts={cartProducts} setCartProducts={setCartProducts} handleAlert={handleAlert} />}
                />

                <Switch>
                    <Route path="/products/:id" render={() => <ProductPage cartProducts={cartProducts} setCartProducts={setCartProducts} />} />
                </Switch>

                <NotificationSnackbar onClose={closeAlert}
                    classValue="notification-alert"
                    alertSeverity={alertSeverity}
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                    notificationMsg={notificationMsg} />
            </main>
        </Router>
    )
}

export default App