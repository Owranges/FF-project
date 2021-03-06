import * as yup from "yup";

export const pseudoSchema = yup.object().shape({
    email: yup.string().required(),

})