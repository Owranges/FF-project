import * as yup from "yup";

export const passwordSchema = yup.object().shape({
    email: yup.string().min(4).required(),

})