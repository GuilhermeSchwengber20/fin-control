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

            Res.status(200).json(resultadoAutenticacao);

        } catch (error: any) {
            Res.status(400).json({error: error.message});
        }

    }

    async refreshToken(Req: Request, Res: Response) {

    }
}

export default AuthController;



/*
    FRONT
        USUARIO - ENVIA O TOKEN
        CONTAS - ENVIA O TOKEN
        CATEGORIAS - ENVIA O TOKEN


        - RETORNAR UM TOKEN ATUALIZADO
        - TOKEN PRECISA SER VÁLIDO
        - REFRESH TOKEN

        -- SE O TOKEN ESTIVER EXPIRADO MANDA O REFRESH TOKEN, SE TIVER NO PRAZO O REFRESH TOKEN VAI RENOVAR
        -- FINAL AULA #5

*/