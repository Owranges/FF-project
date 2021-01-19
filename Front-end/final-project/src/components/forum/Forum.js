import React, { useState, useEffect } from 'react';
import axios from "axios"
import "./Forum.css"
import Header from "../../Global/header/Header"
import Footer from "../../Global/footer/Footer"
import { connect } from "react-redux";
import { signinAction } from "../../storeRedux/actions/SigninActions";
import ff7Shiva from "../../Img/ForumImg/ff7shivascreenshot.png"

function Forum(props) {


    const token = props.signinStore.userToken;
    // useEffect(() => {

    //     if (token) axios.get(`http://localhost:8000/user/${props.signinStore.userInfo.id}`)
    //         .then(response => {
    //             if (response.data === "This user Id doesn't exist") {
    //                 setIncorrect(false)
    //             }
    //             else if (response.data) {
    //                 setInfoUser(response.data[0])
    //             }
    //         }).catch(err => {
    //             console.log(err);
    //         })
    //     else {
    //         props.history.push('/')
    //     }
    // }, []);


    return (
        <div className="forumDiv">
            < Header />
            <div className="shivaDiv">
                {/* <div className="ifritDiv"> </div> */}
                <div className="forum ifritDiv">
                    <p className="forumMsg">BIENVENUE DANS LA SECTION FORUM DE NOTRE SITE < br /> RETROUVEZ TOUS LES SUJETS DE NOS MEMBRES</p>
                    <button className="btnBlue" > NOUVEAU SUJET </button>
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

const mapDispatchToProps = { signinAction };
const mapStateToProps = (state) => ({
    signinStore: state.signin,
});
export default connect(mapStateToProps, mapDispatchToProps)(Forum);
