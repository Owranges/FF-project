const initialStates = {
    Users: [
        // {
        //     INFO USERS
        // }
    ]

};

const deleteUsersReducer = (state = initialStates, action) => {
    switch (action.type) {
        case "GETUSERS":
            return {
                ...state,
                Users: [...action.payload]
            };
        case "DELETEUSER":
            let deletedUserIndex = state.Users.findIndex(
                (user) => user.id === action.payload
            );
            return {
                ...state,
                Users: [
                    ...state.Users.slice(0, deletedUserIndex),
                    ...state.Users.slice(deletedUserIndex + 1)
                ],
            };

        default:
            return state;
    }
};

export default deleteUsersReducer;