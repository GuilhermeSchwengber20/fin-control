import bcrypt from "bcrypt";
import { AuthInterface } from "../schemas/AuthSchema";
import { generateJWT } from "./helpers/AuthHelper";
import InMemoryUserRepository from "../repositories/inMemory/InMemoryUserRepository";
const JWT_TOKEN_EXPIRES_IN = "1hr"
const JWT_REFRESH_TOKEN_EXPIRES_IN = "1d"
class AuthService {
    async execute(validatedData: AuthInterface) {
        const inMemoryUserRepository = new InMemoryUserRepository();

        const dataUser = await inMemoryUserRepository.getByEmail(validatedData.email);

        if(!dataUser) {
            throw new Error("E-mail e/ou senha inválidos");
        }

        const ifPasswordCorrect = await bcrypt.compare(validatedData.password, dataUser.password);
        console.log(ifPasswordCorrect);
        if(!ifPasswordCorrect) {
            throw new Error("E-mail e/ou senha inválidos");
        }

        dataUser.password = "Não informado por questões de segurança";
        const token = generateJWT(dataUser, JWT_TOKEN_EXPIRES_IN);
        const refresh_token = generateJWT(dataUser, JWT_REFRESH_TOKEN_EXPIRES_IN);
        return {token, refresh_token};
    }
}

export default AuthService