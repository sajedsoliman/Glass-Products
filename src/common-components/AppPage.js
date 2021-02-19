// material components
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import { useEffect, useState } from 'react';

// components
import TextInput from "../common-components/controls/TextInput"
import Pagination from "../common-components/Pagination"
import ProductBox from './ProductBox';

// jss styles
const useStyles = makeStyles(theme => ({
    pageWrapper: {
        paddingBottom: 20
    },
    upperContent: {
        margin: "20px 0",

        "& h3": {
            fontWeight: 550,
            lineHeight: 1.5,

            [theme.breakpoints.down("xs")]: {
                fontSize: "2.3em"
            },
            [theme.breakpoints.between("sm", "md")]: {
                fontSize: "2.7em"
            }
        },
        "& p": {
            fontSize: "1.3rem"
        }
    },
    container: {
        backgroundImage: "linear-gradient(to right bottom,rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))",
        borderRadius: 8,
        paddingBottom: 60,
        position: "relative",
    },
    gridContainer: {
        "@media (min-width: 510px) and (max-width: 600px)": {
            "& .MuiGrid-item": {
                flexBasis: "50%",
                padding: 6,
            }
        },
        [theme.breakpoints.between(850, 1200)]: {
            "& .MuiGrid-item": {
                flexBasis: "33.33333%",
                padding: 6,

                "& .MuiPaper-root": {
                    minHeight: 310,

                    "& .ScrollbarsCustom": {
                        minHeight: 310
                    }
                }
            }
        },
        [theme.breakpoints.between(380, 509)]: {
            "& .MuiGrid-item": {

                "& .MuiPaper-root": {
                    minHeight: 320,
                    width: "80%",
                    margin: "auto",

                    "& .MuiCardMedia-root": {
                        height: 160
                    },

                    "& .ScrollbarsCustom": {
                        minHeight: 320
                    }
                }
            }
        }
    },
    goTopButton: {
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        "& svg": {
        }
    },
    searchInput: {
        display: "flex",
        width: "50%",
        margin: "auto",
        marginBottom: 40,

        [theme.breakpoints.down("xs")]: {
            width: "70%"
        }
    },
    paginationNav: {
        width: "auto",

        "& ul li a.Mui-selected": {
            backgroundImage: 'linear-gradient(to right bottom,rgb(0 255 255 / 40%),rgb(0 255 255 / 10%))',
            backgroundColor: "transparent",
            fontWeight: "bold"
        }
    }
}))

export default function AppPage(props) {
    const [showScrollBtn, setShowScroll] = useState(false)

    // props destructuring
    const { title, subTitle, needScrollTop = true, products, withSearch = false, needPagination = true, page, setPage, limit, handleAlert, noProductsMessage, productBoxInfo, label = "", search, setSearch, children } = props;

    // handle scroll top button
    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // handle search Input text
    const handleSearchInput = (e) => {
        const { value } = e.target;

        setSearch(value)
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY !== 0) {
                setShowScroll(true)
            } else {
                setShowScroll(false)
            }
        })

        return () => {
            window.removeEventListener("scroll", () => setShowScroll(false))
        }
    }, [])

    const classes = useStyles()

    // filtering function
    const productsFiltering = () => {
        if (search == "") return products;
        const regex = new RegExp(search, "i");

        return products.filter(product => product.title.search(regex) != -1)
    }

    // handle filtering, mapping through products
    const startPoint = page * limit - limit
    const mappedProducts = productsFiltering().slice(startPoint, startPoint + limit).map(product => (
        <ProductBox key={product.key} product={product} handleAlert={handleAlert} {...productBoxInfo} />
    ))
    const pagesCount = Math.ceil(products.length / limit)

    const searchAbility = (<TextInput
        className={classes.searchInput}
        value={search}
        label={label}
        variant="standard"
        size="medium"
        onChange={handleSearchInput} />)


    return (
        <div className={classes.pageWrapper}>
            <section className={classes.upperContent}>
                <Typography align="center" variant="h3">{title}</Typography>
                {subTitle ?
                    <Typography align="center" variant="subtitle1" paragraph color="textSecondary">{subTitle}</Typography>
                    : null}
            </section>
            <Container className={classes.container} style={{ paddingTop: withSearch ? 15 : 30 }}>
                {withSearch ? searchAbility : null}
                {children ? children :
                    <Grid container spacing={2} className={classes.gridContainer}>
                        {mappedProducts.length != 0 ? mappedProducts :
                            <Typography gutterBottom={false}>{noProductsMessage}</Typography>}
                    </Grid>
                }
                {needScrollTop ?
                    showScrollBtn ? <IconButton className={classes.goTopButton} onClick={handleScrollTop}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 24"><path d="M12 2c3.309 0 6 2.691 6 6v8c0 3.309-2.691 6-6 6s-6-2.691-6-6v-8c0-3.309 2.691-6 6-6zm0-2c-4.418 0-8 3.582-8 8v8c0 4.418 3.582 8 8 8s8-3.582 8-8v-8c0-4.418-3.582-8-8-8zm0 9c-.829 0-1.5-.672-1.5-1.5s.671-1.5 1.5-1.5 1.5.672 1.5 1.5-.671 1.5-1.5 1.5z" /></svg>
                    </IconButton> : null
                    : null}

                {needPagination ?
                    <Pagination
                        className={classes.paginationNav}
                        page={page}
                        setPage={setPage}
                        pagesCount={pagesCount}
                        variant="outlined"
                        disabled={mappedProducts.length == 0 ? 1 : 0}
                        shape="rounded" />
                    : null}
            </Container>
        </div>
    )
}
