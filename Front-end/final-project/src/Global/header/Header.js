import React from "react";
import "../../themeColor/Greentheme.css"
import fflogo from '../../Img/HeaderImg/FFVIILogo.png';

import { BrowserRouter as Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { signoutAction } from "../../storeRedux/actions/SignoutActions";

function Header(props) {
    // THINK TO TOKEN HEADER + FORUM HEADER
    const onSignout = () => {
        props.signoutAction();
        props.history.push("/");
    };
    const token = props.signinStore.userToken
    return (

        <header className="header">
            {token ? <nav className="nav">
                <img src={fflogo} className='logoImg' alt='Logo meteor from ff7' />
                <span className="siteTitle">FIRST FANTASY</span>
                <Link className="nav_link" to="/">ACCUEIL</Link>
                <Link className="nav_link" to="/univers">UNIVERS</Link>
                <Link className="nav_link" to="/forum">FORUM</Link>
                <Link className="nav_link" to="/edit-profile">PROFIL</Link>
                <button onClick={onSignout} className="signout_btn">
                    DECONNEXION
            </button>
            </nav>
                : <nav className="nav">
                    <img src={fflogo} className='logoImg' alt='Logo meteor from ff7' />
                    <span className="siteTitle">FIRST FANTASY</span>
                    <Link className="nav_link" to="/">ACCUEIL</Link>
                    <Link className="nav_link" to="/univers">UNIVERS</Link>
                    <Link className="nav_link" to="/forum">FORUM</Link>
                    <Link className="nav_link" to="/sign-in">CONNEXION</Link>
                    <Link className="nav_link" to="/sign-up">INSCRIPTION</Link>
                </nav>}
        </header>

    );
}



const mapDispatchToProps = { signoutAction };
const mapStateToProps = (state) => ({
    signinStore: state.signin,
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

