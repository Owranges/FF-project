import React, { useState, useEffect} from 'react';
import axios from "axios"
import "./ForumSubject.css"
import Header from "../../Global/header/Header"
import Footer from "../../Global/footer/Footer"
import { connect } from "react-redux";
import { signinAction } from "../../storeRedux/actions/SigninActions";
import {newSubjectAction} from "../../storeRedux/actions/NewSubject"


function ForumSubject(props) {
    const todayDate = () => (
        new Date().toISOString().slice(0,10)
    )
    const token = props.signinStore.userToken;
    const [incorrect, setIncorrect] = useState(true)
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
            id_utilisateur: props.signinStore.userInfo.id,
            idCategorySubject: props.signinStore.userInfo.admin ? 1 : 2,
            date: todayDate()
        }
        axios.post("http://localhost:8000/subject/create", formValues)
            .then(response => {
                props.newSubjectAction(formValues)
                console.log(response);
            }).catch(err => {
                console.log(err)
                    // if (err.response.status === 403) {
                    //     setIncorrect(false)
                    // };
            })
    }
    
    // const getUserInfo = () => {
    //     axios.get(`http://localhost:8000/user/${props.signinStore.userInfo.id}`)
    //         .then(response => {
    //             if (response.data) {
    //                 setInfoUser(response.data[0])
    //             }
    //         }).catch(err => {
    //             console.log(err)
    //             if (err.response.status == 403) {
                  
    //                 setIncorrect(false)
    //             };
    //         })
    // };

    useEffect(() => {

        if (token) {

        }
        else {
            props.history.push('/')
        }
    }, []);

    // const pushSignup = () => {
    //     props.history.push("/sign-up")
    // }

    return (
        <div className="ForumSubjectDiv">
            < Header />
            <div className="shivaDiv">
                {/* <div className="ifritDiv"> </div> */}
                <div className="ForumSubject ifritDiv">

                    {/* <img src={ff7cloudprofile} className='cloudImg' alt='Logo meteor from ff7' /> */}
                </div>
                {/* <img src={ff7Shiva} className='shivaImg' alt='invocation Shiva' /> */}
            </div>
            
            <div className="addSubject">
                
                <button className="btnGreen"  onClick={addSubject}> addSujet</button>
            </div>
            <div className="addSubject">
                <form onSubmit={handleSubmit} className="formAddSubject">
                    <div className="form-title_subject">
                        <label>Titre :</label>
                        <input type="text" name="title_subject" id="title_subject" required onChange={e => setContained(e.target.value)} />
                    </div>
                    <div className="form-contained">
                        <label>Contenu:</label>
                        <input type="text" name="contained" id="contained" required onChange={e => setTitle_Subject(e.target.value)} />
                    </div>
                </form>
            </div>
            < Footer />
        </div >
    );
}

const mapDispatchToProps = { signinAction, newSubjectAction };
const mapStateToProps = (state) => ({
    signinStore: state.signin,
});
export default connect(mapStateToProps, mapDispatchToProps)(ForumSubject);
