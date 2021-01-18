export const signinAction = (tokenDecoded) => {
    return {
        type: "CONNECTED",
        payload: tokenDecoded,
    };
};
