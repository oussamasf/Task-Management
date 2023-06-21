import { IsString, IsEmail } from 'class-validator';
export class CreateUsertDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsEmail()
  email: string;
  @IsString({ each: true })
  roles: [string];
}
