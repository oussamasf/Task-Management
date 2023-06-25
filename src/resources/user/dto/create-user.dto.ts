import { IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../../../utils/config/roles';

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
