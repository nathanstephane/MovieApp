import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import classes from "./Header.module.css";
import logo from "./logo-movie.png";


const Header = () => {
    const [user, setUser] = useContext(AuthContext);
    return (
        <React.Fragment>
            <Navbar  expand="lg" className={classes.bg_nav} >
                <Navbar.Brand href="/" className={[classes.Brand, classes.nav_text]}>
                    <div className={classes.nav_logo}>
                        <img src={logo} alt="Logo"  />
                    </div>
                    {/* Movies App */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/" className={classes.nav_text} >Home</Nav.Link>
                        <Nav.Link href="/movies" className={classes.nav_text} >All NFT Movies</Nav.Link>
                        <Nav.Link href="/api/movies" className={classes.nav_text}>Movie Manager</Nav.Link>
                        {user ? <Nav.Link href="/logout" className={classes.nav_text} >Logout</Nav.Link> : <Nav.Link href="/login" className={classes.nav_text} >Login / Register</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
    );
};
export default Header;
