import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUsertDto } from './dto/create-user.dto';
import { ValidationPipe } from '../../utils/pipes/validation.pipe';
import { PoliciesGuard } from 'src/utils/config/roles/roles.guard';
import { CheckPolicies } from 'src/utils/decorator/roles.decorator';
import { AppAbility, Action } from 'src/utils/config/roles/roles.factory';

@UseGuards(PoliciesGuard)
@Controller('api/user')
export class userController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, 'all'))
  async create(@Body(new ValidationPipe()) createUserDto: CreateUsertDto) {
    await this.userService.create(createUserDto);
  }
}
