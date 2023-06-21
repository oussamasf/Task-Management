import { IsString, IsEmail, MinLength } from 'class-validator';
export class CreateUsertDto {
  @IsString()
  username: string;
  @IsString()
  @MinLength(8)
  password: string;
  @IsEmail()
  email: string;
  @IsString({ each: true })
  roles: [string];
}
