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
    const [subjectCreated, setSubjectCreated] = useState(false)
    const [contained, setContained] = useState('')
    const [title_subject, setTitle_Subject] = useState('')
    // const [tokenDecoded, setTokenDecoded] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const addSubject = () => {
        const formValues = {
            contained: contained,
            title_subject: title_subject,
            pseudo_utilisateur: props.signinStore.userInfo.pseudo,
            idCategorySubject: props.signinStore.userInfo.admin ? 1 : 2,
            date: todayDate()
        }
        axios.post("http://localhost:8000/subject/create", formValues)
            .then(() => {
                props.newSubjectAction(formValues)
                setSubjectCreated(true)
                setTimeout(() => {
                    props.history.push("/forum")
                }, 4000);
            }).catch(err => {
                console.log(err)
                // if (err.response.status === 403) {
                //     setIncorrect(false)
                // };
            })
    }
    useEffect(() => {

        if (token) {
        }
        else {
            props.history.push('/')
        }
    }, []);


    return (
        <div className="forumSubjectDiv">
            < HeaderForum />
            <div className="shivaDiv">
                <div className="forumSubject ifritDiv">
                    <div className="addSubject">
                        <form onSubmit={handleSubmit} className="formAddSubject">
                            <div className="form-title_subject">
                                <label className="label-title">CHOISISSEZ LE TITRE DE VOTRE SUJET :</label>
                                <br></br>
                                <input type="text" name="title_subject" id="title_subject" placeholder="Choisissez le titre de votre sujet" required onChange={e => setTitle_Subject(e.target.value)} />
                            </div>
                            <hr></hr>
                            <div className="form-contained">
                                <label >Contenu:</label>
                                <br></br>
                                <input type="text" name="contained" id="contained" required onChange={e => setContained(e.target.value)} />
                            </div>
                        </form>
                        <hr></hr>
                        <button className="btnRed" onClick={addSubject} disabled={subjectCreated}> VALIDER VOTRE SUJET</button>
                    </div>
                    {subjectCreated ? <p id="subject_created">Votre sujet a bien été créé, vous allez être redirigé sur la page forum d'ici quelques secondes.</p> : null}
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
