const initialStates = {
    forumSubject : []
    // In usertoken , there is token More Id email etc... of user
};

const forumSubjectReducer = (state = initialStates, action) => {
    console.log(action.payload);
    switch (action.type) {
        case "GETSUBJECT":
            return {
                ...state,
                forumSubject : [
                    ...state.forumSubject
                ]
                
            };
        case "NEWSUBJECT":
            return{
                ...state,
                forumSubject : [
                    ...state.forumSubject,
                    {
                    date: action.payload.date,
                    contained : action.payload.contained,
                    title_subject:  action.payload.title_subject,
                    id_utilisateur: action.payload.id_utilisateur,
                    idCategorySubject: action.payload.admin

                    }
                ]
            }

        default:
            return state;
    }
};

export default forumSubjectReducer;
