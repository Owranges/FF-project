import React, { useState, useEffect } from 'react';
import axios from "axios"
import "./ForumSubject.css"
import HeaderForum from "../../Global/headerForum/HeaderForum"
import FooterForum from "../../Global/footerForum/FooterForum"
import { connect } from "react-redux";
import { signinAction } from "../../storeRedux/actions/SigninActions";
import { newSubjectAction } from "../../storeRedux/actions/NewSubject"

function ForumSubject(props) {
    const todayDate = () => (
        new Date().toISOString().slice(0, 10)
    )

    const token = props.signinStore.userToken;
    const [incorrect, setIncorrect] = useState(false)
    const [errorInsert, setErrorInsert] = useState(false)
    const [notConnected, setNotConnected] = useState(false)
    const [subjectCreated, setSubjectCreated] = useState(false)
    const [contained, setContained] = useState('')
    const [title_subject, setTitle_Subject] = useState('')
    // const [tokenDecoded, setTokenDecoded] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const addSubject = () => {
        if (token) {
            setNotConnected(false)
            const trimContained = contained.trim()
            const trimTitle = title_subject.trim()
            if (trimContained && trimTitle) {
                const formValues = {
                    id: props.signinStore.userInfo.id,
                    contained: contained,
                    title_subject: title_subject,
                    pseudo_utilisateur: props.signinStore.userInfo.pseudo,
                    idCategorySubject: props.signinStore.userInfo.admin ? 1 : 2,
                    date: todayDate()
                }
                const headers = {
                    "Content-Type": "application/json",
                    authorization: props.signinStore.userToken,
                };
                axios.post("http://localhost:8000/subject/create", formValues, { headers: headers })
                    .then(() => {
                        props.newSubjectAction(formValues)
                        setSubjectCreated(true)
                        setErrorInsert(false)
                        setIncorrect(false)
                        setTimeout(() => {
                            props.history.push("/forum")
                        }, 4000);
                    }).catch(() => {
                        setErrorInsert(true)
                    })
            } else {
                setIncorrect(true)
            }

        } else {
            setNotConnected(true)
        }
    }

    useEffect(() => {

        if (token) {
        }
        else {
            props.history.push('/forum')
        }
    }, []);


    return (
        <div className="page-container theme-blue">
            < HeaderForum />
            <div className="shiva">
                <div className="forumSubject ifrit">
                    <div className="mt-3 text-bluelight width-80">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>CHOISISSEZ LE TITRE DE VOTRE SUJET :</label>
                                <br></br>
                                <input type="text" name="title_subject" id="title_subject" placeholder="Titre de votre sujet" required onChange={e => setTitle_Subject(e.target.value)} />
                            </div>
                            <br></br>
                            <div>
                                <label >CONTENU:</label>
                                <hr></hr>
                                <textarea name="contained" id="contained" placeholder="Ecriver votre texte ici" required onChange={e => setContained(e.target.value)} />
                            </div>
                        </form>
                        <hr></hr>
                        <button className="btn btn-red " onClick={addSubject} disabled={subjectCreated}> VALIDER VOTRE SUJET</button>
                    </div>
                    {notConnected ? <p className="text-error width-80">Vous devez être connecté pour poster un sujet</p> : null}
                    {errorInsert ? <p className="text-error width-80">Une erreur s'est produit lors de l'insertion</p> : null}
                    {incorrect ? <p className="text-error width-80">Vous devez mettre un titre et rédiger du contenu pour créer votre sujet</p> : null}
                    {subjectCreated ? <p className="text-success width-80">Votre sujet a bien été créé, vous allez être redirigé sur la page forum d'ici quelques secondes.</p> : null}
                </div>
            </div>
            < FooterForum />
        </div >
    );
}

const mapDispatchToProps = { signinAction, newSubjectAction };
const mapStateToProps = (state) => ({
    signinStore: state.signin,
});
export default connect(mapStateToProps, mapDispatchToProps)(ForumSubject);
