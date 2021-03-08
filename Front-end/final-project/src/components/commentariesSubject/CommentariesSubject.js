import React, { useState, useEffect } from 'react';
import axios from "axios"
import "./CommentariesSubject.css"

import iconprofil from "../../Img/iconprofil.png"
import { connect } from "react-redux";
import { signinAction } from "../../storeRedux/actions/SigninActions";
import { forumSubjectAction } from "../../storeRedux/actions/ForumSubjectActions";


function CommentariesSubject(props) {
    const [commentaries, setCommentaries] = useState([]);

    function handleDateFormat(date) {
        let currentDate = date;
        var newDate = new Date(currentDate).toLocaleDateString("sq-AL", { year: 'numeric', month: '2-digit', day: '2-digit' });
        return newDate;
    }

    const getSubject = () => {
        axios.get(`http://localhost:8000/subject/${props.idSubject}/commentaries`)
            .then((response) => {
                setCommentaries(response.data)
            })
    };
    function defaultSrc(ev) {
        ev.target.src = `${iconprofil}`
    }

    useEffect(() => {
        getSubject()
    }, [])
    return (
        <div className="width-80">
            {commentaries ? commentaries.map((item) => (
                <div className="pb-3" key={item.id}>
                    <div className="subject-name-date">
                        <img className="img-avatar" src={item.avatar} onError={defaultSrc} alt="avatar" />
                        <p className="text-orange">{handleDateFormat(item.date_commentaires)}</p>
                    </div>
                    <div className='subject-pseudo-avatar'>
                        <p className="font-bold">{item.pseudo}</p>
                    </div>
                    <div className="text-white">{item.contenu_commentaires}</div>
                    <hr></hr>
                </div>
            )) : null}
        </div >
    );
}
const mapDispatchToProps = { signinAction, forumSubjectAction };
const mapStateToProps = (state) => ({
    signinStore: state.signin,
    forumSubject: state.forumSubject
});
export default connect(mapStateToProps, mapDispatchToProps)(CommentariesSubject);