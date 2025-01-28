import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";


export const AuthMiddleware = async (Req: Request, Res: Response, Next: NextFunction) => {
    try {
        const authService = new AuthService();
        // ele vai verificar o token que esta chegando por Req
        const { authorization, refresh_token } = Req.headers;
        if(authorization && refresh_token) {
            const tokens = await authService.refreshToken({
                token: authorization,
                refresh_token: refresh_token as string
            });
            Res.set("authorization", tokens.token);
            Res.set("refresh_token", tokens.refresh_token);
            Next();
            return;
        }
        throw new Error("Authorization e RefreshToken são obrigatórios")
    } catch (err: any) {
        Res.status(400).json({error: err.message});
    }

};