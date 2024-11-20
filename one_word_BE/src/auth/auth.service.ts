import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredential } from './dto/credential.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { User } from './user.entity';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRespository: UserRepository,
        private jwtService: JwtService,
    ){}

    async signUp(credential: AuthCredential): Promise<void> {

        const { username, password } = credential;
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = this.userRespository.create({
            username,
            password: hashedPassword,
        });

        return this.userRespository.createUser(user);
    }

    async signIn(credential: AuthCredential): Promise<{accessToken: string}> {
        const { username, password } = credential;

        const user = await this.userRespository.findOne({username});

        if (user && (await bcrypt.compare(password, user.password))) {
            
            const payload : JwtPayload = {username}
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken }
        }
        throw new UnauthorizedException("Please check your login information again")
    }
}
