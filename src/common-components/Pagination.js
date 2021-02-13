import { useState } from "react"
import { Link } from "react-router-dom"

// components

// material components
import MuiPagination from "@material-ui/lab/Pagination"
import PaginationItem from "@material-ui/lab/PaginationItem"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { Button, makeStyles } from "@material-ui/core"

// jss styles
const useStyles = makeStyles(theme => ({
    paginationWrapper: {
        display: "flex",
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 40,

        [theme.breakpoints.down("730")]: {
            flexDirection: "column",

            "& > form": {
                marginTop: 15
            }
        },
    },
    text: {
        display: "flex",
        alignItems: "center",
        marginLeft: 10,
    },
    input: {
        marginLeft: "inherit",
        width: 60,
        padding: 0,

        "& input": {
            padding: "7px"
        }
    },
    button: {
        minWidth: 40,
        marginLeft: 5,
        padding: 6,
        height: 33
    }
}))

export default function Pagination(props) {
    const { page, setPage, shape, variant, color, pagesCount, ...otherProps } = props

    const [farPage, setFarPage] = useState("")

    const classes = useStyles()


    // handle page change
    const pageChangeHandler = (e, value) => {
        setPage(value)
    }

    // go to far page handling 
    const handleFarPageChange = (e) => {
        e.preventDefault()
        const pageNumber = parseInt(farPage)
        if (pageNumber) {
            if (pageNumber > pagesCount) {
                setPage(pagesCount)
                setFarPage(pagesCount)
            } else if (pageNumber < 0) {
                setPage(1)
                setFarPage(1)
            } else {
                setPage(pageNumber)
            }
        } else {
            setPage(1)
        }
    }

    // go to page input props
    const inputProps = {
        className: classes.input,
        type: "number",
        inputProps: { min: 1 },
        variant: "outlined",
        size: "small",
        value: farPage,
        onChange: (e) => {
            setFarPage(e.target.value)
        }
    }


    return (
        <div className={classes.paginationWrapper}>
            <MuiPagination
                page={page}
                onChange={pageChangeHandler}
                shape={shape}
                variant={variant}
                count={pagesCount}
                showFirstButton
                showLastButton
                color={color}
                renderItem={(item) => (
                    <PaginationItem
                        component={Link}
                        to={`${window.location.pathname}${item.page == 1 ? '' : `?page=${item.page}`}`}
                        {...item}
                    />
                )}
                {...otherProps}
            />
            <form onSubmit={handleFarPageChange}>
                <Typography className={classes.text}>
                    Total of {pagesCount} pages, Go to <TextField {...inputProps} />
                    <Button className={classes.button} variant="outlined" disableElevation onClick={handleFarPageChange}>Go</Button>
                </Typography>
            </form>
        </div>
    )
}
