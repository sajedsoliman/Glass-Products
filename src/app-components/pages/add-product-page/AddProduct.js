import { useRef } from "react"

// others
import productInfo from "./serverFunctions"

// components
import AppPage from "../../../common-components/AppPage"
import Controls from "../../../common-components/controls/Controls"
import { Form, useForm } from "../../../common-components/useForm"

// material components
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import makeStyles from "@material-ui/core/styles/makeStyles"

// jss styles
const useStyles = makeStyles(theme => ({
    form: {
        width: "50%",
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "80%"
        },
        [theme.breakpoints.down("400")]: {
            width: "90%"
        },
    },
    submitBtn: {
        marginTop: 20
    },
    filePondMultiWrapper: {
        border: "1px solid rgb(0 0 0 / 23%)",
        borderRadius: 5,
        padding: 10,
        marginTop: 15,

        "& .filepond--item": {
            width: "calc(33.333% - 0.5em)",
            minHeight: 146,
            maxHeight: 146
        },

        "& .filepond--panel-root": {
            background: "none",
            backgroundColor: "transparent",
        }
    }
}))

export default function AddProduct(props) {
    // props destructuring
    const { addProductHandler, setDocTitle } = props

    setDocTitle("Add Product")

    const classes = useStyles()

    // add product images handler
    const addProductImagesHandler = (err, file) => {
        if (!err) {
            handleInputsChange(convertFilePondToRegular("images", [...product.images, file.getFileEncodeDataURL()]))
        }
    }

    const filepondMultiProps = {
        needMulti: true,
        imgRreviewMinHeight: 146,
        imgRreviewMaxHeight: 146,
        wrapperClassName: classes.filePondMultiWrapper,
        onAddFileHandler: addProductImagesHandler,
    }

    // FilePond Ref for proudct cover
    const filepondProductCover = useRef()

    const filePondProductCoverMethods = {
        wrapperClassName: "file-pond-input-wrapper",
        allowMultiple: false,
        onAddFileHandler: (error, file) => {
            if (!error) {
                handleInputsChange(convertFilePondToRegular("imgSrc", file.getFileEncodeDataURL()))
            }
        },
        filepondRef: filepondProductCover,
    }

    // validation function
    const validation = (firedInput = product) => {
        const errors = {};
        if ("title" in firedInput) {
            errors.title = validationTerm(firedInput.title.length > 5, "Title must be loger than 5 letters")
        }
        if ("price" in firedInput) {
            errors.price = validationTerm(parseFloat(firedInput.price) > 0, "The product must have a price")
        }
        if ("description" in firedInput) {
            errors.description = validationTerm(firedInput.description.length > 0, "The product must have a description")
        }

        setErrors(errors)
        return Object.values(errors).every(input => input == "")
    }

    // validation condition
    const validationTerm = (condition, errMsg) => {
        return condition ? "" : `${errMsg}.`
    }

    // import useForm function
    const {
        values: product,
        setValues: setProduct,
        handleInputsChange,
        validationErrors,
        setErrors,
        resetForm
    } = useForm(productInfo.initalValues, false, validation)

    // handle img (filepond) quirk
    const convertFilePondToRegular = (name, value) => ({
        target: { name, value }
    })

    // handle form submission
    const handleFormSubmit = (product) => {
        if (validation()) {
            if (filepondProductCover.current.getFiles().length != 0) {
                addProductHandler(product)
                window.location.href = "/"
                resetForm(productInfo.initalValues)
                filepondProductCover.current.removeFiles()
            }
        }
    }

    // page props
    const pageProps = {
        title: "Add Product",
        subTitle: "Here, admins can add a product",
        needPagination: false,
        needScrollTop: false,
        products: []
    }


    return (
        <AppPage {...pageProps}>
            <Form className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={8} sm={8}>
                        <Controls.TextInput
                            value={product.title}
                            label="Title"
                            validationError={validationErrors.title}
                            onChange={handleInputsChange}
                            name="title" />
                    </Grid>
                    <Grid className={classes.priceGrid} item xs={4} sm={4}>
                        <Controls.TextInput
                            value={product.price}
                            validationError={validationErrors.price}
                            label="Price"
                            type="number"
                            inputProps={{ min: 1 }}
                            onChange={handleInputsChange}
                            name="price" />
                    </Grid>
                </Grid>
                <Typography paragraph></Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Controls.TextArea
                            value={product.description}
                            validationError={validationErrors.description}
                            label="Description"
                            rows={8}
                            onChange={handleInputsChange}
                            name="description" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controls.FilePondUploader {...filePondProductCoverMethods} />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Controls.FilePondUploader {...filepondMultiProps} />
                    </Grid>
                </Grid>
                <Button className={classes.submitBtn}
                    variant="outlined"
                    size="large"
                    onClick={() => handleFormSubmit(product)}
                    fullWidth>Add Prodcut</Button>
            </Form>
        </AppPage>
    )
}
