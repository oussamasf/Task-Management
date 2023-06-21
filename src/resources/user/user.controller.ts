import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUsertDto } from './dto/create-user.dto';
import { ValidationPipe } from '../../pipes/validation.pipe';
// import { User } from '../../schemas/user.schema';
ValidationPipe;
@Controller('user')
export class userController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUsertDto) {
    await this.userService.create(createUserDto);
  }
}
