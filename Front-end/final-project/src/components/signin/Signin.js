import React, { useState } from 'react';
import Header from "../../Global/header/Header"
import Footer from "../../Global/footer/Footer"
import axios from "axios"

import { signinSchema } from '../../validations/SigninValidations'
import { connect } from "react-redux";
import { signinAction } from "../../storeRedux/actions/SigninActions";
import jwt_decode from "jwt-decode";

function Signin(props) {
    const [incorrect, setIncorrect] = useState(false)
    const [validations, setValidation] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
    }


    const formSubmit = async () => {
        let formData = {
            email: email,
            password: password
        }
        const isValid = await signinSchema.isValid(formData)
        if (isValid) {
            setValidation(false)
            axios.post("http://localhost:8000/user/sign-in", formData)
                .then(response => {

                    if (response.data.auth) {
                        let tokenDecoded = jwt_decode(response.data.token);
                        setIncorrect(false)
                        props.history.push('/')
                        localStorage.setItem('token', response.data.token);
                        props.signinAction({ tokenDecoded, token: response.data.token });
                    }
                }).catch(() => {
                    setIncorrect(true)
                })
        } else {
            setValidation(true)
        }
    }


    const pushSignup = () => {
        props.history.push("/sign-up")
    }
    return (

        <div>
            < Header />
            <div className="page-container theme-green ">
                <div className="page-row py-4">
                    <p>Vous ne possédez pas encore de compte</p>
                    <button className="btn btn-green" onClick={pushSignup}> S'INSCRIRE</button>
                </div>
                <div className="img-section-separator"></div>
                <div className="page-row py-4">
                    <form onSubmit={handleSubmit} className="form ">
                        <div>
                            <label>Adresse Mail :</label>
                            <input className="input-control" type="email" name="email" id="email" placeholder="exemple@gmail.com" required onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label>Mot de passe :</label>
                            <input className="input-control" type="password" name="password" id="password" placeholder="Mot de passe" required onChange={e => setPassword(e.target.value)} />
                        </div>
                        {incorrect ? <div className="text-error"> Email ou Mot de passe incorrect</div> : null}
                        {validations ? <div className="text-error"> Veuillez respecter le format des champs</div> : null}
                        <div className="text-centered">
                            <button className="btn btn-green" onClick={formSubmit}>CONNEXION</button>
                        </div>
                    </form>
                </div>

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

