import { IsNotEmpty, Matches, MaxLength, maxLength, minLength, MinLength } from "class-validator";

export class AuthCredential {
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string;
    
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "Password is too weak",
    })
    password: string;
}