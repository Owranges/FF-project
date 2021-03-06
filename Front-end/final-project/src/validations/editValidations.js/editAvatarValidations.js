import * as yup from "yup";

export const avatarSchema = yup.object().shape({
    avatar: yup.string().required(),

})