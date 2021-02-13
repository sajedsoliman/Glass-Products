import { Link } from "react-router-dom"

// material components
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

// useStyles jss
const useStyles = makeStyles(theme => ({
    navbarNav: {
        paddingRight: 0,

        "& .nav__link": {
            marginLeft: 30,
            [theme.breakpoints.down("xs")]: {
                display: "none"
            },

            "& > a": {
                color: "inherit",
                textDecoration: "none",
                fontSize: 17,
                marginRight: 20
            }
        }
    }
}))

export default function NavbarNav() {
    const classes = useStyles()

    return (
        <Toolbar className={classes.navbarNav}>
            <Typography variant="h6" component={Link} color="inherit" to="/">Glass Products</Typography>
            <Toolbar className="nav__link" disableGutters>
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/add-product">Add Product</Link>
                <Link to="/wish-list">Wish List</Link>
                <Link to="/cart">Cart</Link>
            </Toolbar>
        </Toolbar>
    )
}
