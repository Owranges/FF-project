import React, { useState, useEffect } from 'react';
import axios from "axios"
import "./Forum.css"
import HeaderForum from "../../Global/headerForum/HeaderForum"
import FooterForum from "../../Global/footerForum/FooterForum"

import { connect } from "react-redux";
import { signinAction } from "../../storeRedux/actions/SigninActions";
import { forumSubjectAction } from "../../storeRedux/actions/ForumSubjectActions";


function Forum(props) {
    const token = props.signinStore.userToken;
    const [connected, setConnected] = useState(false)
    const [forumSubject, setForumSubject] = useState([])
    const [incorrect, setIncorrect] = useState(false)

    const getSubject = () => {
        axios.get(`http://localhost:8000/subject`)
            .then(response => {
                if (response.data === "There is no subject yet") {
                    setIncorrect(true)
                } else {
                    setForumSubject(response.data)

                    props.forumSubjectAction(response.data);
                }
            }).catch(err => {
                if (err.response.status === 403) {
                    setForumSubject([])

                };
            })
    };
    console.log(forumSubject);
    useEffect(() => {
        getSubject()

    }, []);

    const newSubject = () => {
        if (token) {
            setConnected(false)
            props.history.push('/forumSubject')
        } else {
            setConnected(true)
        }

    }

    function handleDateFormat(date) {
        let currentDate = date;
        var newDate = new Date(currentDate).toLocaleDateString("sq-AL", { year: 'numeric', month: '2-digit', day: '2-digit' });
        return newDate;
    }


    const clickedSubject = (subjectId) => {

        props.history.push(`/forum-subject?id=${subjectId}`)
    };

    const renderTableData = () => {
        if (forumSubject.length) {
            return forumSubject.map((subject, index) => {
                const { id, title_subject, administ, pseudo, date } = subject //destructuring

                return (
                    <tr className="text-center" key={id}>
                        <td onClick={() => clickedSubject(id)} className="table-column-one">{title_subject}</td>
                        <td>{administ === 0 ? "admin" : "utilisateur"}</td>
                        <td>{pseudo}</td>
                        <td className="text-orange">{handleDateFormat(date)}</td>
                    </tr>
                )
            })
        } else {
            return (
                <tr></tr>
            )
        }
    }

    return (
        <div className="page-container theme-blue">
            < HeaderForum />
            <div className="shiva-forum">
                <div className="forum text-center ifrit-forum">
                    <div className="my-5">BIENVENUE DANS LA SECTION FORUM DE NOTRE SITE < br /> RETROUVEZ TOUS LES SUJETS DE NOS MEMBRES</div>
                    {connected ? <p className="text-error"> Vous devez être connecté pour accéder à la création de sujet</p> : null}
                    <button className="btn btn-blue" onClick={newSubject} > NOUVEAU SUJET </button>


                    {incorrect ? <p className='text-blueflash'>Il n'existe pas encore de sujets</p> :

                        <div className="div-table text-blueflash mt-3">
                            <table id='table'>
                                <thead>
                                    <tr>
                                        <th className="tab_row">Sujet</th>
                                        <th className="tab_row">Catégories</th>
                                        <th className="tab_row">Auteur</th>
                                        <th className="tab_row">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {forumSubject ?
                                        renderTableData() :
                                        null}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
            < FooterForum />
        </div >
    );
}


const mapDispatchToProps = { signinAction, forumSubjectAction };
const mapStateToProps = (state) => ({
    signinStore: state.signin,
});
export default connect(mapStateToProps, mapDispatchToProps)(Forum);
