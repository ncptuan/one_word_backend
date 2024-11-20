import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredential } from "./dto/credential.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(authCredential: AuthCredential): Promise<void>{
        const { username, password } = authCredential;

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.create({
            username,
            password: hashedPassword,
        });
        
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

}