import React, { useState, useEffect } from 'react';
import axios from "axios"
import "./Forum.css"
import HeaderForum from "../../Global/headerForum/HeaderForum"
import FooterForum from "../../Global/footerForum/FooterForum"

import { connect } from "react-redux";
import { signinAction } from "../../storeRedux/actions/SigninActions";
import { forumSubjectAction } from "../../storeRedux/actions/ForumSubjectActions";


function Forum(props) {

    const [forumSubject, setForumSubject] = useState([])
    const [incorrect, setIncorrect] = useState()

    const getSubject = () => {
        axios.get(`http://localhost:8000/subject`)
            .then(response => {
                if (response.data === "There is no subject yet") {
                    setIncorrect(true)
                } else {
                    setForumSubject(response.data)
                    console.log(response.data);
                    props.forumSubjectAction(response.data);
                }
            }).catch(err => {
                if (err.response.status === 403) {
                    setForumSubject([])
                    setIncorrect(false)
                };
            })
    };

    useEffect(() => {
        getSubject()

    }, []);

    const newSubject = () => {
        props.history.push('/forumSubject')
    }

    function handleDateFormat(date) {
        let currentDate = date;
        var newDate = new Date(currentDate).toLocaleDateString("sq-AL", { year: 'numeric', month: '2-digit', day: '2-digit' });
        return newDate;
    }


    const clickedSubject = (subjectId) => {
        console.log(subjectId);
        props.history.push(`/forum-subject?id=${subjectId}`)
    };

    const renderTableData = () => {
        if (forumSubject.length) {
            return forumSubject.map((subject, index) => {
                const { id, title_subject, id_catégories_sujet, pseudo_utilisateur, date } = subject //destructuring
                console.log(subject);
                return (
                    <tr className="table_header" key={id}>
                        <td onClick={() => clickedSubject(id)} id="table_link">{title_subject}</td>
                        <td>{id_catégories_sujet === 1 ? "administrateur" : "utilisateur"}</td>
                        <td>{pseudo_utilisateur}</td>
                        <td id="table_date">{handleDateFormat(date)}</td>
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
        <div className="forumDiv">
            < HeaderForum />
            <div className="shivaDivForum">
                <div className="forum ifritDivForum">
                    <p className="forumMsg">BIENVENUE DANS LA SECTION FORUM DE NOTRE SITE < br /> RETROUVEZ TOUS LES SUJETS DE NOS MEMBRES</p>
                    <button className="btnBlue" onClick={newSubject} > NOUVEAU SUJET </button>
                    {incorrect ? <h1 className='table_title'>Il n'existe pas encore de sujets</h1> :
                        <div className="table_div_subject">
                            <h1 className='table_title'>TOUS LES SUJETS</h1>
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
