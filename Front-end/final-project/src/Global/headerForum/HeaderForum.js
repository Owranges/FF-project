import React from "react";
import "../../themeColor/Bluetheme.css"
import "../../themeColor/BurgerMenuForum.css"
import fflogo from '../../Img/HeaderImg/FFVIILogo.png';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { signoutAction } from "../../storeRedux/actions/SignoutActions";
import iconprofil from "../../Img/iconprofil.png"

function HeaderForum(props) {
    const token = props.signinStore.userInfo;
    const theDate = new Date()
    const dateCopy = `${theDate.getFullYear()} Copyright: Brunet Frank-Owen`
    const contactInfo = "Contact : frank.owen@gmail.com"

    const onSignout = () => {
        props.signoutAction();
        props.history.push("/");
    };



    function defaultSrc(ev) {
        ev.target.src = `${iconprofil}`
    }

    return (
        < header className="header back-blue" >
            <nav className="nav_blue">
                < img src={fflogo} className='logo-img' alt='Logo meteor from ff7' />
                <span className="site-title text-bluelight">FIRST FANTASY</span>
                <Link className="nav_link-blue" to="/">ACCUEIL</Link>
                <Link className="nav_link-blue" to="/univers">UNIVERS</Link>
                {token.id ? <img className="img-avatar" src={token.avatar} alt='aaaaa' onError={defaultSrc} /> : null}
                <Link className="nav_link-blue" to="/forum">FORUM</Link>
                {token.id ? null : <Link className="nav_link" to="/sign-up">INSCRIPTION</Link>}
                {token.id ? <Link className="nav_link-blue" to="/edit-profile">PROFIL</Link> : <Link className="nav_link-blue" to="/sign-in">CONNEXION</Link>}
                {token.admin ? <Link className="nav_link-blue" to="/admin">ADMIN</Link> : null}
                {token.id ? <button onClick={onSignout} className="btn btn-blue">
                    DECONNEXION
                </button> : null}
            </nav >

            <div id="menuToggle_forum">

                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu_forum">
                    <div><li className="title_burger_forum">FIRST FANTASY</li>
                        < img src={fflogo} className='logo-img_burger' alt='Logo meteor from ff7' />

                    </div>
                    <li><Link className="nav_link_burger_forum" to="/">ACCUEIL</Link></li>
                    <li><Link className="nav_link_burger_forum" to="/univers">UNIVERS</Link></li>

                    <li><Link className="nav_link_burger_forum" to="/forum">FORUM</Link></li>
                    <li>{token.id ? <Link className="nav_link_burger_forum" to="/edit-profile">PROFIL</Link> : <Link className="nav_link_burger_forum" to="/sign-up">INSCRIPTION</Link>}</li>
                    <li> {token.id ? null : <Link className="nav_link_burger_forum" to="/sign-in">CONNEXION</Link>}</li>
                    <li> {token.admin ? <Link className="nav_link_burger_forum" to="/admin">ADMIN</Link> : null}</li>
                    <li>{token.id ? <button onClick={onSignout} className="btn btn-blue my-3">
                        DECONNEXION
                    </button> : null}</li>
                    <li >{token.id ? <img className="img-avatar" src={token.avatar} alt='aaaaa' onError={defaultSrc} /> : null}</li>

                    <li><Link className="nav_link_burger_footer_forum" to="/site-map">PLAN DU SITE</Link></li>
                    <li><Link className="nav_link_burger_footer_forum" to="/mentions-legales">MENTIONS LEGALES</Link></li>
                    <li><Link className="nav_link_burger_footer_forum" to="/cgu">CONDITIONS GENERAL</Link></li>
                    <li><Link className="nav_link_burger_footer_forum" to="/contact">{contactInfo}</Link></li>
                    <li className="span_burger_forum">{dateCopy}</li>


                </ul>
            </div>
        </ header>

    )
}

const mapDispatchToProps = { signoutAction };
const mapStateToProps = (state) => ({
    signinStore: state.signin,
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderForum));

