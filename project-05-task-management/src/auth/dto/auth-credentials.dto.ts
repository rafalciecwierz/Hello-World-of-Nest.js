import { IsLowercase, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsLowercase()
    username: string;

    @IsString()
    @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 }, { message: 'Password too weak' })
    password: string;
}