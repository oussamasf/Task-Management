import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, reqPassword) {
    const {
      _id,
      password = '',
      username: userName,
    } = await this.usersService.findUser(email);

    const compare = await bcrypt.compare(reqPassword, password);
    if (!compare) {
      throw new UnauthorizedException('WRONG_CREDENTIALS');
    }
    const payload = { sub: _id, username: userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
