import Yup, { object, string } from "yup";

export const executeAuthSchema = object().shape({
    email: string().email().required(),
    password: string().min(8, "As senhas devem ter no mínimo 8 caracteres").required(),
});

export const refreshTokenSchema = object().shape({
    token: string().required(),
    refresh_token: string().required(),
});

export type AuthInterface = Yup.InferType<typeof executeAuthSchema>;
export type RefreshTokenInterface = Yup.InferType<typeof refreshTokenSchema>;