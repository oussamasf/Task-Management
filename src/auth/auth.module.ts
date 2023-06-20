import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

console.log(process.env.JWT_SECRET);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env' }),
    UserModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
