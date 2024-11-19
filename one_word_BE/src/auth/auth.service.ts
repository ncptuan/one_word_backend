import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredential } from './dto/credential.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRespository: UserRepository,
    ){}

    async createUser(credential: AuthCredential): Promise<void> {
       return this.userRespository.createUser(credential);
    }
}
