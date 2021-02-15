import React, { useState, useEffect } from 'react';
import axios from "axios"
import "./Forum.css"
import Header from "../../Global/header/Header"
import Footer from "../../Global/footer/Footer"
import { connect } from "react-redux";
import { signinAction } from "../../storeRedux/actions/SigninActions";
import { forumSubjectAction } from "../../storeRedux/actions/ForumSubjectActions";


function Forum(props) {

    const [forumSubject, setForumSubject] = useState()
    const [incorrect, setIncorrect] = useState()
    // const token = props.signinStore.userToken;
    // const [infoUser, setInfoUser] = useState([])
    // const addSubject = () => {
    //     axios.post(`http://localhost:8000/subject/create`)
    // }
    const getSubject = () => {
        axios.get(`http://localhost:8000/subject`)
            .then(response => {
                console.log(response);
                if (response.data) {
                    setForumSubject(response.data)
                    setIncorrect(true)
                    props.forumSubjectAction({ forumSubject: response.data });
                }
            }).catch(err => {
                console.log(err)
                if (err.response.status === 403) {
                    console.log('im in the catch');
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


    return (
        <div className="forumDiv">
            < Header />
            <div className="shivaDiv">
                {/* <div className="ifritDiv"> </div> */}
                <div className="forum ifritDiv">
                    <p className="forumMsg">BIENVENUE DANS LA SECTION FORUM DE NOTRE SITE < br /> RETROUVEZ TOUS LES SUJETS DE NOS MEMBRES</p>
                    <button className="btnBlue" onClick={newSubject} > NOUVEAU SUJET </button>
                    <p className="forumMsg">TOUS LES SUJETS</p>

                    {/* <img src={ff7cloudprofile} className='cloudImg' alt='Logo meteor from ff7' /> */}
                </div>
                {/* <img src={ff7Shiva} className='shivaImg' alt='invocation Shiva' /> */}
            </div>
            <div>
                <p></p>
                {/* <div className="subject">
                    <ul className="subjectList">
                        <li></li>
                    </ul>
                </div> */}
            </div>

            < Footer />
        </div >
    );
}


const mapDispatchToProps = { signinAction, forumSubjectAction };
const mapStateToProps = (state) => ({
    signinStore: state.signin,
});
export default connect(mapStateToProps, mapDispatchToProps)(Forum);
