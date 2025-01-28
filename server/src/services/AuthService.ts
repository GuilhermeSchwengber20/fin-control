import bcrypt from "bcrypt";
import { AuthInterface, RefreshTokenInterface } from "../schemas/AuthSchema";
import { generateJWT, verifyJWT, decodeJWT } from "./helpers/AuthHelper";
import InMemoryUserRepository from "../repositories/inMemory/InMemoryUserRepository";
const JWT_TOKEN_EXPIRES_IN = "1h"
const JWT_REFRESH_TOKEN_EXPIRES_IN = "1d"
class AuthService {
    async execute(validatedData: AuthInterface) {
        const inMemoryUserRepository = new InMemoryUserRepository();

        const dataUser = await inMemoryUserRepository.getByEmail(validatedData.email);

        if(!dataUser) {
            throw new Error("E-mail e/ou senha inválidos");
        }

        const ifPasswordCorrect = await bcrypt.compare(validatedData.password, dataUser.password);

        if(!ifPasswordCorrect) {
            throw new Error("E-mail e/ou senha inválidos");
        }

        dataUser.password = "Não informado por questões de segurança";
        const token = generateJWT(dataUser, JWT_TOKEN_EXPIRES_IN);
        const refresh_token = generateJWT(dataUser, JWT_REFRESH_TOKEN_EXPIRES_IN);
        return {token, refresh_token};
    }

    async refreshToken(dadosValdiados: RefreshTokenInterface) {
        const verifyToken = verifyJWT(dadosValdiados.token);
        const verifyRefreshToken = verifyJWT(dadosValdiados.refresh_token);

        console.log(verifyToken)
        console.log(verifyRefreshToken)

        if(!verifyToken && !verifyRefreshToken) {
            throw new Error("Token e refresh token inválidos");
            // se estourar esse erro, o usuario deve logar novamente
        }

        const { name, email, phone, passowrd } = decodeJWT(dadosValdiados.refresh_token);
        const payloadJWT = { // pega as informações pra gerar um novo token
            name,
            email,
            phone,
            passowrd
        }
        const token = generateJWT(payloadJWT, JWT_TOKEN_EXPIRES_IN);
        const refresh_token = generateJWT(payloadJWT, JWT_REFRESH_TOKEN_EXPIRES_IN);
        return {token, refresh_token}
    }
}

export default AuthService