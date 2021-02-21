import React, { useState, useEffect } from 'react';
import axios from "axios"
import "./SingleSubject.css"
import HeaderForum from "../../Global/headerForum/HeaderForum"
import FooterForum from "../../Global/footerForum/FooterForum"

import { connect } from "react-redux";
import { signinAction } from "../../storeRedux/actions/SigninActions";
import { forumSubjectAction } from "../../storeRedux/actions/ForumSubjectActions";


function SingleSubject(props) {
    const params = new URLSearchParams(props.location.search)
    const urlId = params.get('id')
    console.log(params);
    console.log(urlId);

    console.log(props.forumSubject.forumSubject[0]);
    console.log(props.signinStore);
    const subject = () => {
        console.log(props.forumSubject);
        let mySubject = props.forumSubject.forumSubject.find(
            (subj) => subj.id == urlId
        )
        console.log(mySubject);
    };

    useEffect(() => {
        subject()

    }, [urlId]);


    return (
        <div id="div_single_subject">
            < HeaderForum />
            <div className="shivaDiv">
                <div className="forum ifritDiv">
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