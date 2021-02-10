import { combineReducers } from "redux";
import signinReducer from "./SigninReducer";
import forumSubjectReducer from "./SubjectForumReducer";
const allReducers = combineReducers({
    signin: signinReducer,
    forumSubject : forumSubjectReducer
});

export default allReducers;
