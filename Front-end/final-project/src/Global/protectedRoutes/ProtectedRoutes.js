import React from 'react';
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProtectedRoutes = ({ component: Component, ...rest }) => {
    const tokens = localStorage.getItem('token');
    let tokens_decoded;
    if (tokens) {
        tokens_decoded = jwt_decode(tokens)
    }
    return (
        <Route {...rest} render={(props) => {
            if (tokens_decoded) {
                return <Component {...props} />
            } else {
                return <Redirect to={{ pathname: '/', state: { form: props.location } }} />
            }
        }} />
    )
}

export default ProtectedRoutes;