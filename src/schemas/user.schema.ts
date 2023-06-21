import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: [String], required: true })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const CRYPTO_SALTORROUNDS = 10;
  const user = this as User;

  try {
    const hashedPassword = await bcrypt.hash(
      user.password,
      parseInt(`${CRYPTO_SALTORROUNDS}`),
    );
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
