import { combineReducers } from "redux";
import signinReducer from "./SigninReducer";
import forumSubjectReducer from "./SubjectForumReducer";
import getUsersReducer from "./GetUsersReducer"
import getSujetReducer from "./SujetAdminReducer"
const allReducers = combineReducers({
    signin: signinReducer,
    forumSubject: forumSubjectReducer,
    getUsers: getUsersReducer,
    sujetAdmin: getSujetReducer
});

export default allReducers;
