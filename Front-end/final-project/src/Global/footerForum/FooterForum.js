import React, { useState } from "react";
import "../../themeColor/Bluetheme.css"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function FooterForum() {
    // THINK TO TOKEN Footer + FORUM Footer
    const [activeTheme, setActiveTheme] = useState(false)
    const theDate = new Date()
    const dateCopy = `${theDate.getFullYear()} Copyright: Brunet Frank-Owen`

    // const changeTheme = () => {
    //     setActiveTheme(!activeTheme)
    // }
    return (
        <footer className="footer-blue">
            <nav className="nav-blue">
                <Link className="nav_link_footer" to="/site-map">PLAN DU SITE</Link>
                <Link className="nav_link_footer" to="/mentions-legales">MENTIONS LEGALES</Link>
                <Link className="nav_link_footer" to="/cgu">CONDITIONS GENERAL / CGU</Link>
                <Link className="nav_link_footer" to="/contact">Contact : frank.owen.brunet@gmail.com</Link>
                <span>{dateCopy}</span>
            </nav>
        </footer>
    );
}

export default FooterForum;
