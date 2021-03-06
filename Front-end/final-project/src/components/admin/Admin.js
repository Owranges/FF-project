import React, { useState, useEffect } from 'react';
import axios from "axios"
import { connect } from "react-redux";
import HeaderForum from "../../Global/headerForum/HeaderForum"
import FooterForum from "../../Global/footerForum/FooterForum"
import { signinAction } from "../../storeRedux/actions/SigninActions";

function Admin(props) {
    const todayDate = () => (
        new Date().toISOString().slice(0, 10)
    )
    const token = props.signinStore.userToken;
    return (
        <div >
            < HeaderForum />
            <p>lol</p>
            < FooterForum />
        </div >
    );
}

const mapDispatchToProps = { signinAction };
const mapStateToProps = (state) => ({
    signinStore: state.signin,
});
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
