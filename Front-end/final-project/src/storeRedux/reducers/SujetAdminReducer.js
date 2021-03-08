const initialStates = {
    SujetAdmin: [

    ]

};

const deleteSujetReducer = (state = initialStates, action) => {
    switch (action.type) {
        case "GETSUJETS":
            return {
                ...state,
                SujetAdmin: [...action.payload]
            };
        case "DELETESUJET":
            let deletedSujetIndex = state.SujetAdmin.findIndex(
                (sujet) => sujet.id === action.payload
            );
            return {
                ...state,
                SujetAdmin: [
                    ...state.SujetAdmin.slice(0, deletedSujetIndex),
                    ...state.SujetAdmin.slice(deletedSujetIndex + 1)

                ],
            };

        default:
            return state;
    }
};

export default deleteSujetReducer;