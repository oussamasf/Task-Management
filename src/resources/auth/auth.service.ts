import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async signIn(email, reqPassword) {
    const {
      _id,
      password = '',
      username: userName,
      roles,
    } = await this.usersService.findUser(email);

    const compare = await bcrypt.compare(reqPassword, password);
    if (!compare) {
      throw new UnauthorizedException('WRONG_CREDENTIALS');
    }
    const payload = { sub: _id, username: userName, roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto) {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user)
      throw new HttpException('ALREADY_SIGNED_UP', HttpStatus.BAD_REQUEST);

    const userBody = { roles: ['basic_user'], ...createUserDto };
    await this.userModel.create(userBody);
    return await this.signIn(createUserDto.email, createUserDto.password);
  }
}
