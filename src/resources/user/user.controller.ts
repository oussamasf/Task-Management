import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUsertDto } from './dto/create-user.dto';
// import { User } from '../../schemas/user.schema';

@Controller('user')
export class userController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUsertDto) {
    await this.userService.create(createUserDto);
  }
}
