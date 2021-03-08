import React, { useState, useEffect } from 'react';
import axios from "axios"
// import "./Forum.css"
import "./Admin.css"
import Header from "../../Global/header/Header"
import Footer from "../../Global/footer/Footer"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { signinAction } from "../../storeRedux/actions/SigninActions";
import { deleteSujetAction } from "../../storeRedux/actions/DeleteSujetAdmin";
import { getSujetAction } from "../../storeRedux/actions/SujetAdminActions"


function AdminSubject(props) {
    // const token = props.signinStore.userToken;
    // const [connected, setConnected] = useState(false)
    const [errorDelete, setErrorDelete] = useState(false)
    // const [forumSubject, setForumSubject] = useState([])
    const [incorrect, setIncorrect] = useState(false)
    const allSubjects = props.sujetAdmin.SujetAdmin
    const getSubject = () => {
        axios.get(`http://localhost:8000/subject`)
            .then(response => {
                if (response.data === "There is no subject yet") {
                    setIncorrect(true)
                } else {
                    props.getSujetAction(response.data)
                }
            })
    };

    useEffect(() => {
        getSubject()

    }, []);

    const deleteSubject = (id) => {
        const headers = {
            "Content-Type": "application/json",
            authorization: props.signinStore.userToken,
        };
        axios.delete(`http://localhost:8000/subject/${id}`, { headers: headers })
            .then(() => {
                setErrorDelete(false)
                props.deleteSujetAction(id)
            }).catch(() => {
                setErrorDelete(true)
            })


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
        if (allSubjects.length) {
            return allSubjects.map((subject, index) => {
                const { id, title_subject, administ, pseudo, date } = subject //destructuring

                return (
                    <tr className="text-centered" key={id}>
                        <td onClick={() => clickedSubject(id)} className="table-column-one">{title_subject}</td>
                        <td>{administ === 1 ? "admin" : "utilisateur"}</td>
                        <td>{pseudo}</td>
                        <td className="text-orange">{handleDateFormat(date)}</td>
                        <td><button className="btn btn-red" onClick={() => deleteSubject(id)}>Supprimer</button></td>
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
        <div >
            < Header />
            <div className="page-container theme-green">
                <h1 className="text-green text-centered">PAGE ADMIN</h1>
                <nav className="text-centered text-green py-5 nav-admin">
                    <Link to="/admin">Liste des utilisateurs</Link>
                    <Link to="/admin-subject">Liste des sujets</Link>
                </nav>
                <div>
                    <div className="forum-admin text-centered ">
                        {errorDelete ? <div className="text-error">Une erreur s'est produite a</div> : null}
                        {incorrect ? <p className='text-green'>Il n'existe pas encore de sujets</p> :

                            <div className="div-table text-blueflash mt-3">
                                <table className='table-admin text-centered my-4'>
                                    <thead>
                                        <tr>
                                            <th className="tab_row">Sujet</th>
                                            <th className="tab_row">Catégories</th>
                                            <th className="tab_row">Auteur</th>
                                            <th className="tab_row">Date</th>
                                            <th className="tab_row">Supprimer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allSubjects ?
                                            renderTableData() :
                                            null}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
            </div>
            < Footer />
        </div >
    );
}


const mapDispatchToProps = { signinAction, deleteSujetAction, getSujetAction };
const mapStateToProps = (state) => ({
    signinStore: state.signin,
    sujetAdmin: state.sujetAdmin
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminSubject);
