import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredential } from './dto/credential.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post("/signup")
    async signup(@Body() authCredential: AuthCredential): Promise<void>{
       return this.authService.createUser(authCredential)
    }
}
