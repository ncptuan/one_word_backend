import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthCredential } from './dto/credential.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post("/signUp")
    async signUp(@Body() authCredential: AuthCredential): Promise<void>{
       return this.authService.signUp(authCredential)
    }

    @Post("/signIn")
    async signIn(@Body() authCredential: AuthCredential):  Promise<{accessToken: string}>{
       return this.authService.signIn(authCredential)
    }

    @Post("/test")
    @UseGuards(AuthGuard())
     test(@Req() req){
       console.log(req)
    }
}
