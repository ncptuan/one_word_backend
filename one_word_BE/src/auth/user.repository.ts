import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredential } from "./dto/credential.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async createUser(user: User): Promise<void>{
        try{
           await this.save(user)
        } catch(error){
            if (error.code === "23505") {
                throw new ConflictException("Uername already exist");
            }
            else{
                throw new InternalServerErrorException();
            }
        }
    }

    // async signIn(authCredential: AuthCredential): Promise<string>{
    //     const { username, password } = authCredential;

    //     const user = await this.findOne({username});

    //     if (user && (await bcrypt.compare(password, user.password))) {
    //         return "successful"
    //     }
    //     return "false"
    // }

}