import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User, UserSchema } from '../../schemas/user.schema';
import { userController } from './user.controller';
import { RolesModule } from '../../utils/config/roles/roles.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RolesModule,
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [userController],
})
export class UserModule {}
