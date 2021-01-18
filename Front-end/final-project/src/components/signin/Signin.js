import React, { useState } from 'react';
import "./Signin.css"
import Header from "../../Global/header/Header"
import Footer from "../../Global/footer/Footer"
import axios from "axios"
import { connect } from "react-redux";
import { signinAction } from "../../storeRedux/actions/SigninActions";
import jwt_decode from "jwt-decode";

function Signin(props) {
    const [incorrect, setIncorrect] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [tokenDecoded, setTokenDecoded] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const formSubmit = () => {
        const formValues = {
            email: email,
            password: password,
        }
        axios.post("http://localhost:8000/user/sign-in", formValues)
            .then(response => {

                if (response.data.auth) {
                    let tokenDecoded = jwt_decode(response.data.token);
                    setIncorrect(true)
                    props.signinAction({ tokenDecoded, token: response.data.token });
                }
            }).catch(err => {
                console.log(err)
                if (err.response.status == 403) {
                    setIncorrect(false)
                };
            })
    }

    const pushSignup = () => {
        props.history.push("/sign-up")
    }
    return (

        <div>
            < Header />
            <div className="signin">
                <p className="signinMsg">Vous ne possédez pas encore de compte</p>
                <button className="btnGreen" onClick={pushSignup}> S'INSCRIRE</button>
            </div>
            <div className="parrallax2"></div>
            <div className="signin">
                <form onSubmit={handleSubmit} className="formSingin">
                    <div className="form-email">
                        <label>Adresse Mail :</label>
                        <input type="email" name="email" id="email" required onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-password">
                        <label>Mot de passe :</label>
                        <input type="password" name="password" id="password" required onChange={e => setPassword(e.target.value)} />
                    </div>
                    {incorrect ? null : <div> Email ou Mot de passe incorrect</div>}
                    <div className="form-btn">
                        <button className="btnGreen" onClick={formSubmit}>CONNEXION</button>
                    </div>
                </form>
            </div>
            < Footer />
        </div >
    );
}

const mapDispatchToProps = { signinAction };
const mapStateToProps = (state) => ({
    signinStore: state.signin,
});
export default connect(mapStateToProps, mapDispatchToProps)(Signin);

