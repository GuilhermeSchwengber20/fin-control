import bcrypt from "bcrypt";
import { AuthInterface } from "../schemas/AuthSchema";
import InMemoryUserRepository from "../repositories/inMemory/InMemoryUserRepository";

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
        return dataUser;
    }
}

export default AuthService