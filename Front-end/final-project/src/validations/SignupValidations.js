import * as yup from "yup";

export const signupSchema = yup.object().shape({

    email: yup.string().email().required(),
    password: yup.string().required(),
    pseudo: yup.string().required(),
    prenom: yup.string().required(),
    avatar: yup.string().required()
})