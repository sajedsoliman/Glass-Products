// material
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';


// jss styles
const useStyles = makeStyles(theme => ({
    qantityContainer: {
        minWidth: 30,
        maxHeight: 74,

        "& > div": {
            width: "100%",

            "& button": {
                width: "100%",
                minWidth: 10,
                borderRadius: 0,
                padding: 0,
                background: "linear-gradient(to right, rgb(0 255 255 / 80%), rgb(0 255 255 / 60%))",
                color: "rgb(17 65 70 / 99%)",
                textShadow: "1px 1px 3px #757373"
            },

            "& .MuiFormControl-root.MuiTextField-root": {
                "& .MuiInputBase-root": {
                    borderRadius: 0,
                },

                "& input": {
                    padding: "6px 0 7px",
                    textAlign: "center"

                }
            }
        }
    },
}))

export default function QuantityControl(props) {
    const { orientation, updateQuantity, setProductSlide, quantity, product, className } = props

    const classes = useStyles()

    const commonBtnProps = (btnOperation, borderRadius) => ({
        disableElevation: true,
        color: "primary",
        variant: "contained",
        onClick: () => handleQuantityChange(btnOperation),
        style: { borderRadius }
    })

    const btnBorderRaduis = (colmunRaduis, rowRadius) => {
        return orientation == "column" ? colmunRaduis : rowRadius
    }

    const firstButtonBorderRadius = btnBorderRaduis("3px 3px 0 0", "3px 0 0 3px")
    const secondButtonBorderRadius = btnBorderRaduis("0 0 3px 3px", "0 3px 3px 0")

    // handle change Quantity
    const handleQuantityChange = (operation, input) => {
        if (quantity == 1 && operation == "minus") {
            handleFadeoutProduct(operation, input)
        } else {
            updateQuantity(product, operation, input)
        }
    }

    const handleFadeoutProduct = (operation, input) => {
        setProductSlide(false)
        setTimeout(() => {
            updateQuantity(product, operation, input)
        }, 200)
    }

    return (
        <div className={`${classes.qantityContainer} ${className}`}>
            <div style={{ display: orientation == "column" ? "block" : "flex" }}>
                <Button {...commonBtnProps("plus", firstButtonBorderRadius)}>+</Button>
                <TextField
                    onChange={(e) => handleQuantityChange("", e.target.value)}
                    variant="outlined"
                    value={quantity}
                    type="number"
                    inputProps={{ min: 1 }} />
                <Button {...commonBtnProps("minus", secondButtonBorderRadius)}>-</Button>
            </div>
        </div>
    )
}
