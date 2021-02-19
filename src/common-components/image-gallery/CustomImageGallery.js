// import styles
import "./styles/dist/slider-styles.min.css"

import ImageGallery from "react-image-gallery"

export default function CustomImageGallery(props) {
    // destructuing props
    const { images, innerThumbs = false, fullscreenBtnFillParent = false, ...otherProps } = props

    const sliderProps = {
        items: images,
        showPlayButton: false,
        useBrowserFullscreen: false,
        additionalClass: `${innerThumbs ? "inner-thumbnails" : ""} ${fullscreenBtnFillParent ? "fill-fullscreen-btn" : ""}`,
    }

    return (
        <ImageGallery {...sliderProps} {...otherProps} />
    )
}
