import { Module } from '@nestjs/common';

import { RolesFactory } from './roles.factory';

@Module({
  providers: [RolesFactory],
  exports: [RolesFactory],
})
export class RolesModule {}
