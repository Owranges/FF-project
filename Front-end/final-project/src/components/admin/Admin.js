import React, { useState, useEffect } from 'react';
import axios from "axios"
import "./Admin.css"
import { connect } from "react-redux";
import Header from "../../Global/header/Header"
import Footer from "../../Global/footer/Footer"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { signoutAction } from "../../storeRedux/actions/SignoutActions";
import { getUsersAction } from "../../storeRedux/actions/GetUsersActions";
import { deleteUserAction } from "../../storeRedux/actions/DeleteUserActions";

function Admin(props) {
    const token = props.signinStore.userInfo;

    // const [allUsers, setAllUsers] = useState([])
    const [errorDelete, setErrorDelete] = useState(false)
    const [errorUsers, setErrorUsers] = useState(false)
    const allUsers = props.getUsers.Users
    const onSignout = () => {
        props.signoutAction();
        props.history.push("/");
        localStorage.clear()
    };

    const getUsers = () => {
        const headers = {
            "Content-Type": "application/json",
            authorization: props.signinStore.userToken,
        };
        axios.get(`http://localhost:8000/users`, { headers: headers })
            .then((response) => {
                props.getUsersAction(response.data)
                setErrorUsers(false)
            })
            .catch(() => {
                setErrorUsers(true)
            })
    };

    const deleteUser = (id) => {
        const headers = {
            "Content-Type": "application/json",
            authorization: props.signinStore.userToken,
        };

        axios.delete(`http://localhost:8000/users/${id}`, { headers: headers })
            .then(() => {
                if (token.id === id) {
                    onSignout()
                }
                props.deleteUserAction(id)
                setErrorDelete(false)
            })
            .catch(() => {
                setErrorDelete(true)
            })
    };

    useEffect(() => {
        if (!token.admin) {
            props.history.push('/')
        }

        getUsers()

    }, [])


    const renderTableData = () => {
        if (allUsers.length) {
            return allUsers.map((users, index) => {
                const { id, prenom, administ, pseudo, email } = users //destructuring

                return (
                    <tr className="text-centered" key={id}>
                        <td>{prenom}</td>
                        <td>{administ === 1 ? "admin" : "utilisateur"}</td>
                        <td className="text-green">{pseudo}</td>
                        <td className="text-white italic">{email}</td>
                        <td><button className="btn btn-red" onClick={() => deleteUser(id)}>Supprimer</button></td>
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
                {errorDelete ? <div className="text-error">Une erreur s'est produite a</div> : null}
                {errorUsers ? <div className="text-error">Une erreur s'est produite b</div> : null}
                {allUsers ?
                    <div>
                        <table className='table-admin text-centered my-4'>
                            <thead>
                                <tr>
                                    <th className="tab_row">Prenom</th>
                                    <th className="tab_row">Rôle</th>
                                    <th className="tab_row text-green">Pseudo</th>
                                    <th className="tab_row text-white italic">Email</th>
                                    <th className="tab_row">Suppression</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers ?
                                    renderTableData() :
                                    null}
                            </tbody>
                        </table>
                    </div>
                    : <p className='text-green'>Il n'y a pas d'utilisateurs</p>
                }
            </div>
            < Footer />
        </div >
    );
}

const mapDispatchToProps = { signoutAction, getUsersAction, deleteUserAction };
const mapStateToProps = (state) => ({
    getUsers: state.getUsers,
    signinStore: state.signin,
});
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
