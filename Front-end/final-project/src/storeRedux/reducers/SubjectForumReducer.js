const initialStates = {
    forumSubject: [
        // {
        //     id:
        //     date:
        //     contained:
        //     title_subject:
        //     pseudo_utilisateur:
        //     idCategorySubject:
        // }
    ]

};

const forumSubjectReducer = (state = initialStates, action) => {
    switch (action.type) {
        case "GETSUBJECT":
            return {
                ...state,
                forumSubject: action.payload

            };
        case "NEWSUBJECT":
            return {
                ...state,
                forumSubject: [
                    ...state.forumSubject,
                    {
                        id: action.payload.id,
                        id_utilisateur: action.payload.id_utilisateur,
                        date: action.payload.date,
                        contained: action.payload.contained,
                        title_subject: action.payload.title_subject,
                        pseudo_utilisateur: action.payload.pseudo_utilisateur,
                        idCategorySubject: action.payload.admin

                    }
                ]
            }

        default:
            return state;
    }
};

export default forumSubjectReducer;
