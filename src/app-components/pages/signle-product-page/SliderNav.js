export default function SliderNav({ nav }) {
    return (
        <li aria-controls="customize" className="image-thumbnail tns-nav" style={{ backgroundImage: `url('${nav}')` }}></li>
    )
}
