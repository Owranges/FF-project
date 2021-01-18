import { combineReducers } from "redux";
import signinReducer from "./SigninReducer";
const allReducers = combineReducers({
    signin: signinReducer
});

export default allReducers;
