import React from "react";
import "../../themeColor/Bluetheme.css"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function FooterForum() {
    // THINK TO TOKEN Footer + FORUM Footer
    const theDate = new Date()
    const dateCopy = `${theDate.getFullYear()} Copyright: Brunet Frank-Owen`

    return (
        <footer className="footer_blue">
            <nav className="footer_nav_blue">
                {/* <Link className="nav_link_footer" to="/site-map">PLAN DU SITE</Link> */}
                <Link className="nav_link_footer" to="/mentions-legales">MENTIONS LEGALES</Link>
                {/* <Link className="nav_link_footer" to="/cgu">CONDITIONS GENERAL / CGU</Link> */}
                <span className="footer_forum_span">Contact : frank.owen@gmail.com</span>
                <span className="footer_forum_span">{dateCopy}</span>
            </nav>
        </footer>
    );
}

export default FooterForum;
