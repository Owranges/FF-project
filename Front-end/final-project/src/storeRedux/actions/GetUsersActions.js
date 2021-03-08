export const getUsersAction = (users) => {
    return {
        type: "GETUSERS",
        payload: users,
    };
};
