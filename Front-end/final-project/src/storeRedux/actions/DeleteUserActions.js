export const deleteUserAction = (id) => {
    return {
        type: "DELETEUSER",
        payload: id,
    };
};
