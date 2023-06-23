import { IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { UserRole } from 'src/utils/config/roles';

export class CreateUsertDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole, { each: true })
  roles: [string];
}
