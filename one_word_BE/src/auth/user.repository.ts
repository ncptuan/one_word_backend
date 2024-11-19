import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredential } from "./dto/credential.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(authCredential: AuthCredential): Promise<void>{
        const { username, password } = authCredential;

        const user = this.create({
            username,
            password,
        });

        this.save(user)
    }

}