import { useEffect } from "react"

// components
import SliderNav from "./SliderNav"

// material
import makeStyles from "@material-ui/core/styles/makeStyles"

// icons

// tiny carousel (slider) imports
import "tiny-slider/dist/tiny-slider.css"
import { tns } from "tiny-slider/src/tiny-slider"

// jss styles
const useStyles = makeStyles(theme => ({
    wrapper: {
        width: "100%",
        position: "relative",
        borderRadius: 10,
        boxShadow: "2px 4px 10px 0 rgba(0,0,0,.6)"
    }
}))

export default function ProductImagesSide(props) {
    // destructure images from props
    const { images, setFullscreenSlider, sliderHeight } = props

    const classes = useStyles()

    // image props
    const sliderImageProps = {
        className: "product-img tns-item",
        onClick: () => {
            setFullscreenSlider(true)
        },
    }

    useEffect(() => {
        // slider option
        tns({
            container: '.product-images-slider',
            items: 1,
            controls: false,
            nav: true,
            navContainer: ".custom-nav-thumbnails",
            navAsThumbnails: true,
            arrowKeys: true,
            speed: 400,
            autoplay: true,
            autoplayTimeout: 2500,
            autoplayText: ["", ""],
            autoplayHoverPause: true,
            autoplayButtonOutput: false,
        })
    }, [])

    // map through images for navs
    const mappedNavs = images.map(nav => <SliderNav nav={nav} />)

    // map through images for big images
    const mappedImages = images.map(image => (
        <div {...sliderImageProps} style={{ backgroundImage: `url("${image}")`, height: sliderHeight }}></div>
    ))


    return (
        <div className={classes.wrapper} style={{ height: sliderHeight }}>
            <div className="product-images-slider">
                {mappedImages}
            </div>
            <div className="custom-nav-thumbnails">
                {mappedNavs}
            </div>
        </div>
    )
}
