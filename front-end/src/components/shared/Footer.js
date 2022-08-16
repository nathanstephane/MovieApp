import React from "react";
import classes from "./Footer.module.css"

const Footer = () => {
    return (
        <footer className={classes.bottom}>
            <p className="text-center text-light">
                NFT Movie App / EPITA 2022
            </p>
        </footer>
    );
};

export default Footer;
