import React, { useState } from 'react';
import axios from "axios"
import Header from "../../Global/header/Header"
import Footer from "../../Global/footer/Footer"
import { signupSchema } from "../../validations/SignupValidations"

function Signup(props) {
    const [validations, setValidation] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pseudo, setPseudo] = useState('')
    const [firstname, setFirstname] = useState('')
    const [avatar, setAvatar] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const formSubmit = async () => {
        let formValues = {
            email: email,
            password: password,
            pseudo: pseudo,
            prenom: firstname,
            avatar: avatar
        }
        const isValid = await signupSchema.isValid(formValues)
        if (isValid) {
            axios.post("http://localhost:8000/user/sign-up", formValues)
                .then(response => {
                    if (response.data) {
                        setIncorrect(false)
                        setValidation(false)
                        props.history.push("/sign-in");
                    }
                }).catch(() => {
                    setIncorrect(true)
                })
        } else {
            setValidation(true)
        }
    }

    const pushSignin = () => {
        props.history.push("/sign-in")
    }
    return (
        <div>
            < Header />
            <div className="page-container theme-green">
                <div className="page-row py-4">
                    <p >Vous possédez déjà compte</p>
                    <button className="btn btn-green" onClick={pushSignin}> CONNEXION</button>
                </div>
                <div className="img-section-separator"></div>
                <div className="page-row py-4">
                    {incorrect ? <p className='text-error'>Veuillez saisir une adresse-email valide</p> : null}
                    <form onSubmit={handleSubmit} className="form text-greensad">
                        <div>
                            <label >Adresse Mail:</label>
                            <input className="input-control" type="email" name="email" id="email" placeholder="exemple@gmail.com" required onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label >Mot de passe:</label>
                            <input className="input-control" type="password" name="password" id="password" placeholder="Mot de passe" required onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <label >Pseudo:</label>
                            <input className="input-control" type="pseudo" name="pseudo" id="pseudo" placeholder="Tifa" required onChange={e => setPseudo(e.target.value)} />
                        </div>
                        <div>
                            <label >Prénom:</label>
                            <input className="input-control" type="firstname" name="firstname" id="firstname" placeholder="Nicolas" required onChange={e => setFirstname(e.target.value)} />
                        </div>
                        <div>
                            <label >Image de profil:</label>
                            <input className="input-control" type="avatar" name="avatar" id="avatar" placeholder="lien Url" required onChange={e => setAvatar(e.target.value)} />
                        </div>
                        {validations ? <div className='text-error'> Veuillez respecter le format des champs</div> : null}
                        <div className='text-centered'>
                            <button className="btn btn-green" onClick={formSubmit}>INSCRIPTION</button>
                        </div>
                    </form>


                </div>
            </div>
            < Footer />
        </div >
    );
}

export default Signup;
