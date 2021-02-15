import React from "react";
import "../../themeColor/Bluetheme.css"
import fflogo from '../../Img/HeaderImg/FFVIILogo.png';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { signoutAction } from "../../storeRedux/actions/SignoutActions";

function HeaderForum(props) {
    // THINK TO TOKEN HEADER + FORUM HEADER
    const onSignout = () => {
        props.signoutAction();
        props.history.push("/");
    };
    const token = props.signinStore.userToken
    return (

        <header className="header-blue">
            {token ? <nav className="nav-blue">
                <img src={fflogo} className='logoImg' alt='Logo meteor from ff7' />
                <span className="siteTitle-blue">FIRST FANTASY</span>
                <Link className="nav_link-blue" to="/">ACCUEIL</Link>
                <Link className="nav_link-blue" to="/univers">UNIVERS</Link>
                <Link className="nav_link-blue" to="/forum">FORUM</Link>
                <Link className="nav_link-blue" to="/edit-profile">PROFIL</Link>
                <button onClick={onSignout} className="signout_btn-blue">
                    DECONNEXION
            </button>
            </nav>
                : <nav className="nav-blue">
                    <img src={fflogo} className='logoImg' alt='Logo meteor from ff7' />
                    <span className="siteTitle-bleu">FIRST FANTASY</span>
                    <Link className="nav_link-blue" to="/">ACCUEIL</Link>
                    <Link className="nav_link-blue" to="/univers">UNIVERS</Link>
                    <Link className="nav_link-blue" to="/forum">FORUM</Link>
                    <Link className="nav_link-blue" to="/sign-in">CONNEXION</Link>
                    <Link className="nav_link-blue" to="/sign-up">INSCRIPTION</Link>
                </nav>}
        </header>

    );
}



const mapDispatchToProps = { signoutAction };
const mapStateToProps = (state) => ({
    signinStore: state.signin,
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderForum));

