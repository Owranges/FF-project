import React from "react";
import "../../themeColor/Greentheme.css"
import "../../themeColor/BurgerMenu.css"
import fflogo from '../../Img/HeaderImg/FFVIILogo.png';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { signoutAction } from "../../storeRedux/actions/SignoutActions";
import iconprofil from "../../Img/iconprofil.png"

function Header(props) {
    // THINK TO TOKEN HEADER + FORUM HEADER
    const token = props.signinStore.userInfo;
    const theDate = new Date()
    const dateCopy = `${theDate.getFullYear()} Copyright: Brunet Frank-Owen`
    console.log(token);
    const onSignout = () => {
        props.signoutAction();
        props.history.push("/");
    };



    function defaultSrc(ev) {
        ev.target.src = `${iconprofil}`
    }

    return (
        <header className="header text-green back-green">
            <nav className="nav">
                <img src={fflogo} className='logo-img' alt='Logo meteor from ff7' />
                <span className="site-title ">FIRST FANTASY</span>
                <Link className="nav_link" to="/">ACCUEIL</Link>
                <Link className="nav_link" to="/univers">UNIVERS</Link>
                {token.id ? <img className="img-avatar" src={token.avatar} alt='aaaaa' onError={defaultSrc} /> : null}
                <Link className="nav_link" to="/forum">FORUM</Link>
                {token.id ? <Link className="nav_link" to="/edit-profile">PROFIL</Link> : <Link className="nav_link" to="/sign-up">INSCRIPTION</Link>}
                {token.id ? null : <Link className="nav_link" to="/sign-in">CONNEXION</Link>}
                {token.admin ? <Link className="nav_link" to="/admin">ADMIN</Link> : null}
                {token.id ? <button onClick={onSignout} className="btn btn-green my-3">
                    DECONNEXION
         </button> : null}
            </nav>
            <div id="menuToggle">
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu">
                    <div>
                        <li className="title_burger">FIRST FANTASY</li>
                        <img src={fflogo} className='logo-img_burger' alt='Logo meteor from ff7' />
                    </div>
                    <li><Link className="nav_link_burger" to="/">ACCUEIL</Link></li>
                    <li><Link className="nav_link_burger" to="/univers">UNIVERS</Link></li>
                    <li><Link className="nav_link_burger" to="/forum">FORUM</Link></li>
                    <li>{token.id ? <Link className="nav_link_burger" to="/edit-profile">PROFIL</Link> : <Link className="nav_link_burger" to="/sign-up">INSCRIPTION</Link>}</li>
                    <li>{token.id ? null : <Link className="nav_link_burger" to="/sign-in">CONNEXION</Link>}</li>
                    <li>{token.admin ? <Link className="nav_link_burger" to="/admin">ADMIN</Link> : null}</li>
                    <li>{token.id ? <button onClick={onSignout} className="btn btn-green my-3">
                        DECONNEXION
                        </button> : null}</li>
                    <li>{token ? <img className="img-avatar" src={token.avatar} alt='aaaaa' onError={defaultSrc} /> : null}</li>
                    <li><Link className="nav_link_burger_footer" to="/site-map">PLAN DU SITE</Link></li>
                    <li><Link className="nav_link_burger_footer" to="/mentions-legales">MENTIONS LEGALES</Link></li>
                    <li><Link className="nav_link_burger_footer" to="/cgu">CONDITIONS GENERAL</Link></li>
                    <li><Link className="nav_link_burger_footer" to="/contact">Contact : frank.owen@gmail.com</Link></li>
                    <li className="span_burger">{dateCopy}</li>
                </ul>
            </div>
        </header>


    )

}



const mapDispatchToProps = { signoutAction };
const mapStateToProps = (state) => ({
    signinStore: state.signin,
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

