import React, { useState } from 'react';
import axios from "axios"
import "./Signup.css"
import Header from "../../Global/header/Header"
import Footer from "../../Global/footer/Footer"

function Signup(props) {

    const [incorrect, setIncorrect] = useState()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pseudo, setPseudo] = useState('')
    const [firstname, setFirstname] = useState('')
    const [avatar, setAvatar] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const formSubmit = () => {
        const formValues = {
            email: email,
            password: password,
            pseudo: pseudo,
            prenom: firstname,
            avatar: avatar,
        }
        axios.post("http://localhost:8000/user/sign-up", formValues)
            .then(response => {
                if (response.data) {
                    props.history.push("/sign-in");
                }
            }).catch(err => {
                if (err.response.status === 403) {
                    setIncorrect(false)
                };
            })
    }

    const pushSignin = () => {
        props.history.push("/sign-in")
    }
    return (
        <div>
            < Header />
            <div className="signup">
                <p className="signupMsg">Vous possédez déjà compte</p>
                <button className="btnGreen" onClick={pushSignin}> CONNEXION</button>
            </div>
            <div className="parrallax2"></div>
            <div className="signup">
                <form onSubmit={handleSubmit} className="formSignup">
                    <div className="form-email">
                        <label>Adresse Mail:</label>
                        <input type="email" name="email" id="email" required onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-password">
                        <label>Mot de passe:</label>
                        <input type="password" name="password" id="password" required onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="form-pseudo">
                        <label>Pseudo:</label>
                        <input type="pseudo" name="pseudo" id="pseudo" required onChange={e => setPseudo(e.target.value)} />
                    </div>
                    <div className="form-firstname">
                        <label>Prénom:</label>
                        <input type="firstname" name="firstname" id="firstname" required onChange={e => setFirstname(e.target.value)} />
                    </div>
                    <div className="form-avatar">
                        <label>Image de profil:</label>
                        <input type="avatar" name="avatar" id="avatar" required onChange={e => setAvatar(e.target.value)} />
                    </div>
                    <div className="form-btn">
                        <button className="btnGreen" onClick={formSubmit}>INSCRIPTION</button>
                    </div>
                </form>

                {incorrect ? <p>Cette email ou pseudo est déjà utilisé</p> : null}
            </div>
            < Footer />
        </div >
    );
}

export default Signup;
