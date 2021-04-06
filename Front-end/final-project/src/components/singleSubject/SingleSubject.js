import React, { useState, useEffect } from 'react';
import axios from "axios"
import "./SingleSubject.css"
import HeaderForum from "../../Global/headerForum/HeaderForum"
import FooterForum from "../../Global/footerForum/FooterForum"
import CommentariesSubject from "../commentariesSubject/CommentariesSubject"
import { connect } from "react-redux";
import { signinAction } from "../../storeRedux/actions/SigninActions";
import { forumSubjectAction } from "../../storeRedux/actions/ForumSubjectActions";
import iconprofil from "../../Img/iconprofil.png"

function SingleSubject(props) {
    const params = new URLSearchParams(props.location.search)
    const urlId = params.get('id')

    const token = props.signinStore.userToken;

    const [addComment, setAddComment] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [subjectInfo, setSubjectInfo] = useState(false);
    const [ownerSubject, setOwnerSubject] = useState();
    const [contained, setContained] = useState('');
    const [userDeleted, setUserDeleted] = useState(false);
    const [axiosFailed, setAxiosFailed] = useState(false)
    const [textComment, setTextComment] = useState(false)

    function defaultSrc(ev) {
        ev.target.src = `${iconprofil}`
    }
    const todayDate = () => (
        new Date().toISOString().slice(0, 10)
    )
    const subject = async () => {
        console.log(props.forumSubject.forumSubject);
        let mySubject = await props.forumSubject.forumSubject.find(
            (subj) => subj.id == urlId
        )
        setSubjectInfo(mySubject);
    };

    const getSubjectInfo = () => {
        axios.get(`http://localhost:8000/subject/${urlId}`)
            .then(response => {

                setOwnerSubject(response.data[0]);
            }).catch(() => {
                setUserDeleted("*****")

            })
    }

    const getInfoOwnerSubject = () => {
        axios.get(`http://localhost:8000/user/${subjectInfo.id_utilisateur}`)
            .then(response => {

                setOwnerSubject(response.data[0]);
            }).catch(() => {
                setUserDeleted("*****")

            })
    }

    const addCommentary = () => {
        if (token) {
            const trimContained = contained.trim()
            if (trimContained) {
                const objectCommentary = {
                    id_auteur: props.signinStore.userInfo.id,
                    contained: trimContained,
                    id_sujet_forum: urlId,
                    date_commentaires: todayDate()
                }
                const headers = {
                    "Content-Type": "application/json",
                    authorization: props.signinStore.userToken,

                };
                axios.post('http://localhost:8000/subject/commentaries', objectCommentary, { headers: headers })
                    .then(() => {
                        setAxiosFailed(false)
                        setAddComment(true)
                        setTextComment(false)
                        setTimeout(() => {
                            props.history.push("/forum")
                        }, 4000);
                    }).catch(() => {
                        setAxiosFailed(true)
                    })
            } else {
                setTextComment(true)
            }
        } else {
            setIncorrect(true)
        }

    }

    console.log(subjectInfo);
    function handleDateFormat(date) {
        let currentDate = date;
        var newDate = new Date(currentDate).toLocaleDateString("sq-AL", { year: 'numeric', month: '2-digit', day: '2-digit' });
        return newDate;
    }

    useEffect(() => {
        async function test() {
            await subject()
            if (subjectInfo) {
                getInfoOwnerSubject()
            }
        }
        test()



    }, [urlId, subjectInfo]);
    return (
        <div className=" page-container theme-blue">
            < HeaderForum />
            <div className="shiva">
                <div className="forum ifrit">
                    {ownerSubject ?
                        <>
                            <div className="py-5 width-80">
                                <p>TITRE DU SUJET</p>
                                <div className="subject-name-date">
                                    <p>{subjectInfo.title_subject.toUpperCase()}</p>
                                    <p className="text-orange">{handleDateFormat(subjectInfo.date)}</p>
                                </div>
                                <div>
                                    <img className="img-avatar" src={ownerSubject.avatar} onError={defaultSrc} alt="avatar" />
                                    <p className="font-bold">{ownerSubject.pseudo}</p>
                                </div>
                                <div>{subjectInfo.contenu}</div>
                                <hr></hr>
                                <p>COMMENTAIRES</p>
                            </div>
                            <CommentariesSubject idSubject={urlId} />
                        </>
                        : <><div className="subject_user">
                            <div className="name_date">
                                <h1 className="title_color">{subjectInfo ? subjectInfo.title_subject.toUpperCase() : null}</h1>
                                <p className="date_color">{handleDateFormat(subjectInfo.date)}</p>
                            </div>
                            <div className="subject-pseudo-avatar">
                                <p id="pl-1">{userDeleted}</p>
                            </div>
                            <div>{subjectInfo.contenu}</div>
                        </div>
                            <hr className="width-80"></hr>
                            <CommentariesSubject idSubject={urlId} />
                        </>}
                    <div className="width-80">
                        <p className="title_color">AJOUTER UN COMMENTAIRE</p>
                        <textarea name="contained" id="contained" placeholder="Ecriver votre texte ici" required onChange={e => setContained(e.target.value)} />
                        <button className="btn btn-red " onClick={addCommentary} disabled={addComment}> VALIDER VOTRE COMMENTAIRE</button>
                        {textComment ? <p className="text-error">Veuillez remplir le champ pour poster un commentaire</p> : null}
                        {axiosFailed ? <p className="text-error">Une erreur s'est produite lors de la création du Sujet</p> : null}
                        {addComment ? <p className="text-success"> Votre commentaire a bien été ajouté, vous allez être redirigé sur la page forum</p> : null}
                        {incorrect ? <p className="text-error">Vous devez être connecté pour poster un commentaire</p> : null}
                    </div>
                </div>
            </div>
            < FooterForum />
        </div >
    );
}
const mapDispatchToProps = { signinAction, forumSubjectAction };
const mapStateToProps = (state) => ({
    signinStore: state.signin,
    forumSubject: state.forumSubject
});
export default connect(mapStateToProps, mapDispatchToProps)(SingleSubject);