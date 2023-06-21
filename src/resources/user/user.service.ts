import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUsertDto } from './dto/create-user.dto';
import { User } from '../../schemas/user.schema';

// This should be a real class/interface representing a user entity
export type UserType = any;
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];
  async create(createUserDto: CreateUsertDto): Promise<User> {
    const createdCat = new this.userModel(createUserDto);
    return createdCat.save();
  }

  async findOne(username: string): Promise<UserType | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
