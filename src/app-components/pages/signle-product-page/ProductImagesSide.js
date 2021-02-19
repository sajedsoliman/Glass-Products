import { useEffect } from "react"

// components
import CustomImageGallery from "../../../common-components/image-gallery/CustomImageGallery"

// material
import makeStyles from "@material-ui/core/styles/makeStyles"


// jss styles
const useStyles = makeStyles(theme => ({
    wrapper: {
        width: "100%",
        position: "relative",
        borderRadius: 10,
        boxShadow: "2px 4px 10px 0 rgba(0,0,0,.6)",
        maxHeight: "100%",
        height: 420
    }
}))

export default function ProductImagesSide(props) {
    // destructure images from props
    const { images } = props

    const classes = useStyles()

    const mappedImages = [...images.map(img => ({ original: img, thumbnail: img }))]

    const sliderProps = {
        images: mappedImages,
        showNav: false,
        innerThumbs: true,
        fullscreenBtnFillParent: true
    }

    return (
        <div className={classes.wrapper}>
            <CustomImageGallery {...sliderProps} />
        </div>
    )
}
