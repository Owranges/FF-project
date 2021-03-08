import React, { useState, useEffect } from 'react';
import axios from "axios"
import "./EditProfile.css"
import Header from "../../Global/header/Header"
import Footer from "../../Global/footer/Footer"
import { connect } from "react-redux";
import { signinAction } from "../../storeRedux/actions/SigninActions";
import iconprofil from "../../Img/iconprofil.png"

import { passwordSchema } from "../../validations/editValidations.js/editPasswordValidations"
import { emailSchema } from "../../validations/editValidations.js/editEmailValidations"
import { avatarSchema } from "../../validations/editValidations.js/editAvatarValidations"
import { pseudoSchema } from "../../validations/editValidations.js/editPseudoValidations"
import { signoutAction } from "../../storeRedux/actions/SignoutActions";


function EditProfile(props) {
    const [isAdmin, setIsAdmin] = useState(false)
    const [incorrectEmail, setIncorrectEmail] = useState(false)
    const [incorrectPassword, setIncorrectPassword] = useState(false)
    const [incorrectAvatar, setIncorrectAvatar] = useState(false)
    const [incorrectPseudo, setIncorrectPseudo] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pseudo, setPseudo] = useState('')
    const [avatar, setAvatar] = useState('')
    const [infoUser, setInfoUser] = useState([])
    const [infoProfil, setInfoProfil] = useState(false)
    const [inserted, setInserted] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const token = props.signinStore.userToken;


    const onTokenAdmin = () => {
        if (props.signinStore.userInfo.admin) {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }
    const onSignout = () => {
        props.signoutAction();
        props.history.push("/");
        localStorage.clear()
    };

    const getUserInfo = () => {
        axios.get(`http://localhost:8000/user/${props.signinStore.userInfo.id}`)
            .then(response => {
                if (response.data) {
                    setInfoUser(response.data[0])
                    setInfoProfil(false)
                }
            }).catch(() => {

                setInfoProfil(true)
            })
    };

    function defaultSrc(ev) {
        ev.target.src = `${iconprofil}`
    }

    useEffect(() => {

        if (token) {
            onTokenAdmin()
            getUserInfo()
        } else {
            props.history.push('/')
        }
    }, []);

    const formSubmitEmail = async () => {
        let formValues = {
            email: email,
        }
        const isValid = await emailSchema.isValid(formValues)
        if (isValid) {
            const headers = {
                "Content-Type": "application/json",
                authorization: props.signinStore.userToken,
            };
            axios.put(`http://localhost:8000/user/edit/${props.signinStore.userInfo.id}`, formValues, { headers: headers })
                .then(response => {
                    if (response) {
                        setIncorrectEmail(false)
                        setIncorrect(false)
                        setInserted(true)
                        setTimeout(() => {
                            onSignout()
                        }, 5000);
                    }
                }).catch(() => {
                    setIncorrectEmail(false)
                    setIncorrect(true)
                })
        } else {
            setIncorrectEmail(true)
        }

    };
    const formSubmitPassword = async () => {
        let formValues = {
            password: password,
        }
        const isValid = await passwordSchema.isValid(formValues)
        if (isValid) {
            const headers = {
                "Content-Type": "application/json",
                authorization: props.signinStore.userToken,
            };
            axios.put(`http://localhost:8000/user/edit/password/${props.signinStore.userInfo.id}`, formValues, { headers: headers })
                .then(response => {
                    if (response) {
                        setIncorrectPassword(false)
                        setIncorrect(false)
                        setInserted(true)
                        setTimeout(() => {
                            onSignout()
                        }, 5000);
                    }
                }).catch(() => {
                    setIncorrect(true)
                })
        } else {
            setIncorrectPassword(true)
        }

    };
    const formSubmitPseudo = async () => {
        let formValues = {
            pseudo: pseudo,
        }
        const isValid = await pseudoSchema.isValid(formValues)
        if (isValid) {
            const headers = {
                "Content-Type": "application/json",
                authorization: props.signinStore.userToken,
            };
            axios.put(`http://localhost:8000/user/edit/${props.signinStore.userInfo.id}`, formValues, { headers: headers })
                .then(response => {
                    if (response) {
                        setIncorrectPseudo(false)
                        setIncorrect(false)
                        setInserted(true)
                        setTimeout(() => {
                            onSignout()
                        }, 5000);
                    }
                }).catch(() => {
                    setIncorrect(true)
                })
        } else {
            setIncorrectPseudo(true)
        }

    };
    const formSubmitAvatar = async () => {
        let formValues = {
            avatar: avatar,
        }
        const isValid = await avatarSchema.isValid(formValues)
        if (isValid) {
            const headers = {
                "Content-Type": "application/json",
                authorization: props.signinStore.userToken,
            };
            axios.put(`http://localhost:8000/user/edit/${props.signinStore.userInfo.id}`, formValues, { headers: headers })
                .then(response => {
                    if (response) {
                        setIncorrectAvatar(false)
                        setIncorrect(false)
                        setInserted(true)
                        setTimeout(() => {
                            onSignout()
                        }, 5000);
                    }
                }).catch(() => {
                    setIncorrect(true)
                })
        } else {
            setIncorrectAvatar(true)
        }


    };

    const deleteAccount = () => {
        const headers = {
            "Content-Type": "application/json",
            authorization: props.signinStore.userToken,
        };
        axios.delete(`http://localhost:8000/user/${props.signinStore.userInfo.id}`, { headers: headers })
            .then(() => {
                onSignout()
            }).catch(() => {
                setIncorrect(true)
            })
    }

    return (
        <div >
            < Header />
            <div className="page-container theme-green page-edit-profil" >
                <div className="py-4">
                    <p className="text-white">Vous pouvez modifier les informations de profil.</p>
                </div>
                <div>
                    {infoProfil ? <div>Erreur lors de la récupération de vos de données</div> : null}
                    <div className="user-info">
                        <div className="avatar">
                            <img src={infoUser.avatar} onError={defaultSrc} />
                        </div>
                        <div className="pseudo">{infoUser.pseudo}</div>
                        <div className="email">{infoUser.email}</div>
                    </div>
                </div>
                <div>
                    {incorrect ? <div className='text-error'>Une erreur s'est produite </div> : null}
                    <form onSubmit={handleSubmit} className="form">
                        <div>
                            <label>Adresse Mail:</label>
                            <input className="input-control" type="email" name="email" id="email" required placeholder="exemple@gmail.com" onChange={e => setEmail(e.target.value)} />
                            <button className="btn btn-green" onClick={formSubmitEmail} disabled={inserted, isAdmin}>Modifier   </button>
                        </div>
                        {incorrectEmail ? <div className='text-error'>Respectez le format du champ</div> : null}

                    </form>
                    <form onSubmit={handleSubmit} className="form">
                        <div>
                            <label>Mot de passe:</label>
                            <input className="input-control" type="password" name="password" id="password" required placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} />
                            <button className="btn btn-green" onClick={formSubmitPassword} disabled={inserted, isAdmin}>Modifier   </button>
                        </div>
                        {incorrectPassword ? <div className='text-error'>Respectez le format du champ</div> : null}
                    </form>
                    <form onSubmit={handleSubmit} className="form">
                        <div>
                            <label>Pseudo:</label>
                            <input className="input-control" type="pseudo" name="pseudo" id="pseudo" required placeholder="Tifa" onChange={e => setPseudo(e.target.value)} />
                            <button className="btn btn-green" onClick={formSubmitPseudo} disabled={inserted, isAdmin}>Modifier   </button>
                        </div>
                        {incorrectPseudo ? <div className='text-error'>Respectez le format du champ</div> : null}
                    </form>
                    <form onSubmit={handleSubmit} className="form">
                        <div>
                            <label>Image de profil:</label>
                            <input className="input-control" type="avatar" name="avatar" id="avatar" required placeholder="lien Url" onChange={e => setAvatar(e.target.value)} />
                            <button className="btn btn-green" onClick={formSubmitAvatar} disabled={inserted, isAdmin} >Modifier   </button>
                        </div>
                        {incorrectAvatar ? <div className='text-error'>Respectez le format du champ</div> : null}
                    </form>
                    {inserted ? <div className='text-success'>Votre information à bien été modifié vous allez être déconnecter d'ici quelques secondes.</div> : null}
                    <button className="btn btn-red my-4" onClick={deleteAccount} disabled={inserted, isAdmin} >Supprimer votre compte</button>
                </div>
            </div>
            < Footer />
        </div >
    );
}

const mapDispatchToProps = { signinAction, signoutAction };
const mapStateToProps = (state) => ({
    signinStore: state.signin,
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

