import { Request, Response } from "express";

import { executeAuthSchema } from "../schemas/AuthSchema";
import AuthService from "../services/AuthService";


class AuthController {
    constructor() {}

    add(Req: Request, Res: Response) {
        try {
            
        } catch (error) {
            
        }
    }

    async execute(Req: Request, Res: Response) {
        try {
            const authService = new AuthService();

            const validatedData = await executeAuthSchema.validate(Req.body, { stripUnknown: true });
            const resultadoAutenticacao = await authService.execute(validatedData);

        } catch (error: any) {
            Res.status(400).json({error: error.message});
        }

    }

    async refreshToken(Req: Request, Res: Response) {

    }
}

export default AuthController;