import { User } from "../../models/User";
class InMemoryUserRepository {
    private _users: User[];

    constructor() {
        this._users = [
            {
                name: "Guilherme",
                email: "contato@guilhermeschwengber.com",
                phone: "44 999335731",
                password: "$2b$10$uMg1kqTAgrKAKsCzDRvaI.Z7VRxi0YfrAtYiUZSFhx/APjR4DfWpu"
            }
        ];
    }

    async getByEmail(email: string): Promise<User> {
        const user = this._users.filter(user => user.email === email);

        return user[0];
    }

}


export default InMemoryUserRepository;