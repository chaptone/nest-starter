import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator';

export class SendMailDto {

    @IsEmail()
    @IsNotEmpty()
    from: string;

    @IsEmail()
    @IsNotEmpty()
    to: string;

    @IsString()
    @IsOptional()
    message: string;

    @IsString()
    @IsNotEmpty()
    subject: string;

}