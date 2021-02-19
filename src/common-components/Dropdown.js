import { useEffect, useCallback, useRef, forwardRef } from "react"

// material components
import { Slide, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';

// jss Styles
const useStyles = makeStyles(theme => ({
    cartWrapper: {
        position: "absolute",
        top: 67,
        right: 5,
        width: 425,
        minHeight: 500,
        maxHeight: 350,
        overflowY: "auto",
        overflowX: "hidden"
    },
    title: {
        fontWeight: 540,
        padding: 8
    }
}))

export default function Dropdown(props) {
    const classes = useStyles()

    // props destructuring
    const { open, transitionDirection, className, children, title, onClose } = props

    const dropdownRef = useRef()
    const clearAllBtn = useRef()

    const onKeyDown = useCallback((e) => {
        if (e.key == "Escape") {
            onClose()
        }
    }, [])

    // to close the cart when escape btn or arrowUp btn is fired
    useEffect(() => {
        if (open) {
            window.addEventListener("keydown", onKeyDown)
        } else {
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [open])

    return (
        <Slide in={open} direction={transitionDirection}>
            <Paper ref={dropdownRef} variant="elevation" elevation={10} className={`${classes.cartWrapper} ${className}`}>
                <Typography className={classes.title} variant="h6">{title}</Typography>
                {children}
            </Paper>
        </Slide>
    )
}
