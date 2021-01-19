import React, { useState, useEffect } from 'react';
import axios from "axios"
import "./EditProfile.css"
import Header from "../../Global/header/Header"
import Footer from "../../Global/footer/Footer"
import { connect } from "react-redux";
import { signinAction } from "../../storeRedux/actions/SigninActions";

function EditProfile(props) {

    const [incorrect, setIncorrect] = useState()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pseudo, setPseudo] = useState('')
    const [firstname, setFirstname] = useState('')
    const [avatar, setAvatar] = useState('')
    const [infoUser, setInfoUser] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const token = props.signinStore.userToken;

    const getUserInfo = () => {
        axios.get(`http://localhost:8000/user/${props.signinStore.userInfo.id}`)
            .then(response => {
                if (response.data) {
                    setInfoUser(response.data[0])
                }
            }).catch(err => {
                console.log(err)
                if (err.response.status == 403) {
                    console.log('im in the catch');
                    setIncorrect(false)
                };
            })
    };

    useEffect(() => {

        if (token) getUserInfo()
        else {
            props.history.push('/')
        }
    }, []);

    const formSubmit = () => {
        const formValues = {
            email: email || infoUser.email,
            password: password || infoUser.password,
            pseudo: pseudo || infoUser.pseudo,
            prenom: firstname || infoUser.prenom,
            avatar: avatar || infoUser.avatar,
            id: infoUser.id
        }
        console.log(formValues);
        const headers = {
            "Content-Type": "application/json",
            authorization: props.signinStore.userToken,
        };
        axios.put(`http://localhost:8000/user/edit`, formValues, { headers: headers })
            .then(response => {
                if (response) {
                
                }
            }).catch(err => {
                console.log(err)
                if (err.response.status == 403) {
                    setIncorrect(false)
                };
            })
    };

    return (
        <div >
            < Header />
            <div className="editProfileDiv" >
                <div >
                    <p className="editProfileMsg">Vous pouvez modifier les informations de profil</p>
                </div>
                <div className="editProfile">
                    <form onSubmit={handleSubmit} className="formEditProfile">
                        <div className="form-email">
                            <label>Adresse Mail:</label>
                            <input type="email" name="email" id="email" required placeholder={infoUser.email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="form-password">
                            <label>Mot de passe:</label>
                            <input type="password" name="password" id="password" required placeholder="mot de passe" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="form-pseudo">
                            <label>Pseudo:</label>
                            <input type="pseudo" name="pseudo" id="pseudo" required placeholder={infoUser.pseudo} onChange={e => setPseudo(e.target.value)} />
                        </div>
                        <div className="form-firstname">
                            <label>Prénom:</label>
                            <input type="firstname" name="firstname" id="firstname" required placeholder={infoUser.prenom} onChange={e => setFirstname(e.target.value)} />
                        </div>
                        <div className="form-avatar">
                            <label>Image de profil:</label>
                            <input type="avatar" name="avatar" id="avatar" required placeholder={infoUser.avatar} onChange={e => setAvatar(e.target.value)} />
                        </div>
                    </form>
                    <div className="forms-btn">
                        <button className="btnGreen" onClick={formSubmit}>VALIDER   </button>
                    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

