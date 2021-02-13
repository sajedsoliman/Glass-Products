import { useEffect } from "react"

// components
import SliderNav from "./SliderNav"

// material
import makeStyles from "@material-ui/core/styles/makeStyles"

// tiny carousel (slider) imports
import "tiny-slider/dist/tiny-slider.css"
import { tns } from "tiny-slider/src/tiny-slider"

// jss styles
const useStyles = makeStyles(theme => ({
    wrapper: {
        position: "relative",
    },
}))

export default function FullScreenSlider(props) {
    // destructure images from props
    const { images, sliderHeight } = props

    const classes = useStyles()


    useEffect(() => {
        // slider option
        tns({
            container: '.product-fullscreen-images-slider',
            items: 1,
            controls: false,
            nav: true,
            navContainer: ".custom-fullscreen-slider-nav-thumbnails",
            navAsThumbnails: true,
            arrowKeys: true,
            speed: 400,
        })
    }, [])

    // map through nav
    const mappedNavs = images.map(nav => <SliderNav nav={nav} />)

    // map through images for big images
    const mappedImages = images.map(image => (
        <img className=" tns-item" src={image} alt={"Product Cover"} />
    ))


    return (
        <div className={classes.wrapper}>
            <div className="product-fullscreen-images-slider">
                {mappedImages}
            </div>
            <div className="custom-fullscreen-slider-nav-thumbnails">
                {mappedNavs}
            </div>
        </div>
    )
}