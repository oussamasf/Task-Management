import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUsertDto } from './dto/create-user.dto';
import { User } from '../../schemas/user.schema';

// This should be a real class/interface representing a user entity
export type UserType = any;
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUsertDto): Promise<User> {
    const createdUser = this.userModel.create(createUserDto);
    return createdUser;
  }

  async findUser(email: string): Promise<UserType | undefined> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    return user;
  }
}
